app.service("VideoProvider", function ($http, SessionService) {

    this.getvideos = function (limit,skip, callback) {
		$http.get("/videos?sessionId="+SessionService.get('sessionId')+'&limit='+limit+'&skip='+skip)
	        .success(function (data, status, headers, conf) {
				if(data.status=="success"){
					// send back the data
					callback(null, data);
				}
				else{
					// just send back the error
					callback(data);
				}
	        })
	        .error(function (data, status, headers, conf) {
	            // just send back the error
	            callback(data);
	        });
    };

    this.videoRating = function (id, rating, callback) {

        $http.post("/video/ratings?sessionId="+SessionService.get('sessionId'), {'videoId':id,'rating':rating})
            .success(function (data, status, headers, conf) {
              if(data.status=="success"){
                // just send back the error
                callback(null, data);
              }
              else{
                // just send back the error
                callback(data);
              }
            })
            .error(function (data, status, headers, conf) {
            	// just send back the error
                callback(data);
            });
    };


    this.getvideoById = function (id, callback) {
        $http.get("/video?sessionId="+SessionService.get('sessionId')+"&videoId=" + id)
            .success(function (data, status, headers, conf) {
              if(data.status=="success"){
              	// send back the data
                callback(null, data);
              }
              else{
              	// just send back the error
                callback(data);
              }
            })
            .error(function (data, status, headers, conf) {
                // just send back the error
                callback(data);
            });
    };

});
