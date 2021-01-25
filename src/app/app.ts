sessionStorage.setItem('admin', 'admin');
sessionStorage.setItem('t_admin', 'danOlXTUjL3P');
sessionStorage.setItem('Albatros', 'dsz4mmbjIB2a');
sessionStorage.setItem('user', '1234');
sessionStorage.setItem('Vlad', 'qwerty');

const authorizationApp = window.angular.module('authorizationApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/auth',
            {
                template: `<auth-dir></auth-dir>`
            });
        $routeProvider.when('/main',
            {
                template: `<main-dir></main-dir>`
            });

        $locationProvider.html5Mode(true);
        $routeProvider.otherwise({ redirectTo: '/auth' });
    }]
    );

export default authorizationApp;