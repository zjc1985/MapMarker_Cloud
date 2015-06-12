require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success(returnSomthing());
});

function returnSomthing(){
	return "Hello world!";
}

var Routine = AV.Object.extend("Routine");
var OvMarker= AV.Object.extend("OvMarker");
var AVMarker= AV.Object.extend("Marker");

AV.Cloud.define("searchRoutinesByLatlng",function(request,response){
	var lat=request.params.lat;
	var lng=request.params.lng;
	var limit=request.params.limit;
	var page=request.params.page;
	
	//check params
	if(lat==null||lng==null){
		response.error("lat lng required");
	}else if(limit==null||page==null){
		response.error("limit or page required");
	}
	
	var returnValue=[];
	
	var locationPoint=new AV.GeoPoint({latitude: lat, longitude: lng});
	var query=new AV.Query(Routine);
	query.include("user");
	query.near('location',locationPoint);
	query.limit(limit);
	if(page>1){
		var skipNum=(page-1)*limit;
		query.skip(skipNum);
	}
	
	query.find({
		success : function(avRoutines) {
			searchOvMarkersInRoutineIds(avRoutines).then(function(results){
				
				for(var i in results){
					var routine=results[i].avRoutine;
					var user=routine.get("user");
					var ovMarkers=results[i].avOvMarkers;
					
					var routineLat=routine.get('location').latitude;
					var routineLng=routine.get('location').longitude;
					
					var routineJSON={
							userId:user.id,
							userName:user.get('username'),
							uuid:routine.get('uuid'),
							title:routine.get('title'),
							description:routine.get('description'),
							lat:routineLat,
							lng:routineLng
					};
					
					var ovMarkersJSON=[];
					for(var i in ovMarkers){ 
						ovMarkersJSON.push({
							uuid:ovMarkers[i].get('uuid'),
							iconUrl:ovMarkers[i].get('iconUrl'),
							offsetX:ovMarkers[i].get('offsetX'),
							offsetY:ovMarkers[i].get('offsetY'),
						});
					}
					returnValue.push({
						searchedRoutine:routineJSON,
						searchedOvMarkers:ovMarkersJSON
					});
				}
				response.success(returnValue);
			});
			
		}
	});
});

function searchOvMarkersInRoutineIds(avRoutines){
	var promise=new AV.Promise();
	var query=new AV.Query(OvMarker);
	var routineIds=[];
	for(var i in avRoutines){
		routineIds.push(avRoutines[i].get("uuid"));
	}
	query.containedIn("routineId",routineIds);
	query.find().then(function(avOvMarkers){
		var results=[];
		for(var i in avRoutines){
			results.push({
				avRoutine:avRoutines[i],
				avOvMarkers:findOvMarkersByRoutineId(avOvMarkers,avRoutines[i].get("uuid"))
			});
		}
		
		promise.resolve(results);
	});
	return promise;
};

function findOvMarkersByRoutineId(ovMarkers,routineId){
	var results=[];
	for(var i in ovMarkers){
		if(ovMarkers[i].get("routineId")==routineId){
			results.push(ovMarkers[i]);
		}
	}
	return results;
}

AV.Cloud.define("syncMarkersByRoutineId",function(request,response){
	var routineId=request.params.routineId;
	var clientItems=request.params.syncMarkers;
	
	var result={};
	var markersUpdate=[];
	var markersDelete=[];
	var markersNew=[];
	
	if(routineId==null){
		response.error("routineId required");
	}
	
	
	console.log('sync markers with routine id:'+routineId);
	console.log('client sync items:'+JSON.stringify(clientItems));
	var query=new AV.Query(AVMarker);
	query.equalTo("routineId", routineId);
	query.find().then(function(serverAVItems){
		
		for(var i in clientItems){
			var clientItem=clientItems[i];
			console.log('process client item with uuid:'+clientItem.uuid);
			//find related routine in server side
			var serverItem=popAndDeletAVObjectsInArrayByGivenUUID(clientItem.uuid,serverAVItems);
			
			if(serverItem==null){
				//if can not found
				if(clientItem.isSynced){
					//need to client delete
					console.log('not found related server item and client item is not sync,will client delete');
					markersDelete.push({uuid:clientItem.uuid});
				}else{
					console.log('not found related server item and client item is sync,will server new');
					
					//need to server save
					var newItem=new AVMarker();
					newItem.set('uuid',clientItem.uuid);
					newItem.set('iconUrl',clientItem.iconUrl);
					newItem.set('category',clientItem.category);
					newItem.set('title',clientItem.title);
					newItem.set('slideNum',clientItem.slideNum);
					
					var point = new AV.GeoPoint({latitude: clientItem.lat, longitude: clientItem.lng});
					newItem.set('location',point);
					
					newItem.set('mycomment',clientItem.mycomment);
					newItem.set('imgUrls',clientItem.imgUrls);
					newItem.set('address',clientItem.address);
					newItem.set('offsetX',clientItem.offsetX);
					newItem.set('offsetY',clientItem.offsetY);
					newItem.set('routineId',clientItem.routineId);
					newItem.save();
				}
			}else{
				//if found
				var serverTimestamp=toUTCTimeStamp(serverItem.updatedAt);
				console.log('found related server item');
				console.log('client timestamp '+clientItem.updateTime+' server timestamp'+serverTimestamp);
				if(serverTimestamp>clientItem.updateTime){
					//update client
					console.log('client update');
					markersUpdate.push(toMarkerFromAVObjects(serverItem));
				}else if(serverTimestamp<clientItem.updateTime){
					//update server
					if(clientItem.isDelete){
						console.log('server delete, client delete')
						serverItem.destroy();
						markersDelete.push({uuid:clientItem.uuid});
					}else{	
						console.log('server update');
						serverItem.set('iconUrl',clientItem.iconUrl);
						serverItem.set('category',clientItem.category);
						serverItem.set('title',clientItem.title);
						serverItem.set('slideNum',clientItem.slideNum);
						
						var point = new AV.GeoPoint({latitude: clientItem.lat, longitude: clientItem.lng});
						serverItem.set('location',point);
						
						serverItem.set('mycomment',clientItem.mycomment);
						serverItem.set('imgUrls',clientItem.imgUrls);
						serverItem.set('address',clientItem.address);
						serverItem.set('offsetX',clientItem.offsetX);
						serverItem.set('offsetY',clientItem.offsetY);
						
						serverItem.save();
					}
				}else{
					//do nothing
				}
			}
		}
		
		//if still exist item in server side do client new
		for(var i in serverAVItems){
			markersNew.push(toMarkerFromAVObjects(serverAVItems[i]));
		}
		
		
		result.markersUpdate=markersUpdate;
		result.markersDelete=markersDelete;
		result.markersNew=markersNew;
		console.log('SyncEnd: '+JSON.stringify(result));
		
		response.success(result);
	
	});
});

