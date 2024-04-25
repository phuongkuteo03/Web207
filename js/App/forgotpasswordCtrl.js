var app = angular.module("myApp", []);
app.controller("forgotpasswordCtrl", function ($rootScope, $scope, $http) {
  var url = "http://localhost:3000/listStudents";
  $http.get(url);
  $http.get(url).then(function (res) {
    console.log(res.data);
    $scope.getPass = function () {
      var ck = true;
      for (var i = 0; i < res.data.length; i++) {
        if (
          $scope.username == res.data[i].username &&
          $scope.email == res.data[i].email
        ) {
          alert(
            "Lấy lại tài khoản thành công! Mật khẩu: " + res.data[i].password
          );
          ck = false;
          return;
        }
      }
      if (ck) {
        alert("Lấy lại tài khoản thất bại!");
      }
    };
  });
});
