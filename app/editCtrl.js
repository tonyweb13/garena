app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, article) {
    var articleID = ($routeParams.articleID) ? parseInt($routeParams.articleID) : 0;
    $rootScope.title = (articleID > 0) ? 'Edit Article' : 'Add Article';
    $scope.buttonText = (articleID > 0) ? 'Update Post' : 'Post';
      var original = article.data;
      original._id = articleID;
      $scope.article = angular.copy(original);
      $scope.article._id = articleID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.article);
      }

      $scope.deleteArticle = function(article) {
        $location.path('/articles');
        if(confirm("Are you sure to delete this title: "+$scope.article.title)==true)
        services.deleteArticle(article.id);
      };

      $scope.saveArticle = function(article) {
        $location.path('/articles');
        if (articleID <= 0) {
            services.insertArticle(article);
        }
        else {
            services.updateArticle(articleID, article);
        }
    };
});