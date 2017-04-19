

// main app Dependency
angular.module('libs', [
    'ui.router',
    'ui.bootstrap',
    'ui.utils.masks',
    'ui-notification', //https://github.com/alexcrack/angular-ui-notification
    'ngAnimate'
])

// My app
var app = angular.module('app', ['libs'] );

app.config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.when('', '/');

    // Routes
    $stateProvider.state({
        name: 'home',
        url: '/',
        controller: 'indexCtrl'
    });

});


app.run(['$rootScope', '$state', function($rootScope, $state){

}]);
