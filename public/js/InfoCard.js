
function infoCard(id){
	var idName=id;
	var jqueryId="#"+idName;
	var ASideId='';
	var BSideId='';
	var hideButtonId='';
	var rotateButtonId;
	var editOKButtonId;
	var unpinButtonId;
	var pinButtonId;
	
	var titleId='';
	var categoryId='';
	var addressId='';
	var mycommentId='';
	var iconUrlId='';
	
	var editFormIdName=idName+'EditForm';
	var editFormTitleIdName=editFormIdName+'Title';
	var editFormCategoryIdName=editFormIdName+'Category';
	var editFormAddresIdName=editFormIdName+'Address';
	var editFormMycommentIdName=editFormIdName+'Mycomment';
	var editFormImageUrlIdName=editFormIdName+'ImageUrl';
	var editFormIconUrlIdName=editFormIdName+'IconUrl';
	var editFormCombobox;
	
	var isASideShow=true;
	
	
	
	
	this.getTop=function(){
		var s= $(jqueryId).css("top");
		return parseInt(s);
	};
	
	this.getLeft=function(){
		var s= $(jqueryId).css("left");
		return parseInt(s);
	};
	
	this.setDefaultContent=function(content){
		if(content.title!=''&& content.title!=null){
			$(titleId).empty();
			$(titleId).html(content.title);
			$('#'+editFormTitleIdName).val(content.title);
		}
		
		if(content.category!=''&& content.category!=null){
			$(categoryId).empty();
			$(categoryId).html(content.category);
			$('#'+editFormCategoryIdName).val(content.category);
		}
		
		if(content.address!=''&& content.address!=null){
			$(addressId).empty();
			$(addressId).html(content.address);
			$('#'+editFormAddresIdName).val(content.address);
		}
		
		if(content.mycomment!=''&& content.mycomment!=null){
			$(mycommentId).empty();
			$(mycommentId).html(content.mycomment);
			$('#'+editFormMycommentIdName).val(content.fullcomment);
		}
		
	};
	
	this.setDefaultImgs=function(imgArray){
		var imgString="";
		
		for(var i in imgArray){
			imgString=imgString+imgArray[i]+";";
		}
		
		$('#'+editFormImageUrlIdName).val(imgString);
		
		this.setContentB(createDefaultGallery(imgArray), true);
	};
	
	
	
	this.setContentA=function(html,isGallery){
		this.contentA=html;
		$(ASideId).empty();
		$(ASideId).append(this.contentA);
		if(isGallery){
			initAllGallery();
		};
	};
	
	this.setContentB=function(html,isGallery){
		this.contentB=html;
		$(BSideId).empty();
		$(BSideId).append(this.contentB);
		if(isGallery){
			initAllGallery();
		};
	};
	
	this.show=function(){
		$(jqueryId).show();
	};
	
	this.hide=function(){
		$(jqueryId).hide();
	};
	
	this.resetLocation=function(top,left){
		$(jqueryId).css("top",top);
		$(jqueryId).css("left",left);
	};
	
	this.getWidth=function(){
		var s= $(jqueryId).css("width");
		//will return "440px", need to cut 'px'
		return parseInt(s);
	};
	
	this.getHeight=function(){
		var s= $(jqueryId).css("height");
		//will return "440px", need to cut 'px'
		return parseInt(s);
	};
	
	this.showContentA=function(){
		$(BSideId).hide();
		$(ASideId).show();
		isASideShow=true;
	};
	
	
		
	this.showContentB=function(){
		$(ASideId).hide();
		$(BSideId).show();
		isASideShow=false;
	};
	
	this.initDefault=function(top,left,content,imgArray){
		init(top,left);
		$(ASideId).append(createDefaultInfoHtml(content));
		$(BSideId).append(createDefaultGallery(imgArray));
		initAllGallery();
		initPopupEditForm();
		initCSS();
		console.log($(ASideId).get(0));
		this.setDefaultContent(content);
	};
	
	this.initCustom=function(top,left,contentAHtml,contentBHtml){
		init(top, left);
		$(ASideId).append(contentAHtml);
		$(BSideId).append(contentBHtml);
		initAllGallery();
		initCSS();
	};
	
	this.toJSObject=function(){
		$(jqueryId).css("top",0);
		$(jqueryId).css("left",0);
		$(jqueryId).draggable( "destroy" );
		return $(jqueryId).get(0);
	};
	
	this.unpin=function(left,top){
		console.log('----unpin---');
		console.log('left:'+left);
		console.log('top:'+top);
		$('body').append( $(jqueryId));
		$(jqueryId).css('left',left+'px');
		$(jqueryId).css('top',top+'px');
		$(jqueryId).draggable();
	};
	
	this.addPinButtonEvent=function(handler){
		$(pinButtonId).click(handler);
	};
	this.addUnpinButtonEvent=function(handler){
		$(unpinButtonId).click(handler);
	};
	
	this.addEditFormOKButtonEvent=function(handler){
		$(editOKButtonId).click(handler);
	};
	
	this.editFormClickOK=function(){
		var c=new Object();
		c.title=$('#'+editFormTitleIdName).val();
		c.category=$('#'+editFormCategoryIdName).val();
		c.address=$('#'+editFormAddresIdName).val();
		c.mycomment=$('#'+editFormMycommentIdName).val();
		c.imgUrls=$('#'+editFormImageUrlIdName).val().split(";");
		c.iconUrl=editFormCombobox.value;
		for (var i = 0; i < c.imgUrls.length; i++) {
			if ($.trim(c.imgUrls[i])=="") {
				c.imgUrls.splice(i, 1);
				i--;
			}
		}
		
		$.magnificPopup.instance.close();
		
		return c;
	};
	
	//private method
	function initCSS(){
		$(jqueryId).css({
			'position': 'absolute',
	  	'z-index':'2',
	  	'background-color': 'white',
	  	'border-style': 'groove',
	  	'border-width': '1px',
	  	'width':'380px',
	  	'padding': '2px'
		});
		
		$('p.sansserif').css({
			'font-family':'Arial,Verdana,Sans-serif'
		});
		$('p.serif').css({
			'font-family':'Times New Roman,Microsoft YaHei,Georgia,Serif'
		});
	}
	
	
	function rotate(){
		$(jqueryId).hide("blind",{direction:"left"},300,function(){
			if(isASideShow){
				$(ASideId).hide();
				$(BSideId).show();
				isASideShow=false;
			}else{
				$(BSideId).hide();
				$(ASideId).show();
				isASideShow=true;
			}
		
		});
		
		$(jqueryId).show("blind",{direction:"left"},300,null);
	};
	
	function init(top,left){
		
		
		var aSideIdName=idName+"A";
		var bSideIdName=idName+"B";
		ASideId="#"+aSideIdName;
		BSideId="#"+bSideIdName;
		
		var hideButtonIdName=idName+"HideButton";
		var rotateButtonIdName=idName+"RotateButton";
		var unpinButtonIdName=idName+"UnpinButton";
		var pinButtonIdName=idName+"PinButton";
		hideButtonId="#"+hideButtonIdName;
		rotateButtonId="#"+rotateButtonIdName;
		editOKButtonId="#"+idName+"EditOK";
		unpinButtonId="#"+unpinButtonIdName;
		pinButtonId="#"+pinButtonIdName;
		
		$("body").append("<div class='info' id='"+idName+"'></div>");
		$('body').append(createEditForm());
		
		$(jqueryId).draggable();
		
		$(jqueryId).append("<div id='"+aSideIdName +"'></div>");
		$(jqueryId).append("<div id='"+bSideIdName+"'></div>");
		
		
		$(BSideId).hide();
		var buttonHtml="<div style='height:20px;background-color:rgb(245,245,245);border-top-style:solid;border-width:1px;border-color:rgb(230,230,230)'>" +
				"<p class='serif' style='margin:3px 0px 0px 0px;font-size:12px;float:right'><a id='"+hideButtonIdName+"' href='#'>CLOSE X</a></p>" +
				"<p class='serif' style='margin:3px 0px 0px 0px;font-size:12px;float:right'><a id='"+unpinButtonIdName+"' href='#'>UNPIN  ||</a></p>" +
				"<p class='serif' style='margin:3px 0px 0px 0px;font-size:12px;float:right'><a id='"+pinButtonIdName+"' href='#'>PIN  ||</a></p>" +
				"<p class='serif' style='margin:3px 5px 0px 0px;font-size:12px;float:left'><a id='"+rotateButtonIdName+"' href='#'>ROTATE</a></p>" +
				"<p class='serif' style='margin:3px 0px 0px 0px;font-size:12px;'><a class='popup-with-form' href='#"+editFormIdName+"'>EDIT</a></p>" +
				"</div>";
		$(jqueryId).append(buttonHtml);
		$(jqueryId).addClass("info");
		$(jqueryId).css("top",top);
		$(jqueryId).css("left",left);
		
		$(hideButtonId).click(function(){
			$(jqueryId).hide();
		});
				
		$(rotateButtonId).click(function(){
			rotate();
		});
		
		$(unpinButtonId).click(function(){
			$('body').append( $(jqueryId));
			$(jqueryId).draggable();
		});
	}
	
	function initPopupEditForm(){
		var jsonData = [                                  
		                {image:'resource/icons/default/default_default.png', description:'', value:'resource/icons/default/default_default.png', text:'default'},
		                {image:'resource/icons/food/food_default.png', description:'', value:'resource/icons/food/food_default.png', text:'food'},
		                {image:'resource/icons/pic/pic_default.png', description:'', value:'resource/icons/pic/pic_default.png', text:'pic'},
		                {image:'resource/icons/event/event_default.png', description:'', value:'resource/icons/event/event_default.png', text:'event'},
		                {image:'resource/icons/sight/sight_default.png', description:'', value:'resource/icons/sight/sight_default.png', text:'sight'},
		                {image:'resource/icons/hotel/hotel_default.png', description:'', value:'resource/icons/hotel/hotel_default.png', text:'hotel'},
		                {image:'resource/icons/bike/bike_default.png', description:'', value:'resource/icons/bike/bike_default.png', text:'bike'},
		                {image:'resource/icons/bus/bus_default.png', description:'', value:'resource/icons/bus/bus_default.png', text:'bus'},
		                {image:'resource/icons/car/car_default.png', description:'', value:'resource/icons/car/car_default.png', text:'car'},
		                {image:'resource/icons/plane/plane_default.png', description:'', value:'resource/icons/plane/plane_default.png', text:'plane'},
		                {image:'resource/icons/ship/ship_default.png', description:'', value:'resource/icons/ship/ship_default.png', text:'ship'},
		                {image:'resource/icons/train/train_default.png', description:'', value:'resource/icons/train/train_default.png', text:'train'},
		                {image:'resource/icons/parking/parking_default.png', description:'', value:'resource/icons/parking/parking_default.png', text:'parking'}];
		             
		editFormCombobox = $("#"+editFormIconUrlIdName).msDropdown({byJson:{data:jsonData, name:'icon'}}).data("dd");
		
		editFormCombobox.on("change", function(res) {
			//console.log( oDropdown.value);
			//console.log(oDropdown.selectedText);
			$('#'+editFormCategoryIdName).val(editFormCombobox.selectedText);
		});
		
		/*
		var iconSelect= new IconSelect(editFormIconUrlIdName,{
            'vectoralIconNumber':10,
            'horizontalIconNumber':10});
		var icons = [];
		  
		icons.push({'iconFilePath':'resource/icons/default/default_default.png', 'iconValue':'default_default'});
		icons.push({'iconFilePath':'resource/icons/food/food_default.png', 'iconValue':'food_default'});	        
		icons.push({'iconFilePath':'resource/icons/pic/pic_default.png', 'iconValue':'pic_default'});		
		icons.push({'iconFilePath':'resource/icons/event/event_default.png', 'iconValue':'event_default'});
        icons.push({'iconFilePath':'resource/icons/sight/sight_default.png', 'iconValue':'sight_default'});
        icons.push({'iconFilePath':'resource/icons/hotel/hotel_default.png', 'iconValue':'hotel_default'});
        icons.push({'iconFilePath':'resource/icons/bike/bike_default.png', 'iconValue':'bike_default'});
        icons.push({'iconFilePath':'resource/icons/bus/bus_default.png', 'iconValue':'bus_default'});
        icons.push({'iconFilePath':'resource/icons/car/car_default.png', 'iconValue':'car_default'});
        icons.push({'iconFilePath':'resource/icons/plane/plane_default.png', 'iconValue':'plane_default'});
        icons.push({'iconFilePath':'resource/icons/ship/ship_default.png', 'iconValue':'ship_default'});
        icons.push({'iconFilePath':'resource/icons/train/train_default.png', 'iconValue':'train_default'});
       
        
        iconSelect.refresh(icons);
        
        $('#'+editFormIconUrlIdName).on('changed',function(){
        	$('#'+editFormCategoryIdName).val(iconSelect.getSelectedValue());
        });
        */
		$('.popup-with-form').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#name',

			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				}
			}
		});
		
		$('.white-popup').css({
			'position': 'relative',
		  'background': '#FFF',
		  'padding': '20px',
		  'width': 'auto',
		  'max-width': '600px',
		  'margin': '20px auto'
		});
		
	}
	
	function initAllGallery(){
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			//mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			}
		});
	}
	
	function createDefaultGallery(urlArray){
		var imgArray=new Array();
		for(var i in urlArray){
			imgArray.push({url:urlArray[i],
					   title:""});
		}
			
		var ahrefs="";
		
		for(var index in imgArray){
			if(index==0){
				ahrefs=	"<a href='"+imgArray[0].url+"' title='"+imgArray[0].title+"'><div style='margin:10px;background-image: url("+imgArray[0].url+");height:300px;background-position: center;'></div></a>";
			}else{
				ahrefs+="<a style='display: none;' href='"+imgArray[index].url+"' title='"+imgArray[index].title+"'></a>";
			}
		}
		
		
		var html="<div><div class='popup-gallery'>"+ahrefs+"</div></div>";
		return html;
		
	}
	
	/*
	 * arg:
	 * mapMarker.content
	 * 
	 * */
	function createDefaultInfoHtml(content){
		var titleIdName=idName+'Title';
		titleId='#'+titleIdName;
		
		var categoryIdName=idName+'Category';
		categoryId='#'+categoryIdName;
		
		var addressIdName=idName+'Address';
		addressId='#'+addressIdName;
		
		var mycommentIdName=idName+'Mycomment';
		mycommentId='#'+mycommentIdName;
		
		var categoryIconUrlIdName=idName+'CategoryIconUrl';
		iconUrlId='#'+categoryIconUrlIdName;
		
		var html="<div style='background-color:rgb(245,245,245);border-bottom-style:solid;border-width:1px;border-color:rgb(230,230,230)'>"+
			//"<div style='float:left;width:50px;height:50px;'><img id='"+categoryIconUrlIdName+"'src='"+content.getIconPath()+"'></div>"+
			"<p id='"+titleIdName+"' class='serif' style='margin:0px;color:#4577D4;'>"+content.title+"</p>"+
			"<p id='"+categoryIdName+"' class='serif' style='margin:0px;font-size:11px;'>"+content.category+"</p>"+
			"<p id='"+addressIdName+"' class='serif' style='margin:0px;font-size:11px;'>"+content.address+"</p>"+
		"</div>"+
		"<div style='width:330px;height:130px;overflow: hidden;text-overflow: ellipsis;white-space: normal;'>"+
			"<p id='"+mycommentIdName+"' class='serif' style='margin:5px;font-size:14px;'>"+content.comment+"</p>"+
			"<a href='#' class='serif' style='float:right;margin:0px;font-size:8px;color:#4577D4;'>show detail</a>"+
		"</div>";
		
		return html;
	}
	
	function createEditForm(){
		
		
		var html="<div id='"+editFormIdName+"' class='white-popup mfp-hide'>"+
					"<fieldset style='border:0;'>"+
						"<p>Edit Basic Info</p>"+
						"<ol>"+
			"<li><label for='title'>Title:</label>"+
			"<input id='"+editFormTitleIdName+"' name='title' type='text' placeholder='Name'>"+
			"</li>"+
			
			"<li><label for='category'>Category:</label>"+
				"<input id='"+editFormCategoryIdName+"' type='text' placeholder='Name'></li>"+
			
			"<li>"+
				"<label for='address'>Address:</label>"+
				"<input id='"+editFormAddresIdName+"' type='text' placeholder='Name'>"+
			"</li>"+
			
			"<li>"+
				"<label for='iconUrl'>IconUrl:</label>"+
				"<div id='"+editFormIconUrlIdName+"'>"+
			"</li>"+
			
			"<li>"+
				"<label for='mycomment'>My Comment:</label><br>"+
				"<textarea id='"+editFormMycommentIdName+"' style='margin: 2px; width: 509px; height: 183px;'></textarea>"+
			"</li>"+
			
			"<li>"+
			"<label for='imageUrls'>Urls:(use ; to separate):</label><br>"+
			"<textarea id='"+editFormImageUrlIdName+"' style='margin: 2px; width: 509px; height: 183px;'></textarea>"+
			"</li>"+
		"</ol>"+
		"<button id='"+idName+"EditOK"+"'>OK</button>"+
"</fieldset></div>";
		return html;
	}
	
}

