
require(["js/conf/config"], function () {
    require(["jquery", "bootstrap", "template","lazyload","cookie"], function ($, boot, template,lazyload) {
       
        //模板三 刷新首部菜单项
        $("#model_3").load("http://localhost:8080/pages/templates/model3.html",function(){
            var str = $.cookie('demo');
            if(str === undefined){
                flag = 1;
            }else{
                var name = JSON.parse(str).username;
                var name_str = name.slice(0,3)+"****"+name.slice(-4);
                flag = name_str;
            }
            var tempstr = template("model3",{data:flag});
            $("#_header_top").html(tempstr);
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
                $("#_header_top .col-xs-4 ul li").eq(0).css("backgroundColor","#f4f4f4");
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
            //退出登录
            $("#logout").click(function(){
                $.cookie('demo', '', { expires: -1 ,path:"/"});
                $.cookie('shop_list', '', { expires: -1 ,path:"/"});
                window.location.replace("http://localhost:8080/index.html");
            })
        });

        //模板四 刷新首部logo
        $("#model_4").load("http://localhost:8080/pages/templates/model4.html",function(){
            var tempstr = template("model4");
            $("#_header_bottom").html(tempstr);
        });

        //模板五 刷新首部导航条
        $("#model_5").load("http://localhost:8080/pages/templates/model5.html",function(){
            var tempstr = template("model5");
            $("#nav").html(tempstr);
        });

        //模板六 刷新注册模块
        $("#model_6").load("http://localhost:8080/pages/templates/model6.html",function(){
            var str = $.cookie('demo');
            if(str === undefined){
                flag = 1;
            }else{
                flag = 0;
            }
            var tempstr = template("model6",{data:flag});
            $("#reg-box").html(tempstr);
        });

        //模板七 刷新底部模块
        $("#model_7").load("http://localhost:8080/pages/templates/model7.html",function(){
            var tempstr = template("model7");
            $(".footer-container").html(tempstr);
        });

        //模板一 商品列表一
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

        //模板二 商品列表二
        $("#model_2").load("http://localhost:8080/pages/templates/model2.html",function(){
            var num=2;
            var count = 0;
            $(window).scrollTop(0);
            $(window).on("scroll",function(){
                var dis = $(window).scrollTop();
                if(dis > 100+(num-2)*3300){
                    if(num==7){
                        return;
                    }
                    num++;
                    $.ajax({
                        url:"http://sapi.beibei.com/martshow/item/409929-1-40--0--0-0-0.html?package=mizhe&callback=BeibeiMartshowItemGet1",
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
                             //查看商品详情
                            $(".go-buy").on("click",function(){
                                var countnum = $(this).attr('iid');
                                $.cookie("countnum",countnum,{path: '/' });
                                window.location.replace("http://localhost:8080/pages/detail/detail.html");
                            })
                        }
                    });
                }
            })
        });

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

        // $.ajax({
        //     url:"http://www.beibei.com/rate/get/29390825-1-0.html?callback=getCommentsNumCB",
        //     dataType: "jsonp",  //指定服务器返回的数据类型
        //     jsonpCallback: "getCommentsNumCB",  //指定回调函数名称
        //     scriptCharset: 'utf-8',
        //     success:function(data){
        //         console.log(data);
        //     }
        // });

       
    })
});
