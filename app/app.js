var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

app.factory("services", ['$http', function($http) {
    var serviceBase = 'services/'
    var obj = {};
    obj.getArticles = function(){
        return $http.get(serviceBase + 'articles');
    }
    obj.getArticle = function(articleID){
        return $http.get(serviceBase + 'article?id=' + articleID);
    }

    obj.insertArticle = function (article) {
        return $http.post(serviceBase + 'insertArticle', article).then(function (results) {
            return results;
        });
    };

    obj.updateArticle = function (id,article) {
        return $http.post(serviceBase + 'updateArticle', {id:id, article:article}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteArticle = function (id) {
        return $http.delete(serviceBase + 'deleteArticle?id=' + id).then(function (status) {
            return status.data;
        });
    };

    return obj;
}]);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/articles.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/articles', {
                title: 'Articles',
                templateUrl: 'partials/articles.html',
                controller: 'authCtrl'
            })
            .when('/', {
               title: 'Articles',
               templateUrl: 'partials/articles.html',
               controller: 'authCtrl',
               role: '0'
            })
            .when('/edit/:articleID', {
                title: 'Edit Articles',
                templateUrl: 'partials/edit.html',
                controller: 'editCtrl',
                resolve: {
                    article: function(services, $route){
                        var articleID = $route.current.params.articleID;
                        return services.getArticle(articleID);
                    }
                }
            })
            .otherwise({
                redirectTo: '/articles'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            // $location.path("/articles");
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/articles");
                    }
                }
            });
        });
    });