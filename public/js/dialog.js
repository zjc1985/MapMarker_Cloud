function NavBar(id){
	this.saveLinkClick=function(handler){
		$('#'+id).find('.saveLink').click(handler);
	};
	
	this.toCustomStyleClick=function(handler){
		$('#'+id).find('.toCustomStyle').click(handler);
	};
	
	this.startSlideClick=function(handler){
		$('#'+id).find('.startSlideLink').click(handler);
	};
	this.prevSlideClick=function(handler){
		$('#'+id).find('.prevSlideLink').click(handler);
	};
	this.endSlideClick=function(handler){
		$('#'+id).find('.endSlideLink').click(handler);
	};
	this.createMarkerClick=function(handler){
		$('#'+id).find('.createMarkerBtn').click(handler);
	};
	this.createMarkerWithImageClick=function(handler){
		$('#'+id).find('.createMarkerWithImageBtn').click(handler);
	};
	this.createRoutineClick=function(handler){
		$('#'+id).find('.createRoutineBtn').click(handler);
	};

	this.disableEditFunction=function(){
		$('#'+id).find('.createDropdown').addClass('hide');
	};
	this.enableEditFunction=function(){
		$('#'+id).find('.createDropdown').removeClass('hide');
	};
	
	this.hideCreateMarkerBtn=function(){
		$('#'+id).find('.createMarkerBtn').addClass('hide');
	};
	
	this.hideCreateMarkerWithImageBtn=function(){
		$('#'+id).find('.createMarkerWithImageBtn').addClass('hide');
	};
	
	this.hideCreateRoutineBtn=function(){
		$('#'+id).find('.createRoutineBtn').addClass('hide');
	};
	
	this.showCreateRoutineBtn=function(){
		$('#'+id).find('.createRoutineBtn').removeClass('hide');
	};
	
	this.showCreateMarkerBtn=function(){
		$('#'+id).find('.createMarkerBtn').removeClass('hide');
	};
	
	this.showCreateMarkerWithImageBtn=function(){
		$('#'+id).find('.createMarkerWithImageBtn').removeClass('hide');
	};
	
	this.hideSlideDropDown=function(){
		$('#'+id).find('.slideDropdown').addClass('hide');
	};
	
	this.showSlideDropDown=function(){
		$('#'+id).find('.slideDropdown').removeClass('hide');
	};
};

function MarkerInfo(id){
	this.show=function(){
		$('#'+id).modal('show');
	};
	
	this.hide=function(){
		$('#'+id).modal('hide');
	};
	
	this.setTitle=function(str){
		$('#'+id).find('.markerInfoTitle').text(str);
	};
	
	this.copyBtnClick=function(handler){
		$("#"+id).find(".copyBtn").click(handler);
	};
	
	this.setSubTitle=function(str){
		$('#'+id).find('.markerInfoSubTitle').text(str);
	};
	
	this.setDescription=function(str){
		$('#'+id).find('.markerInfoDescription').text(str);
	};
	
	this.disableEditFunction=function(){
		$('#'+id).find('.EditBtn').addClass('disabled');
	};
	
	this.enableEditFunction=function(){
		$('#'+id).find('.EditBtn').removeClass('disabled');
	};
	
	this.setImageSlider=function(urls){
		$('#'+id).find('.carousel-indicators').empty();
		$('#'+id).find('.carousel-inner').empty();
		
		for(var i in urls){
			if(urls[i].replace(/\s+/g,"")!=''){
				var indicatorsHtml;
				var imageItemHtml;
				if(i==0){
					indicatorsHtml="<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";
					imageItemHtml="<div class='item active'>"+
						"<img src="+urls[i]+"></div>";
				}else{
					indicatorsHtml="<li data-target='#myCarousel' data-slide-to='"+i+"'></li>";
					imageItemHtml="<div class='item'>"+
						"<img src="+urls[i]+"></div>";
				}
				$('#'+id).find('.carousel-indicators').append(indicatorsHtml);
				$('#'+id).find('.carousel-inner').append(imageItemHtml);
			}
		}
	};
};

function SearchMarkerInfo(id){
	extend(SearchMarkerInfo,MarkerInfo,this,[id]);
	this.copyMarkerBtnClick=function(handler){
		$("#"+id).find(".copyMarkerBtn").click(handler);
	};
	this.clearSearchResultsBtnClick=function(handler){
		$("#"+id).find(".clearResultBtn").click(handler);
	};
	
	this.show=function(){
		$('#'+id).modal('show');
	};
	
	this.hide=function(){
		$('#'+id).modal('hide');
	};
}

