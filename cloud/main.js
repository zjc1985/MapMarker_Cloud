require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var Routine = AV.Object.extend("Routine");
var OvMarker= AV.Object.extend("OvMarker");
var AVMarker= AV.Object.extend("Marker");

AV.Cloud.define("fetchMarkersByRoutineId", function(request, response) {
	var routineId= request.params.routineId;
	
	var query=new AV.Query(AVMarker);
	query.equalTo("routineId",routineId);
	
	query.find({
	    success: function(avMarkers) {
	    	var result={};
	    	var markersJSON=[];
			for(var i in avMarkers){
				var avMarker=avMarkers[i];
				var markerContent={
					id: avMarker.get('uuid'),
					title:avMarker.get('title'),
					mycomment:avMarker.get('mycomment'),
					iconUrl:avMarker.get('iconUrl'),
					lat:avMarker.get('location').toJSON().latitude,
					lng:avMarker.get('location').toJSON().longitude,
					slideNum:avMarker.get('slideNum'),
					imgUrls:JSON.parse(avMarker.get('imgUrls')),
					category:avMarker.get('category')
				};
				markersJSON.push(markerContent);
			}
			result.returnValue=markersJSON;
			result.avObjects=avMarkers;
			response.success(result);
	    },
	    error: function() {
	    	response.error('fetchMarkersByRoutineId failed');
	    }
	  });
});