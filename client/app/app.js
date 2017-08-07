var app = angular.module("app", ['angular-md5','ngRoute','ngCookies']);

app.config(function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/partials/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/', {
    templateUrl: 'app/partials/videos.html',
    controller: 'VideosController'
  });

  $routeProvider.when('/video/:videoId', {
    templateUrl: 'app/partials/video.html',
    controller: 'VideoController'
  });

  $routeProvider.otherwise({ redirectTo: '/' });

});

app.config(['$httpProvider',function($httpProvider) {
  //Http Intercpetor to check auth failures for xhr requests
  $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);

app.directive("scroll", function ($window) {
  return function(scope, elements, attrs) {
      var w = angular.element($window);
      w.bind("scroll", function() {
          if ($(document).scrollTop() + $(window).height() >= $('body').height()) {
            scope.$apply(attrs.scroll);
            $('.load').fadeIn();

          }
      });
  };
});

app.directive('videoLoader', function(){
  return function (scope, element, attrs){
    element.bind('loadeddata', function(){
        $(this).parent().removeClass("inload");
    });
  };
});

app.directive('rating', function(){
  return  function (scope, element, attrs){
    element.bind('mouseenter', function(){
      var raw = element[0];
        $(this).prevAll().andSelf().addClass('hover');
        $(this).nextAll().addClass('disabled');
        //scope.$apply();
    });
    element.bind('mouseout', function(){
        $(this).prevAll().andSelf().removeClass('hover');
        $(this).nextAll().removeClass('disabled');
        //scope.$apply();
    });
    element.bind('click', function(){
        if(!$(this).parent().hasClass("rated")){ 
          scope.video.ratings.push($(this).index()+1);
          $(this).parent().addClass("rated");
          scope.$apply(attrs.rating);
        }
        else alert('You have already rated this video!');
        
    });
  };
});