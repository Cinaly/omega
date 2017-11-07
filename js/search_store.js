/**
 * Created by lsn on 2017/10/14.
 */
(() => {
    var $ul = $(".ul_pro");
    var $li = $(".ul_pro>li");
    var $pro = $(".province");
    var $city = $(".city");
    var $search_list = $("div.search_list>ul");
    var $ul_tab = $(".pos_tab1");
    var $ul_list = $(".pos_list");
    var $slide_w = $(".slide_w");
    var $vertival_bar = $(".vertical-bar");
    choosePro();
    $ul.on("click", "li", function (e) {
        console.log($(e.target));
        var $li = $(e.target);
        if ($ul.data("type") == "pro") {
            $ul.parent().parent().children("p").html("市");
            $pro.html("州/省");
            $pro.next().data("id", $li.data("id"));
            $pro.next().html($li.html() + `&nbsp;&nbsp;<a class="achange" href="javascript:;">更换</a>`);
            console.log($li.data("id"));
            chooseCity($li.data("id"));
        } else {
            $ul.parent().parent().children("p").html("市");
            $city.html("市");
            $city.next().data("cid", $li.data("id"));
            $city.next().html($li.html());
            getPosCount($li.data("id"), 0);
            getPos($li.data("id"), 0);
        }
    });
    $(".mask").on("click", ".achange", function () {
        console.log($(this));
        choosePro();
        $ul.parent().parent().children("p").html("州/省");

        $(".city").html("");
        $(".city").next().html("");
    });

    var $input_search = $("div.search>input");
    $input_search.focus(function (e) {
        var $this = $(e.target);
        $this.next("span").hide();
        $search_list.show();
    });
    $input_search.on("keyup", function (e) {
        var $this = $(e.target);
        if ($this) {
            $search_list.show();
            searchKeyword($this.val());
        }
        if ($this.val() == "") {
            $search_list.hide();
        }
    });

    $input_search.blur(function (e) {
        if ($(this).val() == "") {
            $(e.target).next("span").show();
        }
    });
    $("#btn_search").click(function (e) {
        var $this = $(e.target);
        var keyword = $("div.search>input").val();
        if (keyword != "") {
            getPos(null, null, null, null, keyword);
        }
    });
    $("div.area>.list>img").click(function (e) {
        var $in = $(e.target);
        if ($in.prev().val() != "") {
            if ($in.prev().prev().html() == "州/省")
                choosePro($in.prev().val());
            else if ($in.prev().prev().html() == "市")
                chooseCity($in.prev().val());
        }
        $in.prev().val("");
    });

    $ul_tab.on("click", "li", function (e) {
        var $li = $(e.target);
        console.log("====", $li.get(0));
        $li.attr("class", "active");
        getPos($city.next().data("cid"), $li.data("type"));
        $li.siblings("li").attr("class", "");
    });

    //滚动条配置
    function scrollList(ul) {
        $li = $(ul.children()[0]);
        var $box = $(".pro_list");  //最外面的div
        var $slide = $(".slide_w"); //滑块

        var li_num = $ul.children().length; //ul中的li的个数
        var lih = $li.height(); //li高度
        var vh = $vertival_bar.height();  //滚动条高度
        var sh = $slide_w.height();   //滚动块高度

        var listh = lih * li_num; //列表总高度
        var ph = $vertival_bar.parent().height(); //父元素高度

        var ul_scroll_h = listh - ph; //ul可以滚动的高度
        var canMove = false,y; //是否可滑动
        $slide_w.mousedown(function (e) {
            canMove = true;
            var offTop = $slide.get(0).offsetTop; //获取滑块距离其父元素的距离
            // console.log(e.clientY,$slide.offset().top,$slide.get(0).offsetTop);
            console.log(e.clientY);
            y = e.clientY -offTop; //计算鼠标按下时的y值-滑块与父元素的距离(y值不变)
        });
        var scrollH=0; //鼠标移动的距离
        $(window).mousemove(function(e){
            scrollH = e.clientY - y; //计算鼠标移动的距
            if (canMove) {
                if (scrollH > (vh - sh)) { //判断滚动区域是否在范围内
                    scrollH = vh - sh;
                } else if (scrollH < 0) {
                    scrollH = 0;
                }
                $slide.css("top", scrollH); //设置滚动块的top值
                $ul.get(0).scrollTop = ul_scroll_h * (scrollH / (vh - sh)); //设置ul滚动的距离
            }
        });
        $(window).mouseup(function (e) {
            canMove = false;
        });

        $box.get(0).addEventListener("DOMMouseScroll", scroll, false); //给最外层的div绑定鼠标滚轮事件
        $box.get(0).onmousewheel = scroll;

        function scroll(e) {
            var offTop = 0;
            if (e.wheelDelta > 0) { //向上滚动
                offTop = $slide.get(0).offsetTop - 10;  //如果向上滚动,将滑块的top的值-10赋值给offTop
            } else {//向下滚动
                offTop = $slide.get(0).offsetTop + 10; //如果向下滚动,将滑块的top的值+10赋值给offTop
            }
            if (offTop > (vh - sh)) { //判断滚动区域是否在范围内
                offTop = vh - sh;
            } else if (offTop < 0) {
                offTop = 0;
            }
            $slide.css("top", offTop); //设置滚动块的top值
            $ul.get(0).scrollTop = ul_scroll_h * (offTop / (vh - sh)); //设置ul滚动的距离
            return false; //禁止在box上滚动时,body也会滚动的情况,阻止事件向下传递
        }
    }

    //加载省份
    function choosePro() {
        var param;
        if (arguments.length > 0) {
            var pos_pro_name = arguments[0];
            param = {"pos_pro_name": pos_pro_name};
        } else {
            param = {};
        }
        $.ajax({
            url: "data/search_pro_city.php",
            type: "get",
            dataType: "json",
            data: param
        }).then(function (data) {

            html = "";
            for (var p of data) {
                html += `<li data-id=${p.pos_pro_id}>${p.pos_pro_name}</li>`;
            }
            $ul.html(html);
            $ul.data("type", "pro");
            scrollList($ul);
        });
    }

    //加载城市
    function chooseCity() {
        var param;
        if (arguments[0].isNaN) {
            var pos_pro_name = arguments[0];
            param = {"pos_city_name": pos_pro_name};
        } else {
            param = {"pos_pro_id": arguments[0]};
        }
        $.ajax({
            url: "data/search_pro_city.php",
            type: "get",
            dataType: "json",
            data: param
        }).then(function (data) {
            html = "";
            for (var c of data) {
                html += `<li data-id=${c.pos_city_id}>${c.pos_city_name}</li>`;
            }
            $ul.html(html);
            $ul.data("type", "city");

        });
    }

    //加载销售点
    function getPos(cid, tid, pos_id, pid, kw) {
        var params = {};
        var hasParams = false;
        if (tid != null && cid) {
            params = {"cid": cid, "tid": tid};
            hasParams = true;
        } else if (pos_id) {
            params = {"pos_id": pos_id};
            hasParams = true;
        } else if (pid) {
            params = {"pid": pid};
            hasParams = true;
        } else if (kw) {
            params = {"kw": kw};
            hasParams = true;
        } else {
            hasParams = false;
            console.log("没有任何参数,无法获取销售点");
        }
        if (hasParams) {
            $.ajax({
                url: "data/search_pos.php",
                type: "get",
                dataType: "json",
                data: params
            }).then(output => {
                $search_list.hide();
                $ul_tab.next().html(`<span>${output.count}</span>家${output.type}(${output.city})`);
                var shops = output.shop;
                var html = "";
                var spclass = "";
                for (var shop of shops) {
                    if (shop.pos_type_id == 1) {
                        spclass = "pos_type_1";
                    } else {
                        spclass = "pos_type_2";
                    }
                    html += `<li>
                    <p class="pos_title"><span>${shop.pos_name}</span> <span class="${spclass}"></span></p>
                    <p class="pos_address">${shop.pos_address}</p>
                    <p>${shop.pos_postcode} ${shop.pos_city_name}</p>
                    <p>中国</p>
                    <img src="img/pos_list_icon.png" alt="">
                    <br>
                    <a href="storedetails.html?pos_id=${shop.pos_id}">浏览专卖店</a>
                </li>`;
                }
                $ul_list.html(html);
            });
        } else {
            console.log("没有任何参数,无法获取销售点");
        }

    }

    //加载销售点tab
    function getPosCount(cid, tid) {
        var params = {};
        if (tid != null && cid) {
            params = {"cid": cid, "tid": tid};
            $.ajax({
                url: "data/search_pos_count.php",
                type: "get",
                dataType: "json",
                data: params
            }).then(output => {
                var total = output.total;
                var qjd = output.qjd;
                var lsd = output.lsd;
                $ul_tab.html(`<li class="active" data-type="0">所有(${total})</li>
                <li data-type="1">欧米茄旗舰店(${qjd})</li>
                <li data-type="2">欧米茄特约零售商店铺(${lsd})</li>`);
            });
        } else {
            console.log(tid, cid);
        }
    }

    //搜索关键词
    function searchKeyword(kw) {
        $.ajax({
            url: "data/search_pos_keywords.php",
            data: {"kw": kw},
            type: "get",
            dataType: "json"
        }).then(output => {
            var name = output.name;
            var address = output.address;
            var province = output.province;
            var city = output.city;
            var html = "";
            if (name.length > 0) {
                html += `<li data-type="zmd"><dl><dt>专卖店</dt>`;
                for (var n of name) {
                    html += `<dd data-dd-id="${n.pos_id}">${n.pos_name}(${n.pos_city_name})</dd>`;
                }
                html += `</dl></li>`;
            }
            if (address.length > 0) {
                html += `<li data-type="dz"><dl><dt>地址</dt>`;
                for (var n of address) {
                    var b = n.pos_address.replace(/<br>/g, "，")
                    html += `<dd data-dd-id="${n.pos_id}">${b} ${n.pos_city_name}，中国</dd>`;
                }
                html += `</dl></li>`;
            }
            if (province.length > 0) {
                html += `<li data-type="sf"><dl><dt>州/省</dt>`;
                for (var n of province) {
                    html += `<dd data-dd-id="${n.pos_pro_id}">${n.pos_pro_name}(中国)</dd>`;
                }
                html += `</dl></li>`;
            }
            if (city.length > 0) {
                html += `<li data-type="cs"><dl><dt>城市</dt>`;
                for (var n of city) {
                    html += `<dd data-dd-id="${n.pos_city_id}">${n.pos_city_name}(中国)</dd>`;
                }
                html += `</dl></li>`;
            }

            $search_list.html(html);
            var $dd = $search_list.find("dd");
            $dd.click(function (e) {
                var $this = $(e.target);
                var id = $this.data("dd-id");
                if ($this.parent().parent().data("type") == "zmd") {
                    getPos(null, null, id, null, null);
                } else if ($this.parent().parent().data("type") == "dz") {
                    getPos(null, null, id, null, null);
                } else if ($this.parent().parent().data("type") == "sf") {
                    getPos(null, null, null, id, null);
                } else if ($this.parent().parent().data("type") == "cs") {
                    getPos(id, 0, null, null, null);
                } else {
                    console.log($this.html());
                }
                console.log("====" + $this.html());
                $input_search.val($this.html());
            })
        });
    }
})();

