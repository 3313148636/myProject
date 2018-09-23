
require(["../conf/config"], function () {
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
                $.cookie('demo', '', { expires: -1,path:"/" });
                window.location.replace("http://localhost:8080/pages/regist/regist.html");
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

        //模板七 刷新底部模块
        $("#model_7").load("http://localhost:8080/pages/templates/model7.html",function(){
            var tempstr = template("model7");
            $(".footer-container").html(tempstr);
        });
        
        // 手机验证
        $("#tel_input").on("focus",function(){
            $(this).get(0).value = '';
            $(this).css({
                backgroundColor:"#FFFFEE",
                borderColor : "#FFCC00"
            });
        })
        $("#tel_input").blur(function(){
            $(this).css({
                backgroundColor:"#FFFFFF",
                borderColor : "#CCC"
            });
        })

        // 密码验证
        $("#code_input1").bind("focus",function(){
            $(this).css({
                backgroundColor:"#FFFFEE",
                borderColor : "#FFCC00"
            });
        })
        $("#code_input1").blur(function(){
            $(this).css({
                backgroundColor:"#FFFFFF",
                borderColor : "#CCC"
            });
        })
        var arr = ['','@qq.com','@163.com','@126.com','@sina.com','@sina.cn','@hotmail.com','@gmail.com','@sohu.com','@139.com','@.189.com']
        $("#tel_input").on("keyup",function(){
            $("#email_list").css("display","block");
            var oInput = $("#tel_input").get(0).value;
        
            if($("#tel_input").get(0).value.length < 1){
                $("#email_list ._li1").css("display","none");
            }else{
                var patt=new RegExp("@");
                if(patt.test(oInput)){
                    $("#email_list ._li1").css("display","none");
                    oInput = oInput.slice(0,-1);
                }else{
                    $("#email_list ._li1").css("display","block");
                }
            }
            $("#email_list li:not(.first_li)").each(function(){
                $(this).text( oInput + arr[$(this).index()-1]);
                $(this).on('click',function(){
                    $("#tel_input").get(0).value = $(this).text();
                    $("#email_list").css("display","none");
                })
            })
        })

        $(window).click(function(){
            $("#email_list").css("display","none");
        })
        $("#login_btn").on("click",function(){
            var user = false,pass = false;
            var phone_inp = $("#tel_input").get(0).value;
            var password_inp = $("#code_input1").get(0).value;
           if(phone_inp.length==0){
               $("#check_phone").css("visibility","visible");
               $("#check_phone span").text("邮箱不能为空");
           }else{
                if(!checkEmail($("#tel_input").get(0))){
                    if(checkPhone($("#tel_input").get(0))){
                        $("#check_phone").css("visibility","hidden");
                        user = true;
                    }else{
                        $("#check_phone").css("visibility","visible");
                        $("#check_phone span").text("无效的电子邮箱地址");
                    }
                }else{
                    $("#check_phone").css("visibility","hidden");
                    user = true;
                }
           }
           if(password_inp.length==0){
                $("#check_password").css("visibility","visible");
                $("#check_password span").text("密码不能为空");
            }else{
                if(password_inp.length<6){
                    $("#check_password").css("visibility","visible");
                    $("#check_password span").text("长度不得小于六位");
                }else{
                    $("#check_password").css("visibility","hidden");
                    pass = true;
                }
            }
            if(user == true&&pass == true){
                var obj = JSON.parse($.cookie('regist'));
                if(obj.username == phone_inp&&obj.password==password_inp){
                    var str= JSON.stringify({"username":phone_inp,"password":password_inp});
                    $.cookie("demo",str,{path: '/' });
                    window.location.replace("http://localhost:8080/index.html");
                }else{
                    $("#error").show();
                }
            }
        })
        //验证手机号
        function checkPhone(ele){ 
            var phone = ele.value;
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){   
                return false; 
            }else{
                return true;
            }
        }
        //验证邮箱
        function checkEmail(ele){
            var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
            var str = ele.value;
            if (re.test(str)) {
                return true;
            } else {
                return false;
            }
        }
    })
});