function toMarkerFromAVObjects(serverAVItem){
	var result={};
	result.uuid=serverAVItem.get('uuid');
	result.iconUrl=serverAVItem.get('iconUrl');
	result.offsetX=serverAVItem.get('offsetX');
	result.offsetY=serverAVItem.get('offsetY');
	result.routineId=serverAVItem.get('routineId');
	result.category=serverAVItem.get('category');
	result.title=serverAVItem.get("title");
	result.slideNum=serverAVItem.get('slideNum');
	result.lat=serverAVItem.get('location').toJSON().latitude;
	result.lng=serverAVItem.get('location').toJSON().longitude;
	result.mycomment=serverAVItem.get('mycomment');
	result.imgUrls=serverAVItem.get('imgUrls');
	result.address=serverAVItem.get('address');
	
	result.isDelete=false;
	result.isSynced=true;
	result.updateTime=toUTCTimeStamp(serverAVItem.updatedAt);
	return result;
}

AV.Cloud.define("syncRoutines",function(request,response){
	var syncRoutines=request.params.syncRoutines;
	var syncOvMarkers=request.params.syncOvMarkers;
	
	var result={};
	
	var routinesUpdate=[];
	var routinesDelete=[];
	var routinesNew=[];
	
	var ovMarkersUpdate=[];
	var ovMarkersDelete=[];
	var ovMarkersNew=[];
	
	if(request.user==null){
		console.log('syncRoutines:missing user');
		response.error('user required');
	}
	
	console.log('syncRoutines param:'+JSON.stringify(syncRoutines));
	console.log('syncOvMarkers param:'+JSON.stringify(syncOvMarkers));
	var query=new AV.Query(Routine);
	query.equalTo("user", request.user);
	query.find().then(function(avRoutines){
		console.log('start to sync Routines');
		
		var routineIds=[];
		for(var i in avRoutines){
			routineIds.push(avRoutines[i].get("uuid"));
		}
		
		for(var i in syncRoutines){
			var clientRoutine=syncRoutines[i];
			//find related routine in server side
			var serverAVRoutine=popAndDeletAVObjectsInArrayByGivenUUID(clientRoutine.uuid,avRoutines);
			
			if(serverAVRoutine==null){
				//if can not found
				if(clientRoutine.isSynced){
					//need to client delete
					routinesDelete.push({uuid:clientRoutine.uuid});
				}else{
					//need to server save
					var newRoutine=new Routine();
					newRoutine.set('uuid',clientRoutine.uuid);
					newRoutine.set('title',clientRoutine.title);
					newRoutine.set('description',clientRoutine.description);
					newRoutine.set('user',request.user);
					var point = new AV.GeoPoint({latitude: clientRoutine.lat, longitude: clientRoutine.lng});
					newRoutine.set('location',point);
					newRoutine.save();
				}
			}else{
				//if found
				var serverTimestamp=toUTCTimeStamp(serverAVRoutine.updatedAt);
				if(serverTimestamp>clientRoutine.updateTime){
					//update client
					routinesUpdate.push(toRoutineFromAVObjects(serverAVRoutine));
				}else if(serverTimestamp<clientRoutine.updateTime){
					//update server
					if(clientRoutine.isDelete){
						serverAVRoutine.destroy();
						routinesDelete.push({uuid:clientRoutine.uuid});
					}else{
						serverAVRoutine.set('title',clientRoutine.title);
						serverAVRoutine.set('description',clientRoutine.description);
						var point = new AV.GeoPoint({latitude: clientRoutine.lat, longitude: clientRoutine.lng});
						serverAVRoutine.set('location',point);
						serverAVRoutine.save();
					}
					
				}else{
					//do nothing
				}
			}
		}
		
		//if still exist item in server side do client new
		for(var i in avRoutines){
			routinesNew.push(toRoutineFromAVObjects(avRoutines[i]));
		}
		
		
		result.routinesUpdate=routinesUpdate;
		result.routinesDelete=routinesDelete;
		result.routinesNew=routinesNew;
		
		return fetchOvMarkersInRoutineIds(routineIds);
	}).then(function(avOvMarkers){
		console.log('start to sync ovMarkers');
		
		for(var i in syncOvMarkers){
			var clientOvMarker=syncOvMarkers[i];
			//find related routine in server side
			var serverAvOvMarker=popAndDeletAVObjectsInArrayByGivenUUID(clientOvMarker.uuid,avOvMarkers);
			
			if(serverAvOvMarker==null){
				//if can not found
				if(clientOvMarker.isSynced){
					//need to client delete
					ovMarkersDelete.push({uuid:clientOvMarker.uuid});
				}else{
					//need to server save
					var newOvMarker=new OvMarker();
					newOvMarker.set('uuid',clientOvMarker.uuid);
					newOvMarker.set('iconUrl',clientOvMarker.iconUrl);
					newOvMarker.set('offsetX',clientOvMarker.offsetX);
					newOvMarker.set('offsetY',clientOvMarker.offsetY);
					newOvMarker.set('routineId',clientOvMarker.routineId);
					newOvMarker.save();
				}
			}else{
				//if found
				var serverTimestamp=toUTCTimeStamp(serverAvOvMarker.updatedAt);
				if(serverTimestamp>clientOvMarker.updateTime){
					//update client
					ovMarkersUpdate.push(toOvMarkerFromAVObjects(serverAvOvMarker));
				}else if(serverTimestamp<clientOvMarker.updateTime){
					//update server
					if(clientOvMarker.isDelete){
						serverAvOvMarker.destroy();
						ovMarkersDelete.push({uuid:clientOvMarker.uuid});
					}else{
						serverAvOvMarker.set('iconUrl',clientOvMarker.iconUrl);
						serverAvOvMarker.set('offsetX',clientOvMarker.offsetX);
						serverAvOvMarker.set('offsetY',clientOvMarker.offsetY);
						serverAVRoutine.save();
					}
				}else{
					//do nothing
				}
			}
		}
		
		//if still exist item in server side do client new
		for(var i in avOvMarkers){
			ovMarkersNew.push(toOvMarkerFromAVObjects(avOvMarkers[i]));
		}
		
		
		result.ovMarkersUpdate=ovMarkersUpdate;
		result.ovMarkersDelete=ovMarkersDelete;
		result.ovMarkersNew=ovMarkersNew;
		console.log('SyncEnd: '+JSON.stringify(result));
		
		response.success(result);
	});
});

