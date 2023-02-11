// YOUR JAVASCRIPT CODE FOR INDEX.HTML GOES HERE

function fun() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  $.ajax({
    url: "/server/sweet_function/submit",
    type: "post",
    contentType: "application/Json",
    data: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
    }),
    success: function (response) {
      alert(response.message);
      location.reload();
    },
    error: function (error) {
      alert(error.message);
    },
  });
  // console.log(data);
}
function login() {
  var lemail = document.getElementById("lname").value;
  var lpass = document.getElementById("lemail").value;
  $.ajax({
    url: "/server/sweet_function/login",
    type: "post",
    contentType: "application/Json",
    data: JSON.stringify({ email: lemail, pass: lpass }),
    success: function (data) {
      console.log(data.Auth);
      if (data.Auth == "Accept") {
        window.location.href = "index-2.html";
      } else {
        alert("Entry Restricted");
      }
      // console.log(data);
    },
    error: function () {
      alert("Error");
    },
  });
}

function order() {
  try {
    var dish = document.getElementById("dish").value;
    var descp = document.getElementById("descp").value;
    $.ajax({
      url: "/server/sweet_function/order",
      type: "post",   
      contentType: "application/Json",
      data: JSON.stringify({
        dish: dish,
        descp: descp,
      }),
      success: function (response) {
        alert(response.message);
        location.reload();
      },
      error: function (error) {
        alert(error.message);
      },
    });
  } catch (e) {
    console.log(e);
  }

  // console.log(data);
}
