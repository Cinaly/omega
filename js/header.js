(() => {
    $.ajax({
        type: "get",
        url: "header.html",
        dataTypt: "text"
    }).then(text => {
        var $header = $("#header");
        $header.html("");
        $header.html(text);


        var $menu_bar = $("#menu_bar");                       //菜单栏
        var $menu_one = $("#menu_bar>#menu_one");             //一级分页
        var $menu_close = $("#menu_bar>div:first-child>a");   //关闭按钮
        var $menu_one_ul = $("#menu_one>ul");                 //一级分页下的菜单
        var $seek = $("#seek");                               //导航左上角的图片
        var $product = $("#menu_one>ul>li:first-child");      //产品列表
        var $menu_two = $("#menu_bar>#menu_two");             //二级分页
        var $menu_tuo_ul = $("#menu_two>ul");                 //二级分页的菜单
        var $menu = $("#menu>a");                             //菜单按钮
        var $menu_three = $("#menu_bar>#menu_three");         //三级分页
        var $menu_three_div = $("#menu_bar>#menu_three>div"); //三级分页的列表
        var $body = $("body");
        var $nav = $("#nav");                                 //导航栏
        var product_list = false;


        // 菜单显示
        $("#menu>a").click((e) => {
            e.preventDefault();
            var a=document.body.scrollTop;
            $menu_bar.css("width", "100%");
            $menu_one.css("width", "210px");
            $menu_close.css("width", "210px");
            $menu_one_ul.css("opacity", 1);
            unScroll();
        });
        // 菜单收回
        $("#menu_bar>div:first-child>a").click((e) => {
            e.preventDefault();
            $menu_bar.css("width", 0);
            $menu_three_div.css("opacity", 0);
            setTimeout(() => {
                $menu_one.css("width", 0);
                $menu_close.css("width", 0);
                $menu_one_ul.css("opacity", 0);
                $menu_three.css("width", 0);
                $menu_two.css("width", 0);
                product_list = false;
                removeUnScroll();
            }, 300)
        });
        $("#menu_bar>div:last-child").click(() => {
            $menu_bar.css("width", 0);
            $menu_three_div.css("opacity", 0);
            setTimeout(() => {
                $menu_close.css("width", 0);
                $menu_one_ul.css("opacity", 0);
                $menu_one.css("width", 0);
                $menu_three.css("width", 0);
                $menu_two.css("width", 0);
                product_list = false;
                removeUnScroll();
            }, 300)
        });

        // 二级菜单加载和显示/收回

        function product() {
            if (!product_list) {
                $menu_two.css("width", 235);
                product_list = true;
            } else if (product_list) {
                setTimeout(function () {
                    $menu_two.css("width", 0);
                }, 400);
                $menu_three.css("width", 0);
                product_list = false;
            }
        }

        $product.click(product);

        // 禁止滚动条滚动
        function unScroll(){
            var top = $(document).scrollTop();
            $(document).on("scroll.unable",function () {
                $(document).scrollTop(top)
            })
        }
        // 解除禁止滚动条滚动

        function removeUnScroll() {
            $(document).unbind("scroll.unable")
        }
        // 一级菜单图片的更换
        $menu_one_ul.on("mouseover", "li", function () {
            var $this = $(this).index();
            if ($this == 0) {
                $("#menu_one>ul>li:first-child>a>img").attr("src", "img/nav-watch_s.png")
            } else if ($this == 1) {
                $("#menu_one>ul>li:nth-child(2)>a>img").attr("src", "img/nav-omiga_s.png")
            } else if ($this == 2) {
                $("#menu_one>ul>li:nth-child(3)>a>img").attr("src", "img/nav-shetime_s.png")
            } else if ($this == 3) {
                $("#menu_one>ul>li:nth-child(4)>a>img").attr("src", "img/nav-pos_s.png")
            } else if ($this == 4) {
                $("#menu_one>ul>li:nth-child(5)>a>img").attr("src", "img/nav-server_s.png")
            } else if ($this == 5) {
                $("#menu_one>ul>li:last-child>a>img").attr("src", "img/nav-more_s.png")
            }
        });

        $menu_one_ul.on("mouseout", "li", function () {
            var $this = $(this).index();
            if ($this == 0) {
                $("#menu_one>ul>li:first-child>a>img").attr("src", "img/nav-watch_n.png")
            } else if ($this == 1) {
                $("#menu_one>ul>li:nth-child(2)>a>img").attr("src", "img/nav-omiga_n.png")
            } else if ($this == 2) {
                $("#menu_one>ul>li:nth-child(3)>a>img").attr("src", "img/nav-shetime_n.png")
            } else if ($this == 3) {
                $("#menu_one>ul>li:nth-child(4)>a>img").attr("src", "img/nav-pos_n.png")
            } else if ($this == 4) {
                $("#menu_one>ul>li:nth-child(5)>a>img").attr("src", "img/nav-server_n.png")
            } else if ($this == 5) {
                $("#menu_one>ul>li:last-child>a>img").attr("src", "img/nav-more_n.png")
            }
        });

        // 导航栏图片的更换
        $seek.on("mouseover", "a", function () {
            var $this = $(this).index();
            if ($this == 0) {
                $("#seek>a:first-child>img").attr("src", "img/search_s.png")
            } else if ($this == 1) {
                $("#seek>a:last-child>img").attr("src", "img/my_omega_s.png")
            }
        });
        $seek.on("mouseout", "a", function () {
            var $this = $(this).index();
            if ($this == 0) {
                $("#seek>a:first-child>img").attr("src", "img/search_n.png")
            } else if ($this == 1) {
                $("#seek>a:last-child>img").attr("src", "img/my_omega_n.png")
            }
        });

        $menu.mousemove(function () {
            $("#menu>a>img").attr("src", "img/header_menu.png");
        });
        $menu.mouseout(function () {
            $("#menu>a>img").attr("src", "img/header_menu_n.png");
        });


        $.ajax({
            type: "get",
            url: "data/get_series_category.php",
            dataTypt: "json"
        }).then(data => {
            $menu_tuo_ul.html("");
            $menu_tuo_ul.html(`
            <li>腕表</li>
            <li><a><img src="${data[0].sc_img}" title="${data[0].sc_name}"></a></li>
            <li><a><img src="${data[1].sc_img}" title="${data[1].sc_name}"></a></li>
            <li><a><img src="${data[2].sc_img}" title="${data[2].sc_name}"></a></li>
            <li><a><img src="${data[3].sc_img}" title="${data[3].sc_name}"></a></li>
            <li><a><img src="${data[4].sc_img}" title="${data[4].sc_name}"></a></li>
            <li class="watch_search"><a href="#"><img src="img/watch_search_n.png">腕表搜寻</a></li>
            <li class="menu_two_li_list">欧米茄华贵珠宝系列</li> <li>配饰</li>
        `);
        });

        $menu_tuo_ul.on("click", "li:gt(0):lt(5)", function () {
            $menu_three.css("width", 480);
            $menu_three_div.css("opacity", 0);
            var $this = $(this).index();
            setTimeout(function () {
                $.ajax({
                    type: "get",
                    url: "data/category_list.php",
                    data: {"sc_id": $this},
                    dataType: "json"
                }).then(data => {
                    $menu_three_div.html("");
                    var html = "";
                    html += `<div><ul>`;
                    for (var i = 0; i < data.length; i++) {
                        html += `<li><a href=\"#\"><img src=\"${data[i].sc_img}\"><p>${data[i].cl_name_en}</p></a></li>`;
                    }
                    html += `</ul></div><a href=\"#\">浏览全部系列</a>`;
                    $menu_three_div.html(`${html}`);
                });

                $menu_three_div.css("opacity", 1)
            }, 400);
        });


// 腕表搜寻变色
        $menu_tuo_ul.on("mouseover", "li:nth-child(7)", function () {
            $("#menu_two>ul>li:nth-child(7)>a>img").attr("src", "img/watch_search_s.png")
        });
        $menu_tuo_ul.on("mouseout", "li:nth-child(7)", function () {
            $("#menu_two>ul>li:nth-child(7)>a>img").attr("src", "img/watch_search_n.png")
        });
    });
})();
(() => {
    $.ajax({
        type: "get",
        url: "footer.html",
        dataTypt: "text"
    }).then(text => {
        var $footer = $("#footer");
        $footer.html("");
        $footer.html(text);
    });
})();
