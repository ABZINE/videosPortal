app.controller("LoginController", function($scope, AuthenticationService) {
  $scope.credentials = { username: "", password: "" };
  $scope.login = function() {
    AuthenticationService.login($scope.credentials);
  };});