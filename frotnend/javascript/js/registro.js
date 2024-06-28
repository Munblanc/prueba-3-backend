$(document).ready(function () {
    $("#registerForm").validate({
        submitHandler: function (form) {
            var data = {
                usuario: $("#usuario").val(),
                password: $("#password").val(),
                correo: $("#email").val()
            };
            $.ajax({
                url: "http://localhost:8000/api/Users/",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {
                    localStorage.setItem("access", response.access);
                    localStorage.setItem("refresh", response.refresh);
                    alert("Registration successful!");
                    window.location.href = "index.html";
                },
                error: function (response) {
                    alert("Registration failed! " + response.responseJSON.detail);
                }
            });
        }
    });
});