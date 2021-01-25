import authorizationApp from '../app';

authorizationApp.filter('dateFilter', () => {
    return (param) => {
        if(param.trim()) {
            param = param.split('T');
            const myDate = param[0].split('-');
            return `${myDate[2]}.${myDate[1]}.${myDate[0]}`;
        }
        return '---';
    };
});