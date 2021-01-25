import authorizationApp from '../app';
import {CUSTOMER_ID, MY_TOKEN, STATUS, USER_ID, USER_NAME} from '../../const';
import {IHttpResponse} from 'angular';

export class UserService {
    private accessToken: string;

    constructor(private $http: angular.IHttpService, private $location: angular.ILocationService) {
    }

    public getData(id: string) {
        // const url = `http://localhost:3000/v1/rs/user/users/${id}`;

        const url = `http://localhost:3000/v1/rs/customers/${id}`;

        const config = {
            headers: {
                'x-access-token': sessionStorage.getItem(MY_TOKEN)
            }
        };
        return this.$http.get(url, config);
    }

    public checkAuthentication(username, password){
        return this.$http.post('http://localhost:3000/v1/auth/login', {
            username: username,
            password: password,
            tenantId: 'de_debug',
        }).then((response: IHttpResponse<any>) => {
            sessionStorage.setItem(MY_TOKEN, response.data.access_token);
            sessionStorage.setItem(USER_ID, response.data.details.userId);
            sessionStorage.setItem(CUSTOMER_ID, response.data.details.customerId);
            sessionStorage.setItem(USER_NAME, username);
            // this.$location.path('main');
        }
        ).catch(err => {
            throw new Error(err.data);
        });
    }

    public logout(){
        sessionStorage.setItem(USER_ID, '');
        sessionStorage.setItem(MY_TOKEN, '');
        this.$location.path('auth');
    }
}

authorizationApp.factory('userService', ['$http', '$location', UserService]);