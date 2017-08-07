describe('Unit test: Video portal application', function() {
  beforeEach(module('app'));

  var video = {
    name: 'Google Cardboard Assembly', 
    description:'Google Cardboard Assembly Step by Step Instructions [HD]', 
    url:'videos/Google_Cardboard_Assembly.mp4', 
    ratings:[4,5,5,5,3,5,4,5]
  };

  var $httpBackend;
  var AuthenticationService
  var md5;
  var $scoper;
    beforeEach(inject(function($rootScope,_$controller_,_SessionService_,_AuthenticationService_,_$httpBackend_,_md5_){
      AuthenticationService = _AuthenticationService_;
      SessionService = _SessionService_;
      $httpBackend=_$httpBackend_;
      
      md5 = _md5_;
      $scoper=$rootScope.$new();
      $controller = _$controller_;
    }));

    it('Check the MD5 crypting', function() {
      var credentials = {'username':'ali','password':'password'};
      expect(md5.createHash(credentials.password)).toEqual('5f4dcc3b5aa765d61d8327deb882cf99');
    });

    it('Check the LoginContoller and SessionService', function() {
      var credentials = {'username':'ali','password':'password'};
      spyOn(SessionService, 'set');
      var controller = $controller('LoginController', { $scope: $scoper, AuthenticationService:AuthenticationService});
      $scoper.login(credentials);

      $httpBackend.expectPOST('/user/auth').respond({status:'success',sessionId:'123456',username:'zine'});
      $httpBackend.flush();
      expect(SessionService.set).toHaveBeenCalled();
      expect(SessionService.set).toHaveBeenCalledWith('sessionId','123456');
      expect($scoper.credentials).toBeDefined();
      expect($scoper.login).toBeDefined();
    });


    
    beforeEach(inject(function(_$controller_,_AuthenticationService_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      AuthenticationService = _AuthenticationService_;
      
      
    }));
   it('AuthenticationService should exist with methods login,logout,isLoggedIn', function() {
    
      
    var credentials = {'username':'ali','password':'password'};
    expect(AuthenticationService).toBeDefined();
   
    expect(AuthenticationService.logout).toBeDefined();
    expect(AuthenticationService.isLoggedIn).toBeDefined();
    
  });
  beforeEach(inject(function(_Average_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    Average = _Average_;
  }));
  it('Average ratings should exist with methods get', function() {
    var videoAfter_getAverage = {
      name: 'Google Cardboard Assembly', 
      description:'Google Cardboard Assembly Step by Step Instructions [HD]', 
      url:'videos/Google_Cardboard_Assembly.mp4', 
      ratings:[4,5,5,5,3,5,4,5],
      avg:4.5
    };
    expect(Average.get).toBeDefined();
    expect(Average.get(video)).toEqual(videoAfter_getAverage);
  });
});