function OvMarkerInfo(id){
	extend(OvMarkerInfo,MarkerInfo,this,[id]);
	this.showRoutineDetail=function(handler){
		$("#"+id).find(".showDetailBtn").click(handler);
	};
	this.copyRoutineBtnClick=function(handler){
		$("#"+id).find(".copyRoutineBtn").click(handler);
	};
	this.setUser=function(userId,userName){
		$('#'+id).find('.userInfo').empty();
		var userLink="<a href='myMap.html?userId="+userId+"'>"+userName+"</a>";
		$('#'+id).find('.userInfo').append(userLink);
	}
};

function PickRoutineModal(id){
	var selectedItemValue='default';
	
	this.setDesc=function(str){
		$('#'+id).find('.editDesc').val(str);	
	};
	this.getDesc=function(){
		return $('#'+id).find('.editDesc').val();
	};
	
	this.show=function(){
		$('#'+id).modal('show');
	};
	
	this.hide=function(){
		$('#'+id).modal('hide');
	};
	
	
	this.setDropDownItems=function(items){
		$('#'+id).find('.dropdown-menu').empty();
		$('#'+id).find('.dropdown-menu').append("<li><a id='default' href='#'>Create New</a></li>");
		$('#'+id).find('.dropdown-menu').append("<li class='divider'></li>");
		
		for(var i in items){
			var itemHtml="<li><a href='#' id='"+items[i].value+"'>"+items[i].name+"</a></li>";
			$('#'+id).find('.dropdown-menu').append(itemHtml);
		}
		
		$('#'+id).find(".dropdown-menu li a").click(function(){
			  var selText = $(this).text();
			  selectedItemValue=$(this).attr('id');
			  $('#'+id).find('.selectedTxt').html(selText+' <span class="caret"></span>');
		});
	};
	
	this.getRoutineNameSelect=function(){
		return {name: $('#'+id).find('.selectedTxt').text().replace(/\s+/g,""),
				value:selectedItemValue};
	};
	
	this.setRoutineNameSelect=function(item){
		$('#'+id).find('.selectedTxt').html(item.name+' <span class="caret"></span>');
		 selectedItemValue=item.value;
	};
	
	this.confirmClick=function(handler){
		$("#"+id).find(".editConfirmBtn").click(handler);
	};
}

function createRoutineModal(id){
	this.setTitle=function(str){
		$('#'+id).find('.editTitle').val(str);	
	};
	this.getTitle=function(){
		return $('#'+id).find('.editTitle').val();
	};
	
	this.setDesc=function(str){
		$('#'+id).find('.editDesc').val(str);	
	};
	this.getDesc=function(){
		return $('#'+id).find('.editDesc').val();
	};
	
	this.confirmClick=function(handler){
		$("#"+id).find(".editConfirmBtn").click(handler);
	};
}