function fetchOvMarkersInRoutineIds(routineIds){
	var promise=new AV.Promise();
	var query=new AV.Query(OvMarker);
	console.log('fetchOvMarkersInRoutineIds: routineIds'+JSON.stringify(routineIds));
	query.containedIn("routineId",routineIds);
	query.find().then(function(avOvMarkers){
		console.log('fetchOvMarkersInRoutineIds: result'+JSON.stringify(avOvMarkers));
		promise.resolve(avOvMarkers);
	});
	return promise;
};

function toUTCTimeStamp(date){
	return new Date(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			date.getUTCHours(),
			date.getUTCMinutes(), 
			date.getUTCSeconds()
		  ).getTime();
}

function popAndDeletAVObjectsInArrayByGivenUUID(uuid,avObjects){
	var result=null;
	for(var i in avObjects){
		if(uuid==avObjects[i].get('uuid')){
			result=avObjects[i];
			avObjects.splice(i, 1);
		}
	}
	return result;
}

function toOvMarkerFromAVObjects(avOvMarker){
	var result={};
	result.uuid=avOvMarker.get('uuid');
	result.iconUrl=avOvMarker.get('iconUrl');
	result.offsetX=avOvMarker.get('offsetX');
	result.offsetY=avOvMarker.get('offsetY');
	result.routineId=avOvMarker.get('routineId');
	result.isDelete=false;
	result.isSynced=true;
	result.updateTime=toUTCTimeStamp(avOvMarker.updatedAt);
	return result;
}

function toRoutineFromAVObjects(avRoutine){
	var result={};
	result.uuid=avRoutine.get('uuid');
	result.title=avRoutine.get('title');
	result.description=avRoutine.get('description');
	result.lat=avRoutine.get('location').toJSON().latitude;
	result.lng=avRoutine.get('location').toJSON().longitude;
	result.isDelete=false;
	result.isSynced=true;
	result.updateTime=toUTCTimeStamp(avRoutine.updatedAt);
	return result;
}

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