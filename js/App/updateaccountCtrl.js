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

app.controller("updateaccountCtrl", function ($rootScope, $scope, dataService) {
  $scope.update = function () {
    // $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
    var id = $rootScope.student.id;
    console.log(id);
    var data = {
      username: $rootScope.student.username,
      password: $rootScope.student.password,
      fullname: $scope.student.fullname,
      email: $scope.student.email,
      gender: $scope.student.gender,
      birthday: $scope.student.birthday,
      schoolfee: $scope.student.schoolfee,
      marks: $scope.student.marks,
      image: "profile1.jpg",
    };
    window.localStorage.removeItem("user");
    window.localStorage.setItem("user", JSON.stringify(data));
    dataService.updateData(id, data).then(function () {
      alert("Cập nhật thành công !Bạn được chuyển tới trang đăng nhập!");
    });
    // window.location.href = "#!login";
    if (localStorage) {
      $rootScope.student = JSON.parse(window.localStorage.getItem("user"));
      console.log($rootScope.student);
    }
  };
});
