var app = angular.module("myapp", []);
app.controller("registerCtrl", function ($rootScope, $scope, $http) {
  $scope.register = function () {
    var a = {
      id: Math.floor,
      username: $scope.studentR.username,
      password: $scope.studentR.password,
      fullname: $scope.studentR.fullname,
      email: $scope.studentR.email,
      gender: $scope.studentR.gender,
      birthday: $scope.studentR.birthday,
      schoolfee: $scope.studentR.schoolfee,
      marks: $scope.studentR.marks,
    };
    console.log(a);
    $http.post("http://localhost:3000/listStudents", a).then(
      function () {
        alert("Đăng ký thành công!");
        window.location.href = "login.html";
      },
      function () {
        alert("Đăng ký thất bại!");
      }
    );
  };
});
