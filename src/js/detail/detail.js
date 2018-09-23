
require(["../conf/config"], function () {
    require(["jquery", "bootstrap", "template","lazyload","cookie","fly","zoomy"], function ($, boot, template,lazyload,cookie,fly,zoomy) {
       
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
                $.cookie('demo', '', { expires: -1 ,path:"/" });
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

        //商品详情
        $("#detail").load("http://localhost:8080/pages/templates/detail.html",function(){
            var countnum = $.cookie('countnum');
            $.ajax({
                url:"http://sapi.beibei.com/item/detail/"+countnum+".html?biz=pintuan&package=mizhe&callback=BeibeiItemDetailGet",
                dataType: "jsonp",  //指定服务器返回的数据类型
                jsonpCallback: "BeibeiItemDetailGet",  //指定回调函数名称
                scriptCharset: 'utf-8',
                success:function(data){
                    var temp = template("detail_model", {
                        list: data
                    });
                    console.log(data);
                    $("#detail_body").html(temp);
                    //放大镜,未完全实现
                    
                    //查看尺码表
                    $("#last_table").on("click",function(){
                        $("#myModal").modal("show");
                    })
                    //查看图片
                    var len = $(".img_left_move ul li").length;
                    var length = $(".img_left_move ul li").length;
                    if(len<4){
                        $("#zuojian").hide();
                    }
                    $("#zuojian").on("click",function(){
                        if(len<4){
                            return;
                        }
                        var _left = (parseInt($(".img_left_move ul").get(0).style.left) - 280).toString()+"px";
                        $(".img_left_move ul").animate({"left":_left},600,function(){
                            len -=4;
                            if(len<4){
                                $("#zuojian").hide();
                            }
                            $("#youjian").show();
                        });
                    })
                    $("#youjian").on("click",function(){
                        if(len>length-4){
                            return;
                        }
                        var _left = (parseInt($(".img_left_move ul").get(0).style.left) + 280).toString()+"px";
                        $(".img_left_move ul").animate({"left":_left},600,function(){
                            len +=4;
                            if(len>length-4){
                                $("#youjian").hide();
                            }
                            $("#zuojian").show();
                        });
                    })
                    $(".img_left_move ul").on("click","li",function(){
                        $("#main_img").get(0).src = $(this).find("img").get(0).src;
                    })
                    //商品评论
                    $("#commit_container").load("http://localhost:8080/pages/templates/commit.html",function(){
                        var countnum = $.cookie('countnum');
                        $.ajax({
                            url:"http://www.beibei.com/rate/get/"+countnum+"-1-0.html?callback=getCommentsNumCB",
                            dataType: "jsonp",  //指定服务器返回的数据类型
                            jsonpCallback: "getCommentsNumCB",  //指定回调函数名称
                            scriptCharset: 'utf-8',
                            success:function(data){
                                var temp = template("commit_model", {
                                    list: data
                                });
                                $("#commit").html(temp);

                                $("#fenye_container").load("http://localhost:8080/pages/templates/commit.html",function(){
                                    var countnum = $.cookie('countnum');
                                    $.ajax({
                                        url:"http://www.beibei.com/rate/get/"+countnum+"-1-0.html?callback=getCommentsNumCB",
                                        dataType: "jsonp",  //指定服务器返回的数据类型
                                        jsonpCallback: "getCommentsNumCB",  //指定回调函数名称
                                        scriptCharset: 'utf-8',
                                        success:function(data){
                                            var temp = template("commit_fenye", {
                                                list: data
                                            });
                                            $("#fenye").html(temp);
                                            //评论分页
                                            var len = length = parseInt( $("#commit_fenye #ul_overflow p span").length );
                                            console.log(len);
                                            if(length<5){
                                                $("#commit_left").hide();
                                                $("#commit_right").hide();
                                            }
                                            $("#commit_right").on("click",function(){
                                                if(len<5){
                                                    return;
                                                }
                                                var _left = (parseInt($("#commit_fenye #ul_overflow p").get(0).style.left)-225).toString()+"px";
                                                $("#commit_fenye #ul_overflow p").animate({"left":_left},600,function(){
                                                    len -= 5;
                                                    $("#commit_left").show();
                                                    if(len<5){
                                                        $("#commit_right").hide();
                                                    }
                                                })
                                            })
                                            $("#commit_left").on("click",function(){
                                                if(len>length-5){
                                                    return;
                                                }
                                                var _left = (parseInt($("#commit_fenye #ul_overflow p").get(0).style.left)+225).toString()+"px";
                                                $("#commit_fenye #ul_overflow p").animate({"left":_left},600,function(){
                                                    len += 5;
                                                    $("#commit_right").show();
                                                    if(len>length-5){
                                                        $("#commit_left").hide();
                                                    }
                                                })
                                            })
                                            $("#buyer_kou").click(function(){
                                                $(window).scrollTop($(".mjkb").offset().top);
                                            })
                                            $("#ul_overflow p").on("click","span",function(){
                                                $(this).css({"backgroundColor":"#FF6600","color":"#fff"});
                                                $(this).siblings().css({"backgroundColor":"#fff","color":"#ccc"})
                                                var num = $(this).text();
                                                $(window).scrollTop($(".mjkb").offset().top);
                                                $.ajax({
                                                    url:"http://www.beibei.com/rate/get/"+countnum+"-"+num+"-0.html?callback=getCommentsNumCB",
                                                    dataType: "jsonp",  //指定服务器返回的数据类型
                                                    jsonpCallback: "getCommentsNumCB",  //指定回调函数名称
                                                    scriptCharset: 'utf-8',
                                                    success:function(data){
                                                        var temp = template("commit_model", {
                                                            list: data
                                                        });
                                                        $("#commit").html(temp);
                                                    }
                                                });
                                            })
                                        }
                                    })
                                })
                                
                            }
                        });
                    });
                    //商品颜色
                    var cloth_color_num = 0 , cloth_color='';
                    $(".colornum ul").on("click","li",function(){
                        $("#main_img").get(0).src = $(this).find("img").get(0).src;
                        $(this).css("borderColor","#FF6600");
                        $(this).find("i").css("display","block");
                        $(this).siblings().css("borderColor","#ccc").find("i").css("display","none")
                        cloth_color_num = $(this).index();
                        cloth_color = $(".colornum ul li").eq(cloth_color_num).find("a span").text();
                    })
                    //商品尺寸
                    var cloth_size_num = 0 , cloth_size = '';
                    $(".size ul").on("click",'li',function(){
                        $(this).css("borderColor","#FF6600");
                        $(this).find("i").css("display","block");
                        $(this).siblings().css("borderColor","#ccc").find("i").css("display","none")
                        cloth_size_num = $(this).index();
                        cloth_size = $(".size ul li").eq(cloth_size_num).find("span").text();
                    })
                    //商品数量
                    $("#remove").on("click",function(){
                        $("#xiangou").css("display","none");
                        var num = $("#exampleInputAmount").get(0).value;
                        if(num == 1){
                            return;
                        }else{
                            $("#exampleInputAmount").get(0).value = --num;
                        }
                    })
                    $("#add").on("click",function(){
                        var num = $("#exampleInputAmount").get(0).value;
                        if(num == 5){
                            $("#xiangou").css("display","block");
                            return;
                        }else{
                            $("#xiangou").css("display","none");
                            $("#exampleInputAmount").get(0).value = ++num;
                        }
                    })
                    //购物车
                    $("#fixed_container").load("http://localhost:8080/pages/templates/fixed.html",function(){
                        var shop_list_cookie = $.cookie('shop_list');
                        if(shop_list_cookie == undefined){
                            shop_list_cookie = [{"mxw":0}];
                            $.cookie("shop_list",JSON.stringify(shop_list_cookie),{path:"/"});
                        }else{
                            shop_list_cookie = JSON.parse(shop_list_cookie);
                        }
                        var temp_shop = template("fixed_model",{
                            list: data,shop_list:shop_list_cookie
                        });
                        $("#fixed").html(temp_shop);

                        //加入购物车
                        var offset = $("#gwc_con").offset();   
                        $("#shopping_che").click(function(event) {
                            if(cloth_color==''||cloth_size == ''){
                                $("#infomation").show();
                                return;
                            }else{
                                var str = $.cookie('demo');
                                if(str === undefined){
                                    window.location.replace("http://localhost:8080/pages/regist/regist.html");
                                }else{
                                    var arr =  JSON.parse($.cookie('shop_list')) ;
                                    arr[0].mxw=1;
                                    var flag = false;
                                    for(var l=1;l<arr.length;l++){
                                        if(countnum == arr[l].id){
                                            arr[l].num++;
                                            arr[l].sum_money = parseInt(arr[l].num*arr[l].money*100)/100;
                                            flag = true;
                                            break;
                                        }
                                    }
                                    if(!flag){
                                        var obj={};
                                        obj["id"]=countnum;
                                        obj["num"]=$("#exampleInputAmount").get(0).value;
                                        obj["src"]=data.main_img;
                                        obj["title"]=data.title;
                                        obj["money"]=data.price/100;
                                        obj["sum_money"] = parseInt(obj["money"]*obj["num"]*100)/100;
                                        obj["color"]=cloth_color;
                                        obj["size"]=cloth_size;
                                        arr.push(obj);
                                    }
                                    $.cookie('shop_list',JSON.stringify(arr),{path:"/"});   
                                    var img = $("#main_img").attr('src'); //获取当前点击图片链接   
                                    var flyer = $('<img style="width:50px;height:50px;border-radius:50%;position: absolute" class="flyer-img" src="' + img + '">'); //抛物体对象   
                                    flyer.fly({   
                                        start: {   
                                            left: event.pageX,//抛物体起点横坐标   
                                            top: event.pageY-$(window).scrollTop() //抛物体起点纵坐标   
                                        },   
                                        end: {   
                                            left: offset.left-20,//抛物体终点横坐标   
                                            top: offset.top-20, //抛物体终点纵坐标 
                                            height:0,
                                            width:0  
                                        },   
                                        onEnd: function() {   
                                            //成功加入购物车动画效果   
                                            $("#shopping_che").hide();
                                            $("#shopping_che1").show();
                                            $("#shopping_che2").show();
                                            this.destory(); //销毁抛物体   
                                        }   
                                    });
                                    $("#shopping_che1").click(function(){
                                        window.location.replace("http://localhost:8080/pages/cart/cart.html");
                                    }); 
                                    $("#shopping_che2").click(function(){
                                        window.location.replace("http://localhost:8080/index.html");
                                    }); 
                                    var temp_shop = template("fixed_model",{
                                        list: data,shop_list:arr
                                    });
                                    $("#fixed").html(temp_shop);
                                }
                            }
                        }); 
                    });
                }
            });
        });
    })
});