function MarkerEditor(id){
	var self=this;
	
	this.confirmClick=function(handler){
		$("#"+id).find(".editConfirmBtn").click(handler);
	};
	
	this.deleteClick=function(handler){
		$("#"+id).find(".deleteBtn").click(handler);
	};
	
	this.setTitle=function(str){
		$('#'+id).find('.editTitle').val(str);	
	};
	this.getTitle=function(){
		return $('#'+id).find('.editTitle').val();
	};
	
	this.setCost=function(str){
		$('#'+id).find('.editCost').val(str);	
	};
	this.getCost=function(){
		return $('#'+id).find('.editCost').val();
	};
	
	this.setDesc=function(str){
		$('#'+id).find('.editDesc').val(str);	
	};
	this.getDesc=function(){
		return $('#'+id).find('.editDesc').val();
	};
	
	this.setUrls=function(urlArray){
		var str="";
		
		for(var i in urlArray){
			str=str+urlArray[i]+";\n";
		}
		$('#'+id).find('.editUrls').val(str);	
	};
	this.getUrls=function(){
		return $('#'+id).find('.editUrls').val().split(";");
	};
	
	this.setMaxSlideNum=function(maxNum){
		$('#'+id).find('.editSlideNum').empty();
		for(var i=1;i<maxNum+1;i++){
			$('#'+id).find('.editSlideNum').append("<option value='"+i+"'>"+i+"</option>");
		}	
	};
	
	this.getSlideNum=function(){
		return $('#'+id).find('.editSlideNum').val();
	};
	
	this.setSlideNum=function(slideNum){
		$('#'+id).find('.editSlideNum').val(slideNum);
	};
	
	this.setCategoryDropDownItems=function(items){
		//CategoryDropDownMenu
		$('#'+id).find('.CategoryDropDownMenu').empty();
		for(var i in items){
			var itemHtml="<li><a href='#' value='"+items[i].value+"'>"+items[i].name+"</a></li>";
			$('#'+id).find('.CategoryDropDownMenu').append(itemHtml);
		}
		// 1--arrival leave
		// 2--sight
		// 3--hotel
		// 4--food
		// 5--info
		// 6--overview
		$('#'+id).find(".CategoryDropDownMenu li a").click(function(){
			  var categoryName = $(this).text();
			  var categoryValue=$(this).attr('value');
			  $('#'+id).find('.selectedCategory').html(categoryName+' <span class="caret"></span>');
			  $('#'+id).find(".selectedCategory").attr('value',categoryValue);
			  
			  switch(categoryValue)
			  {
			  	case "1":
			  		self.setIconDropDownItems(genALIconItems());
			  		break;
			  	case "2":
			  		self.setIconDropDownItems(genSightIconItems());
			  		break;
			  	case "3":
			  		self.setIconDropDownItems(genHotelIconItems());
			  		break;
			  	case "4":
			  		self.setIconDropDownItems(genFoodIconItems());
			  		break;
			  	case "5":
			  		self.setIconDropDownItems(genInfoIconItems());
			  		break;
			  	case "6":
			  		self.setIconDropDownItems(genOvIconItems());
			  		break;
			  	default:
			  		self.setIconDropDownItems(genSightIconItems());
			  }
		});
	};
	
	function genALIconItems(){
		return [
			{url:"resource/icons/al_default.png",name:""},
			{url:"resource/icons/al_4.png",name:""},
			{url:"resource/icons/al_3.png",name:""},
			{url:"resource/icons/al_2.png",name:""},
			{url:"resource/icons/al_1.png",name:""}
		];
	}
	
	function genSightIconItems(){
		return [
			{url:"resource/icons/sight_default.png",name:""},
			{url:"resource/icons/sight_1.png",name:""},
			{url:"resource/icons/sight_3.png",name:""},
			{url:"resource/icons/sight_2.png",name:""}
		];
	}
	
	function genHotelIconItems(){
		return [
			{url:"resource/icons/hotel_default.png",name:""},
			{url:"resource/icons/hotel_1.png",name:""}
		];	
	}
	
	function genFoodIconItems(){
		return [
			{url:"resource/icons/food_default.png",name:""},
			{url:"resource/icons/food_1.png",name:""}
		];	
	}
	
	function genInfoIconItems(){
		return [
			{url:"resource/icons/event_default.png",name:""},
			{url:"resource/icons/event_1.png",name:""},
			{url:"resource/icons/event_2.png",name:""}
		];			
	}
	
	function genOvIconItems(){
		var items=[];
		/*
		items.push({url:"resource/icons/default_default.png",name:""});
		items.push({url:"resource/icons/overview_bear.png",name:""});
		items.push({url:"resource/icons/overview_photo.png",name:""});
		items.push({url:"resource/icons/overview_eiffel.png",name:""});
		items.push({url:"resource/icons/overview_sun.png",name:""});
		items.push({url:"resource/icons/overview_beach.png",name:""});
		items.push({url:"resource/icons/overview_bag.png",name:""});
		items.push({url:"resource/icons/overview_car.png",name:""});
		items.push({url:"resource/icons/overview_star.png",name:""});
		*/
		for(var i=0;i<20;i++){
			items.push({url:"resource/icons/ov_"+i+".png",name:""});
		}
		
		
		return items;
	}
	
	this.setIconDropDownItems=function(items){
		$('#'+id).find('.iconDropDownMenu').empty();
		for(var i in items){
			var itemHtml="<li><a href='#'><img class='icon' src='"+items[i].url+"'>"+items[i].name+"</a></li>";
			$('#'+id).find('.iconDropDownMenu').append(itemHtml);
		}
		
		$('#'+id).find(".iconDropDownMenu li a").click(function(){
			  var selText = $(this).text();
			  var imgSrc=$(this).find('.icon').attr('src');
			  $('#'+id).find('.selectedTxt').html(selText+' <span class="caret"></span>');
			  $('#'+id).find(".selectedImg").attr('src',imgSrc);
		});
	};
	
	this.getCategoryValue=function(){
		return parseInt(
				$('#'+id).find(".selectedCategory").attr('value')
		);
	};
	
	this.setCategoryValue=function(value){
		 switch(value)
		  {
		  	case 1:
		  		self.setIconDropDownItems(genALIconItems());
		  		$('#'+id).find('.selectedCategory').html("arrival & leave"+' <span class="caret"></span>');
				$('#'+id).find(".selectedCategory").attr('value',value);
		  		break;
		  	case 2:
		  		self.setIconDropDownItems(genSightIconItems());
		  		$('#'+id).find('.selectedCategory').html("sight"+' <span class="caret"></span>');
				$('#'+id).find(".selectedCategory").attr('value',value);
		  		break;
		  	case 3:
		  		self.setIconDropDownItems(genHotelIconItems());
		  		$('#'+id).find('.selectedCategory').html("hotel"+' <span class="caret"></span>');
				$('#'+id).find(".selectedCategory").attr('value',value);
		  		break;
		  	case 4:
		  		self.setIconDropDownItems(genFoodIconItems());
		  		$('#'+id).find('.selectedCategory').html("food"+' <span class="caret"></span>');
				$('#'+id).find(".selectedCategory").attr('value',value);
		  		break;
		  	case 5:
		  		self.setIconDropDownItems(genInfoIconItems());
		  		$('#'+id).find('.selectedCategory').html("info"+' <span class="caret"></span>');
				$('#'+id).find(".selectedCategory").attr('value',value);
		  		break;
		  	case 6:
		  		self.setIconDropDownItems(genOvIconItems());
		  		$('#'+id).find('.selectedCategory').html("overview"+' <span class="caret"></span>');
				$('#'+id).find(".selectedCategory").attr('value',value);
		  		break;
		  	default:
		  		self.setIconDropDownItems(genSightIconItems());
		  		$('#'+id).find('.selectedCategory').html("sight"+' <span class="caret"></span>');
		  		$('#'+id).find(".selectedCategory").attr('value',2);
		  }
	};
	
	this.setIconSelect=function(item){
		$('#'+id).find('.selectedTxt').html(item.name+' <span class="caret"></span>');
		$('#'+id).find(".selectedImg").attr('src',item.url);
	};
	
	this.getIconSelect=function(){
		return {url: $('#'+id).find(".selectedImg").attr('src'),
			name: $('#'+id).find('.selectedTxt').text().replace(/\s+/g,"")};
	};
};

