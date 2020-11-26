import angular from 'angular'
// import ngRoute from 'angular-route';
// import angular from 



const MY_TOKEN: string = 'name';

sessionStorage.setItem('admin', 'admin')
sessionStorage.setItem('user', '1234')
sessionStorage.setItem('Vlad', 'qwerty')


angular.module('authorizationApp', ['ngRoute'])
  .controller('authController', ['$scope',
    function authController($scope) {
      document.title = 'auth';
      $scope.login = ''
      $scope.password = ''
      $scope.check = function (login: string, password: string) {
        if (login.trim() && password.trim()) {
          if (sessionStorage.getItem(login) == password) {
            sessionStorage.setItem(MY_TOKEN, login);
            document.location.href = '/main'
          }
          else alert('Неверный логин или пароль')
        } else alert('Введите логин и пароль!')
      }
    }]
  )
  .controller('mainController',
    ['$scope', function mainController($scope) {
      let name = sessionStorage.getItem(MY_TOKEN);
      document.title = name;
      $scope.name = name;
      $scope.logout = function () { document.location.href = '/auth' }
    }]
  )
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/auth',
      {
        template: `<div ng-controller="authController">
        <h1> Страница авторизации </h1>
        <div class="container">
            <div class="form-control">
                <input type="text" placeholder="login" ng-model="login">
            </div>
    
            <div class="form-control">
                <input type="password" placeholder="Пароль" ng-model="password">
            </div>
            <button class="btn" ng-click="check(login, password)">Войти</button>
        </div>
    </div> `,
        controller: 'authController'
      });
    $routeProvider.when('/main',
      {
        template: `<div ng-controller="mainController">
        <h1> Hello {{ name }}</h1>
        <button class="btn" ng-click="logout()">Выйти</button>
    </div>`,
        controller: 'mainController'
      });
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({ redirectTo: '/auth' });
  }]
  )

export default 'authorizationApp'