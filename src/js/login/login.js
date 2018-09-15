require(["../conf/config"], function () {
    require(["jquery", "bootstrap", "template","lazyload","cookie"], function ($, boot, template,lazyload) {
        // $("#model_1").load("http://localhost:8080/pages/templates/model1.html",function(){
        //     $.ajax({
        //         url: "http://localhost:8080/json_data/goods.json",
        //         dataType: "json",
        //         success: function (data) {
        //             var tempstr = template("model1", {
        //                 list: data
        //             });
        //             $("#_body_center_header").html(tempstr);
        //         }
        //     })
        // });
        
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
        //验证码
        $(".change-checkcode").on("click",function(){
            $(".checkimg").get(0).src = "http://d.mizhe.com/checkcode/show2.html";
        })
        //表单验证
        let arr = ["手机号","验证码","验证号","密码","确认密码"];
        let formArr = $(".form-group .form-control-container .form-control").get();
        $("#zhuce_btn").on("click",function(){
            var demo = true;
            for(var i=0; i<formArr.length; i++){
                if(formArr[i].value == ""){
                    $(".check p").eq(i).css("visibility","visible");
                    formArr[i].style.backgroundColor = "#F2DEDE";
                    $(".check p span").eq(i).text(arr[i]+"不能为空");
                    demo = false;
                }else{ 
                    if(i==0){
                        var flag = checkPhone(formArr[0]);
                        if(!flag){
                            $(".check p").eq(0).css("visibility","visible");
                            formArr[i].style.backgroundColor = "#F2DEDE";
                            $(".check p span").eq(0).text(arr[0]+"错误");
                            demo = false;
                        }
                        if(flag){
                            formArr[0].style.background = "#DFF0D8";
                            $(".check p").eq(0).css("visibility","hidden");
                        }
                    }else if(i==3 || i==4){
                        if(formArr[i].value.length<6){
                            $(".check p").eq(i).css("visibility","visible");
                            formArr[i].style.backgroundColor = "#F2DEDE";
                            $(".check p span").eq(i).text(arr[i]+"不能小于六位");
                            demo = false;
                        }else{
                            formArr[i].style.background = "#DFF0D8";
                            $(".check p").eq(i).css("visibility","hidden");
                        }
                    }else{
                        formArr[i].style.background = "#DFF0D8";
                        $(".check p").eq(i).css("visibility","hidden");
                    }  
                }
            }
            if(formArr[3].value != formArr[4].value){
                $(".check p").eq(4).css("visibility","visible");
                formArr[4].style.backgroundColor = "#F2DEDE";
                $(".check p span").eq(4).text("两次输入密码不一样");
                demo = false;
                for(var j=0;j<4;j++){
                    formArr[j].style.backgroundColor = "#fff";
                    $(".check p").eq(j).css("visibility","hidden");
                }
            }
            if(demo){
                var str= JSON.stringify({"username":formArr[0].value,"password":formArr[3].value});
                $.cookie("demo",str);
                window.location.replace("http://localhost:8080/index.html");
            }
        })
        
        function checkPhone(ele){ 
            var phone = ele.value;
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){   
                return false; 
            }else{
                return true;
            }
        }
    })
});
