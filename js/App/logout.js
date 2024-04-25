var app = angular.module("myapp", []);
app.controller("logoutCtrl", function ($rootScope, $scope, $http) {
  $rootScope.logoff = function () {
    $rootScope.student = null;
    $rootScope.indexStudent = -1;
    alert("Đã đăng xuất!");
    window.location.href = "login.html";
  };
});
