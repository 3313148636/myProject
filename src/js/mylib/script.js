$(function () {
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
})
var _script = document.createElement("script");
    _script.src = `http://m.mizhe.com/temai/nvzhuang---1-20---1.html?callback=MizheTemaiGet1`;
    document.body.appendChild(_script);
    function MizheTemaiGet1(data) {
        console.log(data.tuan_items);
        var tempstr = template("model2", {
            list: data.tuan_items
        });
        $("#_body_center_body_1").html( $("#_body_center_body_1").html() + tempstr);
    } 