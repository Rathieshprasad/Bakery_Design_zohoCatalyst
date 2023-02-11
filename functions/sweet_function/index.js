"use strict";
var express = require("express");
var app = express();
var catalyst = require("zcatalyst-sdk-node");
app.use(express.json());
const tableName = "data"; // The table created in the Data Store
const columnName1 = "name"; // The column created in the table
const columnName2 = "email";
const columnName3 = "phone";
const columnName4 = "pass";
app.post("/submit", (req, res) => {
  try {
    var cus = req.body;
    var cat = catalyst.initialize(req);
    var rowData = {};
    let pass = (Math.random() + 1).toString(36).substring(7);
    rowData[columnName1] = cus.name;
    rowData[columnName2] = cus.email;
    rowData[columnName3] = cus.phone;
    rowData[columnName4] = pass;
    //  const pushNotification = cat.pushNotification();
    // var userList = [];
    // userList.push(cus.email);
    // cat
    //   .pushNotification()
    //   .web()
    //   .sendNotification(
    //     "Hi there! This is to notify you that you've signed up with Sweet Treats. We're looking forward to satisfy your appetite!",
    //     userList
    //   );
    let config = {
      from_email: "200701193@rajalakshmi.edu.in",
      to_email: cus.email,
      html_mode: true,
      subject: "  Sweet Treats -- Password",
      content: "<p>Here is your password</p>" + pass,
    };
    let email = cat.email();
    let mailPromise = email.sendMail(config);
    mailPromise
      .then((mailObject) => {
        console.log(mailObject);
        //cache

        // let cachePromise2 = segment.get("Name");
        // cachePromise2.then((entity) => {
        //   console.log(entity);
        // });
        //endcache
        var rowArr = [];
        rowArr.push(rowData);
        cat
          .datastore()
          .table(tableName)
          .insertRows(rowArr)
          .then((requestInsertResp) => {
            res.send({
              message: "Request sent",
            });
          })
          .catch((err) => {
            console.log(err);
            // sendErrorResponse(res);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", (req, res) => {
  try {
    var catalystApp = catalyst.initialize(req);
    var details = req.body;
    let cache = catalystApp.cache();
    let segment = cache.segment();
    let cachePromise = segment.put("Name", details.email, 1);
    cachePromise.then((entity) => {
      console.log(entity);
    });
    let cachePromise2 = segment.put("Password", details.pass, 1);
    cachePromise2.then((entity) => {
      console.log(entity);
    });

    console.log(details);
    checkAdmin(catalystApp, details.email, details.pass)
      .then((adminDetails) => {
        if (adminDetails != 0) {
          console.log("ADMIN RIGHT");
          res.send({ Auth: "Accept" });
        } else {
          console.log("ADMIN WRONG");
          res.send({ Auth: "Decline" });
        }
      })
      .catch((err) => {
        console.log(err);
        sendErrorResponse(res);
      });

    function checkAdmin(catalystApp, lemail, lpass) {
      var a = catalystApp
        .zcql()
        .executeZCQLQuery(
          "Select * from " +
            tableName +
            " where " +
            columnName2 +
            "='" +
            lemail +
            "'" +
            "AND " +
            columnName4 +
            "='" +
            lpass +
            "'"
        );
      return a;
    }
  } catch (e) {
    console.log(e);
  }
});

const tn2 = "orders";
const cn1 = "dish";
const cn2 = "descp";
app.post("/order", (req, res) => {
  var cus = req.body;
  var cat = catalyst.initialize(req);
  var rowData = {};
  rowData[cn1] = cus.dish;
  rowData[cn2] = cus.descp;
  var rowArr = [];
  rowArr.push(rowData);
  cat
    .datastore()
    .table(tableName)
    .insertRows(rowArr)
    .then((requestInsertResp) => {
      res.send({
        message: "Request sent",
      });
    });
});
//       .catch((err) => {
//    }     console.log(err);
//       });
//   } catch (e) {
//     console.log(e);
//   }
// });

module.exports = app;
 