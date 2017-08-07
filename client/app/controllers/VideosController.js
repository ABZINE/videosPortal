app.controller("VideosController", function($scope, $rootScope, $location, VideoProvider, FlashService, AuthenticationService) {
  $scope.skip = 0;
  $scope.limit = 10;
  $scope.videos=[];

  

  $scope.average=function(ratings){
    var avg=0;
      for(var i=0; i<ratings.length;i++)
        avg+=ratings[i];
    return avg/ratings.length;
  }

  var more = function(){
    VideoProvider.getvideos($scope.limit,$scope.skip,function (err, videos) {
        if (!err) {
          if(videos.data.length>0){
            for (var i = 0; i < videos.data.length; i++){
              $scope.videos.push(videos.data[i]);
            }
            $scope.skip=$scope.skip+$scope.limit;
          }
          setTimeout(function(){$('.load').fadeOut();},2000);
          // console.log('First '+$scope.skip+' videos');
        }
    });
  }

  //load the first 10 videos
  more();

  $scope.getvideoById = function(id) {
      $location.path('/video/' + id);
  }

  $scope.rating= function(id, rating){
    VideoProvider.videoRating(id,rating, function (err, video) {
      if (err){
        FlashService.show("Erreur!!!");
      }
    });
  }
  $scope.loadMore = function() {
    $('.load').fadeIn();
    more();
  };

  $scope.pauseOrPlay = function(index){

    var el = document.getElementsByTagName("video");
    var wrap = document.getElementsByClassName("run");

    for (var i=0;i<el.length; i++) {
      if(el[i].readyState===4){
        if(i==index && el[i].paused){
          el[i].play();
          wrap[i].style.display="none";
        }
        else if(i==index && el[i].played){
          el[i].pause();
          wrap[i].style.display="block";
        }
        else if(el[i].played){
          el[i].pause();
          wrap[i].style.display="block";
        }
      }
    }
              
  };

  $scope.logout = function() {
    AuthenticationService.logout().success(function() {
      $location.path('/login');
    });
  };
});
