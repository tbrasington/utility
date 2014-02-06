/*
	Author: Thomas Brasington
	What: To help me do things shorthand
*/

var utility = {
	
	that : this,
	
	ua: navigator.userAgent.toLowerCase(),
		
	does_touch : function() { 
		if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
            return true;
        } else {
            return false;
        }
	},
	
	evt : function(t){ 
		var r = null
		if(t=='down' && this.does_touch()){ 
			r = 'touchstart';
		} else if(t=='down' && !this.does_touch()){ 
			r = 'mousedown';
		} else if(t=='up' && this.does_touch()){ 
			r = 'touchend';
		} else if(t=='up' && !this.does_touch()){ 
			r = 'mouseup';
		} else if(t=='move' &&  this.does_touch()){ 
			r = 'touchmove';
		} else if(t=='move' &&  !this.does_touch()){ 
			r = 'mousemove';
		}
		else if(t=='click'){ 
			r = 'click';
		}
		return r;
	},
	
	device : function(){
	
		if(ua.match(/mobile/) || ua.match(/android/) || ua.match(/iPhone/)|| ua.match(/iPod/)) {
			string={kind:'mobile', interface:'touch'};
		} 
		
		if( ua.match(/ipad/) || ua.match(/tablet/)) {
			string={kind:'tablet', interface:'touch'}; 
		}
		
		return string;
	},
	 
	ajax : function(parameters) {
		
		parameters = parameters  || {};
		
		parameters = { 
			url :  (!!parameters.url?parameters.url:null),
			method : (!!parameters.method?parameters.method:'GET'), 
			async : (!!parameters.async? true : false), 
			cache : (!!parameters.cache ? '': '?v='+Math.random() ),
			variables : (!!parameters.variables? parameters.variables:''),
			type : (!!parameters.type?parameters.type:'json'),
			callback : (!!parameters.callback ? parameters.callback : null),
			with_credentials : (!!parameters.with_credentials ? parameters.with_credentials : false )
		}
		 
		var xhr = new XMLHttpRequest(), response=null, status_code;			
		
		xhr.open(parameters.method, parameters.url + parameters.cache, parameters.async);
			
			if(parameters.with_credentials) xhr.withCredentials="true";
			if(parameters.method=='POST') xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
			
			xhr.onload=function(e) { 
				
				status_code = this.status;
				 
				if(this.status==200){ 
					
					response = this.response;
					
					if(parameters.method=='html') {
						
						response == this.response;
						
					}  else if(parameters.type=='json') {
						
						response = JSON.parse(this.response);
					}
				}
				
				if(parameters.callback!==null) { parameters.callback(response, this.status); }
			}
			
			xhr.send(parameters.variables);
		
		
		return { data: response, status: status_code } ;
	},
	
	element :   function (type, parameters ){
           
        var element = document.createElement(type);
        parameters = (!!parameters?parameters:null);
       
        if(parameters!==null) {
	               
	        var settings = {
	                
	            'id' : (!!parameters['id'] ? parameters['id'] : ''),
	            'class' : (!!parameters['class'] ? parameters['class'] : ''),
	            'html' : (!!parameters['html'] ? parameters['html'] : '')
	        }
                
			if(settings.id !=="") element.id = settings['id'];
			if(settings.class !=="") element.className = settings['class'];
			if(settings.html !=="") element.innerHTML=settings['html'];
		}
        
        return element;
    },
   
   event_delegate : function(e, class_name, callback) {
	   
		var classes = e.target.className.split(" ");
			
		// Search for the CSS class!
		if(classes) {
			// For every CSS class the element has...
			for(var x = 0; x < classes.length; x++) {
				// If it has the CSS class we want...
				if(classes[x] === class_name) {
				
					if(callback!==null) { callback(); }
				} 
			}
		}
    },
    
    animation:function(type) {
		
		var name = 'webkitAnimationEnd';
		return name;	    
    },
    
    
	transform : function (element, parameters) {
	
		var settings =  {
			x :(!!parameters.x ? parameters.x : 0),
			y : (!!parameters.y ? parameters.y : 0),
			z : (!!parameters.z ? parameters.z: 0),
			timing :(!!parameters.timing  ? parameters.timing : 0.5),
			callback : (!!parameters.callback ? parameters.callback: null)
		}
          
        element.style['-webkit-transition'] = '-webkit-transform ' + parameters.timing + 's';
        element.style['-webkit-transition-timing-function'] = 'ease-out';
		element.style['-webkit-transform'] = 'translate3d('+settings.x+'px,'+settings.y+'px,'+settings.z+'px)'; 
        
        element.style['transition'] = 'transform ' + parameters.timing + 's';
		element.style['transition-timing-function'] = 'ease-out';
		element.style['transform'] = 'translate3d('+settings.x+'px,'+settings.y+'px,'+settings.z+'px)'; 
		
		setTimeout(function() { if( settings.callback) settings.callback(); }, settings.timing*1000)
    }
};