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
                $.cookie('demo', '', { expires: -1 ,path:"/" });
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
        
        // $("#shop_cart").load("http://localhost:8080/pages/templates/shop_cart.html",function(){
        //     var tempstr = template("shop_list_model");
        //     $("#shop_list_container").html(tempstr);
        // });
        
        //模板七 刷新底部模块
        $("#model_7").load("http://localhost:8080/pages/templates/model7.html",function(){
            var tempstr = template("model7");
            $(".footer-container").html(tempstr);
        });
