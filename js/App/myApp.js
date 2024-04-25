var app = angular.module("myApp", []);

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
    return $http.put("http://localhost:3000/listStudents" + id, data);
  };
});

app.directive("rePass", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, mCtrl) {
      function rePas(value) {
        var pass = scope.studentR.password;
        if (pass == value) {
          mCtrl.$setValidity("charE", true);
        } else {
          mCtrl.$setValidity("charE", false);
        }
        return value;
      }
      mCtrl.$parsers.push(rePas);
    },
  };
});
app.directive("fee", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, mCtrl) {
      function Sfee(value) {
        var pass = parseInt(value);
        if (pass >= 2000000) {
          mCtrl.$setValidity("charE", true);
        } else {
          mCtrl.$setValidity("charE", false);
        }
        return value;
      }
      mCtrl.$parsers.push(Sfee);
    },
  };
});
