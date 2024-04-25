var app = angular.module("myapp", []);

app.run(function ($rootScope, $http, dataService) {
  dataService.getData().then(function (res) {
    $rootScope.list_user = res.data;
    console.log($rootScope.list_user);
  });

  if (localStorage) {
    $rootScope.student = JSON.parse(window.localStorage.getItem("user"));
    console.log($rootScope.student);
  } else {
    $rootScope.student = null;
  }

  $http.get("db/Subjects.js").then(function (response) {
    $rootScope.subjects = response.data;
  });

  $rootScope.logoff = function () {
    $rootScope.student = null;
    window.localStorage.clear();
    alert("Đã đăng xuất!");
    window.location.href = "index.html";
  };
});

app.service("dataService", function ($http) {
  this.getData = function () {
    return $http.get("http://localhost:3000/listStudents");
  };
  this.updateData = function (id, data) {
    return $http.put("http://localhost:3000/listStudents/" + id, data);
  };
});

app.controller(
  "changepasswordCtrl",
  function ($rootScope, $scope, dataService) {
    $scope.change = function () {
      if ($rootScope.student.password == $scope.oldpassword) {
        if ($rootScope.student.password == $scope.studentR.password) {
          alert("Mật khẩu mới trùng mật khẩu cũ!");
        } else {
          var arr = {
            username: $rootScope.student.username,
            password: $scope.studentR.password,
            fullname: $rootScope.student.fullname,
            email: $rootScope.student.email,
            gender: $rootScope.student.gender,
            birthday: $rootScope.student.birthday,
            schoolfee: $rootScope.student.schoolfee,
            marks: $rootScope.student.marks,
          };
          dataService.updateData($rootScope.student.id, arr).then(function () {
            alert("Đổi mật khẩu thành công");
            window.location.href = "login.html";
          });
          if (localStorage) {
            $rootScope.student = JSON.parse(
              window.localStorage.getItem("user")
            );
            console.log($rootScope.student);
          } else {
            window.location.href = "login.html";
          }
        }
      } else {
        alert("Mật khẩu cũ không đúng");
      }
      $scope.oldpassword = "";
      $scope.studentR.password = "";
      $scope.renewpassword = "";
    };
  }
);
