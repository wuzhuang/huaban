function shape(cobj,canvas,copy){
	this.copy=copy
	this.cobj=cobj;
	this.canvas=canvas;
	this.style="stroke";
	this.fillStyle="#000";       
	this.strokeStyle="#000";
	this.lineWidth="1";
	this.type="line";
	this.history=[];
	this.jiaonum=3;
	this.biannum=3;
	this.wenjian="";
	this.xpsize=10;
}
shape.prototype={
	init:function(){
		this.cobj.strokeStyle=this.strokeStyle;
		this.cobj.fillStyle=this.fillStyle;
		this.cobj.lineWidth=this.lineWidth;
	},
	draw:function(){
		this.init();
		var that=this;
		if(that.type=="pencil"){
			that.pencil()
		}else{
		that.copy.onmousedown=function(e){
			var startx=e.offsetX;
			var starty=e.offsetY;
			that.copy.onmousemove=function(e){
				that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height)
				if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
				var endx=e.offsetX;
				var endy=e.offsetY;
				that[that.type](startx,starty,endx,endy)
			}
			that.copy.onmouseup=function(){
				that.copy.onmousemove=null;
				that.copy.onmouseup=null;
				var data=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height)
				that.history.push(data)
			}
		}}
	},
	line:function(x,y,x1,y1){
		this.cobj.beginPath();
		this.cobj.moveTo(x,y);
		this.cobj.lineTo(x1,y1);
		this.cobj.stroke();
	},
	rect:function(x,y,x1,y1){
		this.cobj.beginPath();
		var w=x1-x;
		var h=y1-y;
		this.cobj.rect(x,y,w,h);
		this.cobj[this.style]();
	},
	arc:function(x,y,x1,y1){
		this.cobj.beginPath();
		var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
		this.cobj.arc(x,y,r,0,2*Math.PI)
		this.cobj[this.style]();
	},
	poly: function (x,y,x1,y1) {  
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var a=360/this.biannum*Math.PI/180;
        this.cobj.beginPath();
        this.cobj.moveTo(x+Math.cos(0)*r,y+Math.sin(0)*r);
        for(var i=0;i<2*this.biannum;i++){
            this.cobj.lineTo(x+Math.cos(a*i)*r,y+Math.sin(a*i)*r);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao: function (x,y,x1,y1) { 
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        var num=this.jiaonum*2;
        var a=360/num*Math.PI/180;
        this.cobj.beginPath();
        for(var i=0;i<=2*num;i++){
            if(i%2==0){
                this.cobj.lineTo(x+Math.cos(a*i)*r,y+Math.sin(a*i)*r);
            }
            else{
                this.cobj.lineTo(x+Math.cos(a*i)*r1,y+Math.sin(a*i)*r1);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    back: function (back,xp) {
        var that=this;
        back.onclick= function () {
        	xp.style.display="none";
        	that.copy.onmousemove=null;
            that.history.pop();
            if(that.history.length==0){
                alert("不能撤销");
                that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
                return;
            }
            that.cobj.putImageData(that.history[that.history.length-1],0,0);
        }
    },
    pencil:function(){
    	var that=this;
    	that.copy.onmousedown=function(e){
			var startx=e.offsetX;
			var starty=e.offsetY;
			that.cobj.beginPath();
			that.cobj.moveTo(startx,starty)
			that.copy.onmousemove=function(e){
				var endx=e.offsetX;
				var endy=e.offsetY;
				that.cobj.lineTo(endx,endy)
				that.cobj.stroke();
			}
			that.copy.onmouseup=function(){
				that.copy.onmousemove=null;
				that.copy.onmouseup=null;
				var data=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height)
				that.history.push(data)
			}
		}
    },
    xp:function(xp){
    	var that=this
    	 this.copy.onmousemove=function(e){
    	 	that.move(that,xp,e)
    	 }
    	 this.copy.onmousedown=function(e){
	    	that.copy.onmousemove=function(e){
	    		var ox=e.offsetX;
    			var oy=e.offsetY;
    			var top=oy-that.xpsize/2;
    			var left=ox-that.xpsize/2;
	    	 	that.move(that,xp,e)
	    	 	that.cobj.clearRect(left,top,that.xpsize,that.xpsize)
	    	}

	    	that.copy.onmouseup=function(){
	    		that.copy.onmousemove=null;
	    		that.copy.onmouseup=null;
	    		that.xp(xp);
	    		var data=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height)
				that.history.push(data)
	    	
    	 }
    	}
   },
    move:function(that,xp,e){
    	xp.style.display="block";
    	var ox=e.offsetX;
    	var oy=e.offsetY;
    	var top=oy-that.xpsize/2;
    	var left=ox-that.xpsize/2;
    	if(top<0){
    		top=0
    	}
    	if(left<0){
    		left=0
    	}
    	if(top>that.canvas.height-that.xpsize){
    		top=that.canvas.height-that.xpsize
    	}
    	if(left>that.canvas.width-that.xpsize){
    		left=that.canvas.width-that.xpsize
    	}
    	$(xp).css({
    		width:that.xpsize,
    		height:that.xpsize,
    		left:left,
    		top:top
    	})
    },
    caozuo:function(){
    	var that=this
    	if(this.wenjian=="baocun"){
    		var yes=confirm("是否保存");
    		if(yes){
    			var url=that.canvas.toDataURL().replace("data:image/png","data:stream/octet");
    			location.href=url;
    		}
    	}else if(this.wenjian=="xinjian"){
    		var yes=confirm("是否保存");
    		if(yes){
    			var url=that.canvas.toDataURL().replace("data:image/png","data:stream/octet");
    			location.href=url;
    		}
    		that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height)
    	}else if(this.wenjian=="qingkong"){
    		this.cobj.clearRect(0,0,that.canvas.width,that.canvas.height)
			this.history=[];    			
    	}
    }
}
