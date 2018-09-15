
require(["js/conf/config"], function () {
    require(["jquery", "bootstrap", "template","lazyload"], function ($, boot, template,lazyload) {
       
        //模板一
        $("#model_1").load("http://localhost:8080/pages/templates/model1.html",function(){
            $.ajax({
                url: "http://localhost:8080/json_data/goods.json",
                dataType: "json",
                success: function (data) {
                    var tempstr = template("model1", {
                        list: data
                    });
                    $("#_body_center_header").html(tempstr);
                }
            })
        });

        //模板二
        $("#model_2").load("http://localhost:8080/pages/templates/model2.html",function(){
            var num=2;
            var count = 0;
            $(window).scrollTop(0);
            $(window).on("scroll",function(){
                var dis = $(window).scrollTop();
                console.log(dis);
                if(dis > 450+(num-2)*3300){
                    if(num==7){
                        return;
                    }
                    num++;
                    $.ajax({
                        url:"http://sapi.beibei.com/martshow/item/40989"+num+"-1-40--0--0-0-0.html?package=mizhe&callback=BeibeiMartshowItemGet1",
                        dataType: "jsonp",  //指定服务器返回的数据类型
                        jsonpCallback: "BeibeiMartshowItemGet1",  //指定回调函数名称
                        success:function(data){
                            var temp = template("model2", {
                                list: data.martshow_items
                            });
                            count += data.page_size;
                            $("img").lazyload({effect: "show"});
                            $("#_body_center_body_1").html($("#_body_center_body_1").html() + temp);
                            $("img.lazy").lazyload({
                                placeholder:"http://s0.husor.cn/image/icons/mzloader.gif",
                                effect: "fadeIn",
                                threshold:100
                            });
                        }
                    });
                }
            })
        });
        
        //登录方式
        $("#_header_top .col-xs-4 ul").on("mouseover",function(){
            $("#_header_top .col-xs-4 ul li").eq(0).addClass("li1_1");
            $("#_header_top .col-xs-4 ul li").eq(1).show();
            $("#_header_top .col-xs-4 ul li").eq(2).show();
            $(this).on("mousemove","li",function(){
                $(this).css("backgroundColor","#ddd");
            })
            $(this).on("mouseout","li",function(){
                $(this).css("backgroundColor","#fafafa");
            })
        })
        $("#_header_top .col-xs-4 ul").on("mouseout",function(){
            $("#_header_top .col-xs-4 ul li").eq(0).removeClass("li1_1");
            $("#_header_top .col-xs-4 ul li").eq(1).hide();
            $("#_header_top .col-xs-4 ul li").eq(2).hide();
        })

        //关注
        $("#notice_container").hover(function(){
            $("#watch-wrap").show();
            $("#notice").css({"backgroundColor":"#fafafa","borderColor":"#ccc"});
            },function(){
            $("#watch-wrap").hide();
            $("#notice").css({"backgroundColor":"#f4f4f4","borderColor":"#F4F4F4"});
        })

        //左侧悬浮窗
        $(window).on("scroll",function(){
            var dis = $(window).scrollTop();
            if(dis>=182){
                $("#_body_left .side-sign-org").hide();
                $("#_body_left .side-sign-sup").show();
                $("#_body_left").css({
                    "position":"fixed",
                    "top":"0px",
                    "left":"30px"
                })
            }else{
                $("#_body_left .side-sign-org").show();
                $("#_body_left .side-sign-sup").hide();
                $("#_body_left").css({
                    "position":"absolute",
                    "top":"20px",
                    "left":"30px"
                })
            }
        })

        //剩余倒计时
        setInterval(function(){
            var date = new Date();
            var hour = 24-date.getHours();
            var minute = 59-date.getMinutes();
            var second = 59-date.getSeconds();
            if(hour<10){hour = "0"+hour;}
            if(minute<10){minute = "0"+minute;}
            if(second<10){second = "0"+second;}
            $("#end_date_1 em").eq(0).text(hour);
            $("#end_date_1 em").eq(1).text(minute);
            $("#end_date_1 em").eq(2).text(second);
        },1000);

        //分页

        //回到顶部
        $(".backtop").on("click",function(){
            // var time = setInterval(function(){
            //     var dis = $(window).scrollTop();
            //     console.log(dis);
            //     if(dis < 100){
            //         clearInterval(time);
            //         $(window).scrollTop( 0 );
            //     }
            //     dis -= 100;
            //     $(window).scrollTop( dis );
            // },30)
            $(window).scrollTop( 0 );
        })


    })
});
