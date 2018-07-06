app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, services) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $rootScope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('articles');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('articles');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $rootScope.authenticated = false;
            $location.path('articles');
        });
    };
    services.getArticles().then(function(data){
        $scope.articles = data.data;
    });
});