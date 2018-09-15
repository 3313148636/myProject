	//随机颜色
	function randomColor(){
		var R = randomInt(0,255);
		var G = randomInt(0,255);
		var B = randomInt(0,255);
		return "rgb("+R+","+G+","+B+")";
	}
	
	//随机数
	function randomInt(min, max){
		return Math.floor(Math.random()*(max-min)) + min;
	}
	
	//是否闰年
	function isLeapYear(year){
		return year%4 == 0 && year%100 !=0 || year%400 ==0;
	}
	
	//格式化日期
	function date2string(date , sign){
		var sign = sign || "-";
		var m = date.getMonth();
		var d = date.getDate();
		return date.getFullYear() + sign + (m<0?"0"+m:m) + sign + (d<0?"0"+d:d);
	}
	
	//判断两个日期相差的天数
	function getDaysBetweenMonths(d1 , d2){
		if( !(d1 instanceof Date && d2 instanceof Date) ){
			console.log("格式错误！");
			return;
		}
		alert(d1.getTime());
		alert(d2.getTime());
		var dis = Math.abs( d1.getTime() - d2.getTime() );
		return (dis/1000/3600/24).toFixed(2);
	}
	
	//字符转换为日期
	function string2Date(datestr, sep){
		if(!sep || !(datestr && datestr.length >= 8)){
			console.log("字符串格式错误");
			return;
		}
		var list = datestr.split(sep);
		if( !(list[0].length == 4 && list[1] > 0 && list[1] < 13 && list[2] > 0 && list[2] < 32) ){
			console.log("字符串格式错误");
			return;
		}
		return new Date(datestr);
	}
	
	//距离
	function getStyle(eve){
		if(eve.currentStyle){
			return eve.currentStyle;
		}else{
			return getComputedStyle(eve);
		}
	}
	
	//兼容getElementsByClassName方法
	(function(){
		if(!document.getElementsByClassName){
			document.getElementsByClassName = function(classname){
				var allEle = document.getElementsByTagName("*");
				var temp = [];
				for(var i=0; i<allEle.length; i++){
					if( allEle[i].className.indexOf(classname) != -1){
						temp.push( allEle[i] );
					}
				}
				return temp;
			}
		}
	})();
	
	//获取元素相对于页面位置1
	function getPagePosition(target){
			
		var sumLeft = target.offsetLeft;
		var sumTop = target.offsetTop;
		
		while(target.offsetParent != null){
			sumLeft += target.offsetParent.offsetLeft;
			sumTop += target.offsetParent.offsetTop;
			target = target.offsetParent;
		}
		return {
			pageLeft:sumLeft,
			pageTop:sumTop
		};
	}
	
	//获取元素相对于页面位置2
	function getPagePosition2(target){	
		if(target == null){
			return {
				pageLeft:0,
				pageTop:0
			}
		}	
		var page = getPagePosition2(target.offsetParent);
		return{
			pageLeft : target.offsetLeft + page.pageLeft,
			pageTop : target.offsetTop + page.pageTop
		};
	}
	
	//封装添加监听事件
	function addListenerHander(ele,eleType,fn,isCapture){
		if(ele.addEventListener){
			return ele.addEventListener(eleType,fn,isCapture);
		}else{
			return ele.attachEvent("on"+eleType,fn);
		}
	}
	
	
	//拖拽
	function dragHandle(ele,ele_){
	    var total,_total;
		if(arguments.length ==1 ){
			total = {_width : window.innerWidth,_height : window.innerHeight};
			_total = {left_ : 0,top_ : 0};
		}else{
			total = {_width : ele_.offsetWidth,_height : ele_.offsetHeight};
			_total = {left_ : ele_.offsetLeft,top_ : ele_.offsetTop};
		}
		ele.onmousedown = function(e){
			var e = e || event;
			var mousePos = {x:e.offsetX,y:e.offsetY};
			document.onmousemove = function(e){
				var e = e || event;
				var left = e.clientX - mousePos.x - _total.left_;
				var top = e.clientY - mousePos.y - _total.top_;
				var _left = Math.max(0,Math.min(left,total._width - ele.offsetWidth));
				var _top = Math.max(0,Math.min(top,total._height - ele.offsetHeight));
				ele.style.left = _left + "px";
				ele.style.top = _top + "px";
			}
		}
		document.onmouseup = function(){
			document.onmousemove = null;
		}
	}
	
	//跨浏览器事件对象
	var EventUtil = {
		addHandler:function(element, type, handle){
			if(element.addEventListener){
				element.addEventListener(type, handle, false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handle);
			}else{
				element["on"+type] = handle;
			}
		},
		removeHandler:function(element, type, handle){
			if(element.removeEventListener){
				element.removeEventListener(type, handle, false);
			}else if(element.detachEvent){
				element.detachEvent("on"+type,handle);
			}else{
				element["on"+type] = null;
			}
		},
		getEvent:function(event){
			return event ? event : window.event;
		},
		getTarget:function(event){
			return event.target || event.srcElement;
		},
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},
		getStyle:function(eve){
			if(eve.currentStyle){
				return eve.currentStyle;
			}else{
				return getComputedStyle(eve);
			}
		}
	};
	
	//改变透明度
	function opacity(ele){
		ele.onmouseover = function(){
			var opc = Number( getStyle(this).opacity );
			clearInterval(ele.timer);
			ele.timer = setInterval(function(){
				opc -= 0.01;
				this.style.opacity = opc;
				if(opc <= 0){
					this.style.opacity = 0;
					clearInterval(ele.timer);
				}
			}.bind(this),30);
		};
		ele.onmouseout = function(){
			var opc = Number( getStyle(this).opacity );
			clearInterval(ele.timer);
			ele.timer = setInterval(function(){
				opc += 0.01;
				this.style.opacity = opc;
				if(opc >= 1){
					clearInterval(ele.timer);
				}
			}.bind(this),30);
		};
	}
	
	//定点缓冲运动 animate(box,{left:800,top:200,width:200,height:200});
	function animate(ele,obj,callback){
		var num = 0;
		for(var attr in obj){
			(function(attr){
				var target = obj[attr];
				ele[attr + "timer"] = setInterval(function(){
					var current = parseInt ( getStyle(ele)[attr] );
					if(current<target){
						var speed = Math.ceil( (target-current)/8 );
					}else{
						var speed = Math.floor( (target-current)/8 );
					}
					ele.style[attr] = current + speed + "px";
					if(parseInt ( getStyle(ele)[attr] ) == target){
						clearInterval(ele[attr + "timer"]);
						num++;
						if(num == Object.keys(obj).length){
							callback ? callback():"";
						}
					}
				},30);
			})(attr);
		}
	}
	
	//节流
	function throttle(callback,time,content){
		var lasttime = 0;
		return function(e){
			var current = Date.now();
			if(current - lasttime >time){
				callback.call(content,e); 
				lasttime = Date.now();
			}
		}
	}
	
	//防抖
	function anti_shake(callback,time,content){
		var t;
		return function(){
			clearTimeout(t);
			t = setTimeout(() => {
				callback.call(content); 
			}, time);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	