function createTitleContentA(title,address){
	return "<div><h4>"+title+"</h4><p>"+address+"</p><div style='position:absolute;top:20px;left:300px' id='favorite'><img src='resource/favorite.png' height='120px'/></div></div>";
}


function createBasicInfo(content){
	return "<p style='overflow: auto;text-overflow:ellipsis;height:70px'>"+content+"</p>";
}

function createImgGallery(imgArray){
	var ahrefs="";
	
	for(var index in imgArray){
		if(index==0){
			ahrefs=	"<a href='"+imgArray[0].url+"' title='"+imgArray[0].title+"'><div style='margin:10px;background-image: url("+imgArray[0].url+");height:300px;background-position: center;'></div></a>";
		}else{
			ahrefs+="<a style='display: none;' href='"+imgArray[index].url+"' title='"+imgArray[index].title+"'></a>";
		}
	}
	
	
	var html="<div><div class='popup-gallery'>"+ahrefs+"</div></div>";
	return html;
	
}

function createPOICardHtml(title,category,address,mycomment,categoryIconUrl){
	var html="<div style='background-color:rgb(245,245,245);border-bottom-style:solid;border-width:1px;border-color:rgb(230,230,230)'>"+
		"<div id='icon' style='float:left;width:50px;height:50px;'><img class='iconUrl' src='"+categoryIconUrl+"'></div>"+
		"<p class='serif cardTitle' style='margin:0px;color:#4577D4;'>"+title+"</p>"+
		"<p class='serif cardCategory' style='margin:0px;font-size:11px;'>"+category+"</p>"+
		"<p class='serif cardAddress' style='margin:0px;font-size:11px;'>"+address+"</p>"+
	"</div>"+
	"<div style='width:330px;height:130px;overflow: hidden;text-overflow: ellipsis;white-space: normal;'>"+
		"<p class='serif cardComment' style='margin:5px;font-size:14px;'>"+mycomment+"</p>"+
		"<a href='#' class='serif' style='float:right;margin:0px;font-size:8px;color:#4577D4;'>show detail</a>"+
	"</div>";
	
	return html;
}



