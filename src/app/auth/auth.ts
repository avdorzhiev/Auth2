import authTemplate from './auth.html';
import authorizationApp from '../app';

interface IScope extends angular.IScope {
    username: string;
    password: string;
    showError: boolean;
    login: Function;
    validation: Function;
}

class AuthCtrl{
    constructor(private $scope: IScope, private $location: angular.ILocationService, private userService) {
        this.$scope.username = '';
        this.$scope.password = '';
        this.$scope.showError = false;
        this.$scope.login = () => this.login();
        this.$scope.validation = () => this.validation();
    }
    public login() {
        if (!this.validation()) {
            return;
        }
        const username = this.$scope.username;
        const password = this.$scope.password;
        this.userService.checkAuthentication(username, password).then(()=>{
            document.title = username;
            this.$location.path('main');
        }).catch(() => {
            this.$scope.showError = true;
        });
    }
    private validation(){
        const username = this.$scope.username;
        const password = this.$scope.password;
        return username.trim() && password.trim();
    }
}

authorizationApp
    .controller('authCtrl', ['$scope', '$location', 'userService', AuthCtrl])
    .directive('authDir', function(){
        return {
            template: authTemplate,
            css: require('./auth.css')
        };
    });