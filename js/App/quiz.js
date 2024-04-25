var app = angular.module("myApp", ["ngRoute"]);
function thoigian(x) {
  thoiluong = x;
  //đem nguoic
  demnguoc();
}
function demnguoc() {
  thoiluong--;
  sophut = Math.floor(thoiluong / 60);
  sogiay = thoiluong % 60;
  document.getElementById("sophut").innerHTML = sophut;
  document.getElementById("sogiay").innerHTML = sogiay;
  //đem nguoc
  setTimeout(demnguoc, 1000);
}
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "subjects.html",
      controller: "subjectCtrl",
    })
    .when("/quiz/:id/:name", {
      templateUrl: "quiz-app.html",
      controller: "quizsCtrl",
    });
});
app.run(function ($rootScope, $http) {
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
    window.location.href = "login.html";
  };
});
app.controller("subjectCtrl", function ($scope, $http) {
  $scope.list_subjects = [];
  $http.get("db/Subjects.js").then(function (reponse) {
    $scope.list_subjects = reponse.data;
  });
});
app.controller(
  "quizsCtrl",
  function ($scope, $http, $routeParams, quizFactory) {
    $http.get("db/Quizs/" + $routeParams.id + ".js").then(function (res) {
      quizFactory.questions = res.data;
    });
  }
);
app.directive("quiz", function (quizFactory, $routeParams) {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "quiz_template.html",
    link: function (scope, ele, attrs) {
      scope.start = function () {
        quizFactory.getQuestions().then(function () {
          scope.subjectName = $routeParams.name;
          scope.id = 1;
          scope.quizOver = false; //Chưa hoàn thành
          scope.inProgess = true;
          scope.getQuestion();
        });
      };
      scope.reset = function () {
        scope.inProgess = false;
        scope.score = 0;
      };
      scope.getQuestion = function () {
        var quiz = quizFactory.getQuestion(scope.id);
        if (quiz) {
          scope.question = quiz.Text;
          scope.options = quiz.Answers;
          scope.answer = quiz.AnswerId;
          scope.answerMode = true;
        } else {
          scope.quizOver = true;
        }
      };
      scope.checkAnswer = function () {
        if (!$("input[name = answer]:checked".length)) {
          return;
        }
        var ans = $("input[name = answer]:checked").val();
        if (ans == scope.answer) {
          // alert("Đáp án đúng");
          scope.score++;
          scope.correctAns = true;
        } else {
          // alert("Đáp án sai");
          scope.correctAns = false;
        }
        scope.answerMode = false;
      };
      scope.next = function () {
        scope.id++;
        scope.getQuestion();
      };
      scope.reset();
    },
  };
});
app.factory("quizFactory", function ($http, $routeParams) {
  return {
    getQuestions: function () {
      return $http
        .get("db/Quizs/" + $routeParams.id + ".js")
        .then(function (res) {
          questions = res.data;
        });
    },
    getQuestion: function (id) {
      var randomItem = questions[Math.floor(Math.random() * questions.length)];
      var count = questions.length;
      if (count > 10) {
        count = 10;
      }
      if (id < count) {
        return randomItem;
      } else {
        return false;
      }
    },
  };
});
