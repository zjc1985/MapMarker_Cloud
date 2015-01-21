function GoogleMapView(a){function l(a){var c,b=i.length;for(c=0;b>c;c++)if(i[c].id==a)return i[c];return null}function m(a,c){var e,g,d={};d.classNames={menu:"context_menu",menuSeparator:"context_menu_separator"},e=[],e.push({className:"context_menu_item",eventName:"edit",id:"lineEdieItem",label:"edit line"},{},{className:"context_menu_item",eventName:"car",label:"go with car"},{className:"context_menu_item",eventName:"bike",label:"go with bike"},{className:"context_menu_item",eventName:"walk",label:"go with walk"},{className:"context_menu_item",eventName:"line",label:"direct line"}),d.menuItems=e,g=new ContextMenu(f,d),google.maps.event.addListener(a,"rightclick",function(a){g.show(a.latLng)}),google.maps.event.addListener(g,"menu_item_selected",function(d,e){var f=a.getPath().getArray(),g=f[0],h=f[f.length-1];switch(e){case"edit":a.setEditable(!0);break;case"line":a.setPath([g,h]),b.lineEditEnd(a.getMainLinePath(),c);break;case"car":t(g,h,google.maps.TravelMode.DRIVING,function(d){a.setPath(d),b.lineEditEnd(a.getMainLinePath(),c)});break;case"bike":t(g,h,google.maps.TravelMode.BICYCLING,function(d){a.setPath(d),b.lineEditEnd(a.getMainLinePath(),c)});break;case"walk":t(g,h,google.maps.TravelMode.WALKING,function(d){a.setPath(d),b.lineEditEnd(a.getMainLinePath(),c)})}})}function n(a){var d,e,c={};c.classNames={menu:"context_menu",menuSeparator:"context_menu_separator"},d=[],d.push({className:"context_menu_item",eventName:"select",label:"Yes this is I want"}),d.push({className:"context_menu_item",eventName:"clearSearch",label:"clear search results"}),c.menuItems=d,e=new ContextMenu(f,c),google.maps.event.addListener(a,"rightclick",function(a){e.show(a.latLng)}),google.maps.event.addListener(e,"menu_item_selected",function(c,d){switch(d){case"select":b.addMarkerClickEvent({lat:c.lat(),lng:c.lng()},{lat:c.lat(),lng:c.lng(),title:a.getTitle()}),r();break;case"clearSearch":r()}})}function o(a){var e,g,c=a.id,d={};d.classNames={menu:"context_menu",menuSeparator:"context_menu_separator"},e=[],e.push({className:"context_menu_item",eventName:"showRoutineDetail",id:"showRoutineDetail"+c,label:"show routine Detail"}),e.push({className:"context_menu_item",eventName:"deleteRoutine",id:"deleteRoutine"+c,label:"delete this routine"}),e.push({className:"context_menu_item",eventName:"addIcon",id:"addIcon"+c,label:"add icon to routine"}),e.push({className:"context_menu_item",eventName:"deleteIcon",id:"deleteIcon"+c,label:"deleteIcon"}),d.menuItems=e,g=new ContextMenu(f,d),google.maps.event.addListener(a,"rightclick",function(a){g.show(a.latLng)}),google.maps.event.addListener(g,"menu_item_selected",function(a,d){switch(d){case"showRoutineDetail":b.showRoutineDetail(c);break;case"deleteRoutine":b.deleteRoutine(c);break;case"addIcon":b.addOvMarker({lat:a.lat(),lng:a.lng()},c);break;case"deleteIcon":b.deleteOvMarker(c)}})}function p(a){var g,h,d=a.id,e={};e.classNames={menu:"context_menu",menuSeparator:"context_menu_separator"},g=[],g.push({className:"context_menu_item",eventName:"showInfo",id:"showInfoItem"+d,label:"showInfo"}),g.push({className:"context_menu_item",eventName:"addSubline",id:"addSublineItem"+d,label:"addSubline"}),g.push({className:"context_menu_item",eventName:"deleteself",id:"deleteselfItem"+d,label:"delete this marker"}),g.push({className:"context_menu_item",eventName:"mergeImgUrl",id:"mergeImgUrlItem"+d,label:"Merge ImgUrl To..."}),e.menuItems=g,h=new ContextMenu(f,e),google.maps.event.addListener(a,"rightclick",function(a){h.show(a.latLng)}),google.maps.event.addListener(h,"menu_item_selected",function(d,e){switch(e){case"showInfo":console.log("=========show Info========");var f=c.fromLatLngToPixel(a.getLatLng());console.log(f),console.log(a.getPosition()),console.log(c.fromPixelToLatLng(f));break;case"addMainline":b.addMainLineClickHandler(a);break;case"addSubline":b.addSubLineClickHandler(a);break;case"deleteself":b.markerDeleteClickHandler(a);break;case"mergeImgUrl":b.mergeImgUrlClickHandler(a)}})}function q(){var d,e,a={};a.classNames={menu:"context_menu",menuSeparator:"context_menu_separator"},d=[],d.push({className:"context_menu_item",eventName:"addMarker",id:"addMarkerItem",label:"add Mark"}),d.push({className:"context_menu_item",eventName:"saveRoutine",id:"saveRoutineItem",label:"save Routine"}),d.push({className:"context_menu_item",eventName:"loadRoutine",id:"loadRoutineItem",label:"load Routine"}),d.push({className:"context_menu_item",eventName:"uploadImg",id:"uploadItem",label:"upload image"}),d.push({}),d.push({className:"context_menu_item",eventName:"showAll",id:"showAllItem",label:"show all routines"}),d.push({}),d.push({className:"context_menu_item",eventName:"startSlide",id:"startSlideItem",label:"Start slide mode"}),d.push({className:"context_menu_item",eventName:"prevSlide",id:"prevSlideItem",label:"Prev slide"}),d.push({className:"context_menu_item",eventName:"exitSlide",id:"exitSlideItem",label:"End slide mode"}),a.menuItems=d,e=new ContextMenu(f,a),google.maps.event.addListener(f,"rightclick",function(a){e.show(a.latLng)}),google.maps.event.addListener(f,"click",function(){b.mapClickEventHandler()}),google.maps.event.addListener(f,"zoom_changed",function(){b.zoomEventHandler()}),google.maps.event.addListener(e,"menu_item_selected",function(a,d){switch(d){case"addMarker":b.addMarkerClickEvent({lat:a.lat(),lng:a.lng()},{lat:a.lat(),lng:a.lng()});break;case"saveRoutine":b.saveRoutine();break;case"loadRoutine":b.loadRoutines();break;case"uploadImg":c.uploadImgForm.show();break;case"showAll":b.showAllRoutineClickHandler();break;case"startSlide":b.startSlideMode();break;case"exitSlide":b.exitSlideMode();break;case"prevSlide":b.prevSlide()}})}function r(){for(var b,a=0;b=k[a];a++)b.setMap(null);k=[]}function s(){var b,c,a=document.getElementById("searchKey");f.controls[google.maps.ControlPosition.TOP_LEFT].push(a),b=document.getElementById("searchButton"),f.controls[google.maps.ControlPosition.TOP_LEFT].push(b),c=new google.maps.places.SearchBox(a),google.maps.event.addListener(c,"places_changed",function(){var b,e,d,h,a=c.getPlaces();for(r(),b=new google.maps.LatLngBounds,d=0;e=a[d];d++)({url:e.icon}),h=new google.maps.Marker({map:f,title:e.name,position:e.geometry.location,icon:"http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png"}),k.push(h),n(h),b.extend(e.geometry.location);f.fitBounds(b)}),google.maps.event.addListener(f,"bounds_changed",function(){var a=f.getBounds();c.setBounds(a)})}function t(a,b,c,d){var f={origin:a,destination:b,travelMode:c};e.route(f,function(a,b){var c,e;b==google.maps.DirectionsStatus.OK&&(c=a.routes[0],e=c.legs[0],d(c.overview_path,e.duration.text))})}function u(a){var b;AMap.service(["AMap.PlaceSearch"],function(){b=new AMap.PlaceSearch({pageSize:5,pageIndex:1}),b.search(a,function(b,c){var d,e,h,g,i,j;if("complete"===b&&"OK"===c.info){for(console.log("search key is "+a),d=c.poiList.pois,r(),e=new google.maps.LatLngBounds,g=0;h=d[g];g++)i=new google.maps.LatLng(h.location.getLat(),h.location.getLng()),j=new google.maps.Marker({map:f,title:h.name,position:i,icon:"resource/icons/default/search_default.png"}),k.push(j),n(j),e.extend(i);f.fitBounds(e)}})})}var c,e,f,g,h,i,j,k,b=a;this.markerNeedMainLine=null,this.markerNeedSubLine=null,this.markerNeedMergeImgUrl=null,this.infocard=null,this.uploadImgForm=null,this.popupForm=null,this.currentMarkerId=-1,c=this,new google.maps.DirectionsRenderer,e=new google.maps.DirectionsService,i=new Array,j=new Array,k=[],this.hideEditMenuInContextMenu=function(){document.getElementById("addMarkerItem").style.display="none",document.getElementById("saveRoutineItem").style.display="none"},this.setMarkerAnimation=function(a,b){googleMarker=c.getViewOverlaysById(a),googleMarker instanceof google.maps.Marker&&("BOUNCE"==b?googleMarker.setAnimation(google.maps.Animation.BOUNCE):"DROP"==b?googleMarker.setAnimation(google.maps.Animation.DROP):googleMarker.setAnimation(null))},this.getViewOverlaysById=function(a){return l(a)},this.setMarkerZIndex=function(a,b){var d=c.getViewOverlaysById(a);d.setZIndex(b)},this.initSlideMode=function(){var a,b;document.getElementById("addMarkerItem").style.display="none",document.getElementById("saveRoutineItem").style.display="none",document.getElementById("loadRoutineItem").style.display="none",document.getElementById("uploadItem").style.display="none",document.getElementById("showAllItem").style.display="none";for(a in i)i[a]instanceof google.maps.Marker&&(b=i[a].id,i[a].setDraggable(!1),null!=b&&(document.getElementById("addSublineItem"+b).style.display="none",document.getElementById("deleteselfItem"+b).style.display="none",document.getElementById("mergeImgUrlItem"+b).style.display="none"))},this.exitSlideMode=function(){var a,b;document.getElementById("addMarkerItem").style.display="",document.getElementById("saveRoutineItem").style.display="",document.getElementById("loadRoutineItem").style.display="",document.getElementById("uploadItem").style.display="",document.getElementById("showAllItem").style.display="";for(a in i)i[a]instanceof google.maps.Marker&&(i[a].setDraggable(!0),b=i[a].id,null!=b&&(document.getElementById("showInfoItem"+b).style.display="",document.getElementById("addSublineItem"+b).style.display="",document.getElementById("deleteselfItem"+b).style.display="",document.getElementById("mergeImgUrlItem"+b).style.display=""))},this.getCenter=function(){return{lat:f.getCenter().lat(),lng:f.getCenter().lng()}},this.fitRoutineBounds=function(){var b,a=new google.maps.LatLngBounds;for(b=0;b<i.length;b++)i[b]instanceof google.maps.Marker&&a.extend(i[b].getPosition());f.fitBounds(a)},this.fitBoundsByIds=function(a){var d,e,b=new google.maps.LatLngBounds;for(d in a)e=c.getViewOverlaysById(a[d]),e instanceof google.maps.Marker&&b.extend(e.getPosition());f.fitBounds(b)},this.panByIds=function(a){var d,e,b=new google.maps.LatLngBounds;for(d in a)e=c.getViewOverlaysById(a[d]),e instanceof google.maps.Marker&&b.extend(e.getPosition());f.panTo(b.getCenter())},this.fitTwoPositionBounds=function(a,b){var c=new google.maps.LatLngBounds;c.extend(new google.maps.LatLng(a.lat,a.lng)),c.extend(new google.maps.LatLng(b.lat,b.lng)),f.fitBounds(c)},this.createView=function(){var a,d;this.infocard=new infoCard("infoCard"),this.infocard.initDefault("80px","100px",{title:"unknownTitle"},null),this.infocard.addEditFormOKButtonEvent(function(){var a=c.infocard.editFormClickOK();console.log("infocard edit form ok, content:"+a.iconUrl),b.updateMarkerContentById(c.currentMarkerId,a)}),this.infocard.hide(),a={center:new google.maps.LatLng(37.3841308,-121.9801145),disableDoubleClickZoom:!0,zoom:15,minZoom:5,mapTypeId:google.maps.MapTypeId.ROADMAP},f=new google.maps.Map(document.getElementById("l-map"),a),g=new google.maps.OverlayView,g.draw=function(){},g.setMap(f),q(),d=mcOptions={styles:[{height:53,url:"resource/icons/cluster/m1.png",width:53},{height:56,url:"resource/icons/cluster/m2.png",width:56},{height:66,url:"resource/icons/cluster/m3.png",width:66}]},h=new MarkerClusterer(f,null,d),h.setGridSize(30),s(),this.uploadImgForm=new UploadFormView("uploadImageForm","file","progress","loading"),this.uploadImgForm.addChangeCallBack(function(a,c,d,e){b.uploadImgs(a,c,d,e)}),this.popupForm=new PopupForm("CommentPopupForm"),this.infocard.setPopupCommentForm(this.popupForm)},this.fromPixelToLatLng=function(a){var b=new google.maps.Point(a.x,a.y),c=g.getProjection().fromContainerPixelToLatLng(b);return{lat:c.lat(),lng:c.lng()}},this.fromLatLngToPixel=function(a){var b=new google.maps.LatLng(a.lat,a.lng),c=g.getProjection().fromLatLngToContainerPixel(b);return{x:c.x,y:c.y}},this.pixelDistance=function(a,b){var c=this.fromLatLngToPixel(new google.maps.LatLng(a.lat,a.lng)),d=this.fromLatLngToPixel(new google.maps.LatLng(b.lat,b.lng));return Math.pow(Math.pow(c.x-d.x,2)+Math.pow(c.y-d.y,2),.5)},this.resetView=function(){for(var a=0;a<i.length;a++)i[a].setMap(null);i=[]},this.centerAndZoom=function(a,b){f.panTo(new google.maps.LatLng(a,b))},this.addOneMark=function(a,c,d){var e=new google.maps.LatLng(a,c),g=new google.maps.Marker({position:e,map:f});g.id=d,g.isShow=!0,g.setDraggable(!0),p(g),google.maps.event.addListener(g,"click",function(){b.markerClickEventHandler(g)}),google.maps.event.addListener(g,"dragend",function(){b.markerDragendEventHandler(g.id,g.getPosition().lat(),g.getPosition().lng())}),g.hide=function(){g.setVisible(!1),g.isShow=!1},g.show=function(){g.setVisible(!0),g.isShow=!0},g.getLatLng=function(){return{lat:g.getPosition().lat(),lng:g.getPosition().lng()}},i.push(g)},this.addOverviewMarker=function(a,c,d,e){var g=new google.maps.LatLng(a,c),h=new google.maps.Marker({position:g,map:f});h.id=d,h.isShow=!0,null==e||null==e.needDrag||0==e.needDrag?h.setDraggable(!1):h.setDraggable(!0),o(h),google.maps.event.addListener(h,"click",function(){b.overviewMarkerClickEventHandler(h.id)}),google.maps.event.addListener(h,"dragend",function(){b.viewMarkerDragendEventHandler(h.id,h.getPosition().lat(),h.getPosition().lng())}),h.hide=function(){h.setVisible(!1),h.isShow=!1},h.show=function(){h.setVisible(!0),h.isShow=!0},h.getLatLng=function(){return{lat:h.getPosition().lat(),lng:h.getPosition().lng()}},i.push(h)},this.showAllMarkers=function(){var b,a=i.length;for(b=0;a>b;b++)i[b]instanceof google.maps.Marker&&(i[b].isShow=!0,i[b].show())},this.drawMainLine=function(a,d,e,g){var n,o,h=this.getViewOverlaysById(a),j=this.getViewOverlaysById(d),k={path:google.maps.SymbolPath.FORWARD_CLOSED_ARROW},l=[new google.maps.LatLng(h.getPosition().lat(),h.getPosition().lng())];if(null!=g)for(n=1;n<g.length-1;n++)l.push(new google.maps.LatLng(g[n].lat,g[n].lng));return l.push(new google.maps.LatLng(j.getPosition().lat(),j.getPosition().lng())),o=new google.maps.Polyline({path:l,icons:[{icon:k,offset:"100%"}],map:f,strokeColor:"blue",strokeWeight:6,strokeOpacity:.5,geodesic:!0}),o.id=e,o.isShowRoute=!1,o.getMainLinePath=function(){var c,a=o.getPath().getArray(),b=new Array;for(c=0;c<a.length;c++)b.push({lat:a[c].lat(),lng:a[c].lng()});return b},m(o,a),google.maps.event.addListener(o,"click",function(){var e,f;console.log(o.getPath().getLength()),e=o.getMainLinePath()[0],f=o.getMainLinePath()[o.getMainLinePath().length-1],c.fitTwoPositionBounds(e,f),1==o.getEditable()&&(o.setEditable(!1),b.lineEditEnd(o.getMainLinePath(),a)),o.isShowRoute=!o.isShowRoute}),i.push(o),o},this.drawOvLine=function(a,b){var c=[new google.maps.LatLng(a.lat,a.lng),new google.maps.LatLng(b.lat,b.lng)],d=new google.maps.Polyline({path:c,map:f,strokeOpacity:.7,strokeColor:"black",strokeWeight:.6});j.push(d)},this.drawSubLine=function(a,b,c){var d,e,g,h,j;1==this.getViewOverlaysById(b).isShow&&(d=this.getViewOverlaysById(a),e=this.getViewOverlaysById(b),g={path:"M 0,-1 0,1",strokeOpacity:.8,scale:4},h=[new google.maps.LatLng(d.getPosition().lat(),d.getPosition().lng()),new google.maps.LatLng(e.getPosition().lat(),e.getPosition().lng())],j=new google.maps.Polyline({path:h,strokeOpacity:0,icons:[{icon:g,offset:"0",repeat:"20px"}],map:f,strokeColor:"Green",strokeWeight:1}),j.id=c,i.push(j))},this.removeAllOvLines=function(){for(var a=0;a<j.length;a++)j[a].setMap(null);j=new Array},this.removeAllLines=function(){for(var a=0;a<i.length;a++)i[a]instanceof google.maps.Polyline&&(i[a].setMap(null),i.splice(a,1),a--)},this.removeById=function(a){for(var b=0;b<i.length;b++)i[b].id==a&&(i[b].setMap(null),i.splice(b,1),b--)},this.changeMarkerIcon=function(a,b){var c=this.getViewOverlaysById(a);c.setIcon(b)},this.setMarkerDragable=function(a,b){var c=this.getViewOverlaysById(a);c.setDraggable(b)},this.addInfoWindow=function(a,b){var d=new google.maps.InfoWindow({content:b.title});return d.show=function(){console.log("infowwindow show"),d.open(f,a)},d.hide=function(){d.close()},d},this.searchLocation=function(a){u(a)},this.clearMarkerCluster=function(){h.clearMarkers();for(var a in i)i[a]instanceof google.maps.Marker&&i[a].setMap(f)},this.AddMarkers2Cluster=function(a){var d,e,b=new Array;for(d in a)e=c.getViewOverlaysById(a[d]),b.push(e);h.addMarkers(b)},this.getZoom=function(){return f.getZoom()},this.setMapStyle2Default=function(){console.log("view.setMapStyle2Default");var a=[];f.setOptions({styles:a})},this.setMapStyle2Custom=function(){console.log("view.setMapStyle2Custom");var a=[{featureType:"road",stylers:[{visibility:"off"}]},{featureType:"water",stylers:[{color:"#73ABAD"}]},{featureType:"administrative.locality",stylers:[{visibility:"simplified"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{color:"#F0EDDF"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#698DB7"}]}];f.setOptions({styles:a})},this.isInCustomZoom=function(){var a=c.getZoom();return 5==a||6==a||7==a?!0:!1},this.setMapZoom=function(a){f.setZoom(a)}}function CanvasProjectionOverlay(){}CanvasProjectionOverlay.prototype=new google.maps.OverlayView,CanvasProjectionOverlay.prototype.constructor=CanvasProjectionOverlay,CanvasProjectionOverlay.prototype.onAdd=function(){},CanvasProjectionOverlay.prototype.draw=function(){},CanvasProjectionOverlay.prototype.onRemove=function(){};