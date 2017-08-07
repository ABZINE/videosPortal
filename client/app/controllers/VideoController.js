app.controller("VideoController", function($scope, $location, $routeParams, VideoProvider) {
  $scope.average=function(ratings){
    var avg=0;
      for(var i=0; i<ratings.length;i++)
        avg+=ratings[i];
    return avg/ratings.length;
  }
  VideoProvider.getvideoById($routeParams['videoId'], function (err, video) {
    if (err) {
      FlashService.show("No such video. Are you calling this right?");
    } else {
      $scope.videos = [video.data];
    }
  });

  $scope.rating= function(id, rating){
    VideoProvider.videoRating(id,rating, function (err) {
      if (err) {
        FlashService.show("Erreur!!!");
      }
    });
  }

  $scope.home= function(){
    $location.path('/');
  }
    
});