function UploadImageModal(id) {
	this.fileNum=0;
	this.completeFileNum=0;
	
	this.progressSlice=0;
	this.currentProgress=0;
	
	var self=this;
	
	this.UIUploading=function(){
		$('#'+id).find('.loading').show();
	};
	
	this.UIFinishUpload=function(){
		$('#'+id).find('.loading').hide();
	};
	
	this.show = function() {
		$('#'+id).modal('show');
		self.UIFinishUpload();
	};
	
	this.close=function(){
		$('#'+id).modal('hide');
	};
	
	this.updateProgress=function(){
		self.currentProgress=self.currentProgress+self.progressSlice;
		$('#'+id).find('.progress').text(self.currentProgress+'%');
	};

	this.addChangeCallBack = function(callBack,allCompleteCallBack) {
		$('#'+id).find('.file').change(function() {
			var files = this.files;
			self.currentProgress=0;
			self.progressSlice=100 / files.length / 2;
			
			self.fileNum=files.length;
			self.completeFileNum=0;
			self.UIUploading();
			
			for(var i=0;i<files.length;i++){
				var file = files[i];
				$.fileExifLoadEnd(file,function(exifObject,imgFile){
					self.updateProgress();
					var lat = exifObject.GPSLatitude;
					var lon = exifObject.GPSLongitude;
					if (lat != null && lon != null) {
						//Convert coordinates to WGS84 decimal
						var latRef = exifObject.GPSLatitudeRef || "N";
						var lonRef = exifObject.GPSLongitudeRef || "W";
						lat = (lat[0] + lat[1] / 60 + lat[2] / 3600)
								* (latRef == "N" ? 1 : -1);
						lon = (lon[0] + lon[1] / 60 + lon[2] / 3600)
								* (lonRef == "W" ? -1 : 1);
					}
					
					//compress and change image file to base64 string
					var outputFormat="jpg";
					if(imgFile.type=="image/png"){
						outputFormat="png";
					}
					
					var reader=new FileReader();
					
					reader.addEventListener("load",function(event){
						var picDataUrl=event.target;
						
						var sourceImageObject=new Image();
						sourceImageObject.src=picDataUrl.result;
						
						var compressedPicDataUrl=jic.compress(sourceImageObject,30,outputFormat).src;
		                
						var base64PicString=compressedPicDataUrl.split(',')[1];
						
						callBack(base64PicString,lat,lon,imgFile.name);
					});
					
					reader.readAsDataURL(imgFile);
					
				});
				
			}	
		});
	};
	
}