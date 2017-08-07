app.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/home'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(next.originalPath!='/login' && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
    }
  });
});

app.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
               $location.path('/login');
            }
            return $q.reject(rejection);
        }
    }
}]);

app.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

app.factory("SessionService", function($cookies) {
  return {
    get: function(key) {
      return $cookies.get(key);
    },
    set: function(key, val) {
      
      return $cookies.put(key, val);
    },
    unset: function(key) {
      return $cookies.remove(key);
    }
  }
});


app.factory("AuthenticationService", function($http, $location, md5, SessionService, FlashService) {

  var cacheSession   = function(session) {
    SessionService.set('sessionId', session);
  };

  var uncacheSession = function() {
    SessionService.unset('sessionId');
  };

  var encryptCredentials = function(credentials) {
    return {
      username: credentials.username,
      password: md5.createHash(credentials.password)
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post("/user/auth", encryptCredentials(credentials));
      login.success(function(data) {
        if(data.status=="success"){
          //console.log(data.status+' '+data.sessionId+' '+data.username);
          cacheSession(data.sessionId);
          FlashService.clear();
          $location.path('/home');
        }
        else{
         FlashService.show("username or password is incorrect.");
        }
        });
      
      return login;
    },
    logout: function() {
      var logout = $http.get("/user/logout?sessionId="+SessionService.get('sessionId'));
      logout.success(function(data) {
          uncacheSession();
      });
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('sessionId');
    }
  };
});
