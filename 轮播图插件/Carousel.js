(function(){
    //强行暴露一个变量
    window.Carousel = Carousel;
    function Carousel(JSON){
        this.dom             = $("#" + JSON.id);      //放置轮播图的父容器
        this.$imagesUl       = null;                  //放置轮播图的ul
        this.$imagesUlLis    = null;                  //放置轮播图的li
        this.$leftBtn        = null;                  //放置轮播图左按钮            
        this.$rightBtn       = null;                  //放置轮播图右按钮 
        this.$circleOl       = null;                  //放置轮播的小圆点的ol
        this.$circleLis      = null;                  //放置轮播的小圆点的li
        this.pictureLength   = JSON.images.length;    //图片个数
        this.image           = JSON.images;           //图片地址数组
        this.height          = JSON.height;           //高
        this.width           = JSON.width;            //宽
        this.leftBtn         = null;                  //左按钮
        this.rightBtn        = null;                  //右按钮
        this.index           = 0;                     //当前轮播图的序号
        this.animateDuration = JSON.animateDuration;  //缓动时间
        this.interval        = JSON.interval;         //间隔时间
        this.timer           = null;                  //定时器
        
        this.init();                                  //初始化
        this.bindEvent();                             //绑定事件
        this.autoPlay()                               //自动播放
    }
    //初始化
    Carousel.prototype.init = function(){
        //创建dom树
        this.$imagesUl = $("<ul></ul>");
        this.dom.append(this.$imagesUl);
        for(var i=0 ;i<this.pictureLength;i++){
            $("<li><img src='"+this.image[i]+"'></li>").appendTo(this.$imagesUl)
        }
        this.$imagesUlLis = this.$imagesUl.find("li");
        //布局
        this.dom.css({
            "height" : this.height + "px",
            "width" : this.width + "px",
            "position" : "relative",
            "overflow" : "hidden"
        })
        this.$imagesUlLis.css({
            "position" : "absolute",
            "left" : this.width + "px",
            "top" : 0,
            "list-style" : "none"
        })
        this.$imagesUlLis.eq(0).css("left",0)
        //创建按钮
        this.$leftBtn = $("<a href='javascript:;' class='leftBtn'></a>");
        this.$rightBtn = $("<a href='javascript:;' class='rightBtn'></a>");
        this.$leftBtn.appendTo(this.dom);
        this.$rightBtn.appendTo(this.dom);

        //小圆点
        this.$circleOl =$("<ol class='circles'></ol>");
        this.$circleOl.appendTo(this.dom);
        for(var i=0 ;i<this.pictureLength;i++){
            $("<li></li>").appendTo(this.$circleOl);
        }
        this.$circleLis = this.$circleOl.find("li");
        this.$circleLis.eq(0).addClass("current");

    }
    //绑定事件
    Carousel.prototype.bindEvent = function(){
        var self = this;
        this.$rightBtn.click(function(){
            if(self.$imagesUlLis.is(":animated")){
                return 
            }
            self.showNext();
        })
        this.$leftBtn.click(function(){
            self.showPrev();
        })
        this.$circleLis.click(function(){
            self.show($(this).index())
        })
        this.dom.mouseenter(function(){
            clearInterval(self.timer)
        });
        this.dom.mouseleave(function(){
            self.autoPlay()
        });
    }
    //显示下一个轮播图
    Carousel.prototype.showNext = function(){
        this.$imagesUlLis.eq(this.index).animate({"left":-this.width},this.animateDuration)
        this.index ++ ;
        this.index = this.index>(this.pictureLength-1)?0:this.index;
        this.$imagesUlLis.eq(this.index).css("left",this.width).animate({"left":0},this.animateDuration);
        this.changeCircles()
    }
    //显示上一个轮播图
    Carousel.prototype.showPrev = function(){
        this.$imagesUlLis.eq(this.index).animate({"left":this.width},this.animateDuration)
        this.index -- ;
        this.index = this.index < 0 ?this.pictureLength-1:this.index;
        this.$imagesUlLis.eq(this.index).css("left",-this.width).animate({"left":0},this.animateDuration);
        this.changeCircles()
    }
    //点击小圆点切换轮播图
    Carousel.prototype.show = function(number){
        var old = this.index;
        this.index = number;
        if(this.index>old){
            this.$imagesUlLis.eq(old).animate({"left":-this.width},this.animateDuration);
            this.$imagesUlLis.eq(this.index).css("left",this.width).animate({"left":0},this.animateDuration);
        }else{
            this.$imagesUlLis.eq(old).animate({"left":this.width},this.animateDuration);
            this.$imagesUlLis.eq(this.index).css("left",-this.width).animate({"left":0},this.animateDuration);
        }
        this.changeCircles()
    }
    //点击小圆点的状态随轮播图的切换而切换
    Carousel.prototype.changeCircles = function(){
        this.$circleLis.eq(this.index).addClass("current").siblings().removeClass();
    }
    //自动播放
    Carousel.prototype.autoPlay = function(){
        var self = this;
        this.timer  =setInterval(function(){
            self.showNext();
        },this.interval);
    }
})()