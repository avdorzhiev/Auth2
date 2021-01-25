import authorizationApp from '../app';
import mainTemplate from './main.html';
import {CUSTOMER_ID, USER_ID, USER_NAME} from '../../const';
import {UserService} from '../services/UserService';

interface IScope extends angular.IScope{
    showInfo: boolean;
    info: Function;
    logout: Function;
    data: any;
}

class MainCtrl {
    private userID;
    private customerID
    constructor(public $scope: IScope, private userService: UserService, private $location: angular.ILocationService) {
        this.userID = sessionStorage.getItem(USER_ID);
        this.customerID = sessionStorage.getItem(CUSTOMER_ID);
        this.$scope.showInfo = false;
        this.$scope.info = () => this.info();
        this.$scope.logout = () => this.logout();
    }

    public info(){
        this.userService.getData(this.userID).then((response)=>{
            this.$scope.data = response.data;
            this.$scope.showInfo = true;
            console.log(response.data);
        });
    }

    public logout(){
        document.title = 'no name';
        this.userService.logout();
    }

}

authorizationApp
    .controller('mainCtrl', ['$scope', 'userService', '$location', MainCtrl])
    .directive('mainDir', function(){
        return {
            template: mainTemplate,
            controller: 'mainCtrl'
        };
    });