// 加载开头banner图片设置轮播
(() => {
    var $banner_img = $("#banner>#banner_img_list>ul");     //存放图片的ul
    var $banner_buttons = $("#banner > #banner_buttons > ul");    //小圆点的ul
    var $banner_butten = $("#banner > #banner_buttons > ul>li");    //小圆点按钮
    var $banner = $("#banner");
    var $banner_img_lists = $("#banner>#banner_img_list>ul");     //图片li

    // 加载轮播图片
    $.ajax({
        type: "get",
        url: "data/banner.php",
        dataType: "json"
    }).then(data => {
        $banner_img.html("");
        $banner_img.html(`
            <li class="on" data-index="0">
                
                <img src="${data[1].ban_url}" class="on">
                <div>
                    <img src="img/banner/logo-seamaster.png">
                    <p class="big">AQUA TERRA 150米腕表</p>
                    <p class="little">埃迪·雷德梅尼的选择</p>
                </div>
            </li>
            <li data-index="1">
            <img src="${data[2].ban_url}">
                 <div>
                    <p class="little">动感风格邂逅典雅风范</p>
                    <p class="big">欧米茄超霸系列38毫米腕表</p>
                </div>
            </li>
            <li data-index="2">
            <img src="${data[3].ban_url}">
                <div>
                    <img src="img/banner/csm_logo-speedmasterfans_743bd689f4.png">
                    <p class="big">分享您的超霸腕表</p>
                </div>
            </li>
            <li data-index="3">
            <img src="${data[4].ban_url}">
                <div>
                    <p class="big">超霸腕表的故事</p>
                </div>
            </li>
        `);
        var $banner_li = $("#banner>#banner_img_list>ul>li:first-child");

        // 将图片更换为视频
        function banner_first_video() {
            $banner_li.html("");
            $banner_li.html(`
            <video loop autoplay poster="${data[1].ban_url}" class="on">
                <source src="${data[0].ban_url}">
                您的浏览器版本太低,请下载最新版本
            </video>
            <div>
                <img src="img/banner/logo-seamaster.png">
                <p class="big">AQUA TERRA 150米腕表</p>
                <p class="little">埃迪·雷德梅尼的选择</p>
            </div>
        `);
        }

// 将视频更换为图片
        function banner_first_img() {
            $banner_li.html("");
            $banner_li.html(`
            <img src="${data[1].ban_url}">
            <div>
                <img src="img/banner/logo-seamaster.png">
                <p class="big">AQUA TERRA 150米腕表</p>
                <p class="little">埃迪·雷德梅尼的选择</p>
            </div>
        `);
        }

        var banner_li = document.querySelectorAll("#banner>#banner_img_list>ul>li");
        var banner_li_img = document.querySelectorAll("#banner>#banner_img_list>ul>li>img");
        var banner_li_video = document.querySelector("#banner>#banner_img_list>ul>li>video");
        var banner_buttons = document.querySelectorAll("#banner>#banner_buttons>ul>li");
// 切换图片函数
        setTimeout(banner_first_video, 2000);

        function banner_img(sort) {
            $(banner_li[sort]).siblings().removeClass("on");
            $(banner_li_img).removeClass("on");
            $(banner_li[sort]).addClass("on");

            if (sort != 0) {
                $(banner_li_img[sort]).addClass("on");
                setTimeout(banner_first_img, 2000);
            } else {
                $(banner_li_video).addClass("on");
                setTimeout(function () {
                    banner_first_video();
                }, 2000);
            }
        }

// 点击按钮
        $banner_buttons.on("click", "li", function () {
            var $this = $(this);
            var $sort = $this.index();
            $banner_butten.removeClass("on");
            $this.addClass("on");
            banner_img($sort);

        });

// 自动更换图片
        function banner_timer() {
            var count = $banner_buttons.children("[class=on]").index();
            if (count == 3) {
                count = -1
            }
            banner_img(count + 1);
            $banner_butten.removeClass("on");
            $(banner_buttons[count + 1]).addClass("on");

        }

        var timer = setInterval(banner_timer, 8000);

        function banner_play() {
            timer = setInterval(banner_timer, 8000);
        }

        function banner_stop() {
            clearInterval(timer);
        }

        $banner.mouseover(banner_stop);
        $banner.mouseout(banner_play)
    });
})();
// 底部新闻轮播
(() => {
    var $news_subject = $("#news_subject");
    var $news_buttons = $("#news_buttons>ul");
    var $news_move = $("#news>div:nth-child(2)");
    $.ajax({
        url: "data/news.php",
        type: "get",
        dataType: "json"
    }).then(data => {

        $news_subject.html("");
        $news_subject.html(`
        <!--第五页轮播辅助图-->
            <li>
                    <div><img src="${data[4].news_img}" title="查看此文章" class="news_li_img_width"></div>
                    <div>
                        <h2>${data[4].news_title}</h2>
                        <p>${data[4].news_content}</p>
                        <a href="#">阅读更多</a>
                    </div>
                </li>
                <!--第一页-->
            <li>
                    <div><img src="${data[0].news_img}" title="查看此文章" class="news_li_img_height"></div>
                    <div>
                        <h2>${data[0].news_title}</h2>
                        <p>${data[0].news_content}</p>
                        <a href="#">阅读更多</a>
                    </div>
                </li>
                <!--第二页-->
                <li>
                    <div><img src="${data[1].news_img}" title="查看此文章" class="news_li_img_width"></div>
                    <div>
                        <h2>${data[1].news_title}</h2>
                        <p>${data[1].news_content}</p>
                        <a href="#">阅读更多</a>
                    </div>
                </li>
                <!--第三页-->
                <li>
                    <div><img src="${data[2].news_img}" title="查看此文章" class="news_li_img_height"></div>
                    <div>
                        <h2>${data[2].news_title}</h2>
                        <p>${data[2].news_content}</p>
                        <a href="#">阅读更多</a>
                    </div>
                </li>
                <!--第四页-->
                <li>
                    <div><img src="${data[3].news_img}" title="查看此文章" class="news_li_img_width"></div>
                    <div>
                        <h2>${data[3].news_title}</h2>
                        <p>${data[3].news_content}</p>
                        <a href="#">阅读更多</a>
                    </div>
                </li>
                <!--第五页-->
                <li>
                    <div><img src="${data[4].news_img}" title="查看此文章" class="news_li_img_width"></div>
                    <div>
                        <h2>${data[4].news_title}</h2>
                        <p>${data[4].news_content}</p>
                        <a href="#">阅读更多</a>
                    </div>
                </li>
                <!--第一页轮播辅助图-->
                <li>
                    <div><img src="${data[0].news_img}" title="查看此文章" class="news_li_img_height"></div>
                    <div>
                        <h2>${data[0].news_title}</h2>
                        <p>${data[0].news_content}</p>
                        <a href="#">阅读更多</a>
                    </div>
                </li>
        `);
        var news_animated = false;
        var prep = null;
        var news_width = $news_move.get(0).offsetWidth;

        function news_animate2(offset) {
            var newLeft = prep + offset;		//计算每次点击的偏移距离
            var time = 200;													//位移总的时间(毫秒)
            var interval = 10;											//位移间隔时间
            var speed = offset / (time / interval);		//每次位移的距离
            function go() {
                prep = parseInt($news_subject.css("left")) / news_width * 100;
                if ((speed < 0 && prep > newLeft)/*向右移动*/ || (speed > 0 && prep < newLeft)/*向左移动*/) {
                    prep = prep + speed + "%";
                    $news_subject.css("left", prep);
                    setTimeout(go, interval);						//设置定时器
                }
            }

            go();
        }

        function news_animate(offset) {
            var $current_img = $("#news_buttons>ul>li.on");
            var $news_img = ($current_img.index() + 1) * -100;//当前的偏移量
            news_animated = true;
            var newLeft = parseInt($news_img) + offset;		//计算每次点击的偏移后的偏移量

            var time = 200;													//位移总的时间(毫秒)
            var interval = 10;											//位移间隔时间
            var speed = offset / (time / interval);		//每次位移的距离

            function go() {
                if ((speed < 0 && parseInt($news_img) > newLeft)/*向右移动*/ || (speed > 0 && parseInt($news_img) < newLeft)/*向左移动*/) {
                    $news_img = parseInt($news_img) + speed + "%";
                    $news_subject.css("left", $news_img);
                    setTimeout(go, interval);						//设置定时器
                } else {
                    news_animated = false;
                }
            }

            go();
        }


// 更换图片和li样式
        $news_buttons.on("click", "li", function () {
            var $current_img = $("#news_buttons>ul>li.on").index();
            var $this = $(this);
            var $position = $this.index();
            var offset = ($position - $current_img) * -100;
            news_animate(offset);
            $this.siblings().removeClass();
            $this.addClass("on");
        });

        var canMove = false, offsetX = 0;


// 鼠标拖动
        $news_move.mousedown(e => {
            canMove = true;
            offsetX = e.offsetX;

        });

        $news_move.mousemove(e => {
            if (canMove) {
                var distance = (e.offsetX - offsetX) / news_width * 100;    //移动距离  往右移动为正数   往左为负数
                console.log(offsetX, e.offsetX);
                prep = parseInt($news_subject.css("left")) / news_width * 100;                       //移动后的的图片偏移量
                $news_subject.css("left", prep + distance + "%");
            }
        });
        $news_move.mouseout(() => {
            canMove = false;
        });
        $news_move.mouseup(() => {
            var $current_img = $("#news_buttons>ul>li.on");
            var $news_img = ($current_img.index() + 1) * -100;//当前元素的偏移量
            canMove = false;
            var $news_offset = null;

            if (prep - $news_img > 20) {
                $news_offset = $news_img + 100;
                $current_img.removeClass();
                news_animate2($news_img - prep + 100);
                setTimeout(() => {
                    if ($news_offset >= 0) {
                        $news_offset = -500;
                        $current_img.parent().children().last().addClass("on");
                    } else {
                        $current_img.prev().addClass("on");
                    }
                }, 220)
            } else if (prep - $news_img < -20) {
                $news_offset = $news_img - 100;
                news_animate2($news_img - prep - 100);
                $current_img.removeClass();
                setTimeout(() => {
                    if ($news_offset <= -600) {
                        $news_offset = -100;
                        $current_img.parent().children().first().addClass("on");
                    } else {
                        $current_img.next().addClass("on");
                    }
                }, 220)
                // setTimeout(()=>{$news_subject.css("left",$news_offset+"%");},220)
            } else {
                $news_offset = $news_img;
                news_animate2($news_img - prep);
            }
            setTimeout(() => {
                $news_subject.css("left", $news_offset + "%");
            }, 230)

        });
    })

})();

// 页面中间的轮播
function floor_three_carousel(){


    var triangle = document.getElementById("triangle").getContext("2d");

    triangle.beginPath();
    triangle.fillStyle = "#C40D2E";
    triangle.lineWidth = 1;
    triangle.moveTo(0, 0);
    triangle.lineTo(10, 0);
    triangle.lineTo(5, 10);
    triangle.lineTo(0, 0);
    triangle.closePath();
    triangle.fill();

    var $prev = $("#floor_three > div:nth-child(4)");                         // 获取向左的箭头
    var $next = $("#floor_three > div:nth-child(5)");                         // 获取向右的箭头
    var $floor_carousel = $("#floor_three > div:nth-child(3) > ul");         // 获取ul元素
    var $floor_area = $("#floor_three > div:nth-child(3)");                 //获取轮播区域的元素
    var $floor_area_height = $("#floor_three > div:nth-child(3) > div");
    var $floor_carousel_li = $("#floor_three > div:nth-child(3) > ul>li");   //获取轮播的li
    var $ul_len = $floor_carousel.children().length;                           //获取轮播元素个数
    var $floor_three_span = $("#floor_three>div:first-child>span");            //获取显示当前图片是第几张的的span元素
    var area_wid = $floor_area.get(0).offsetWidth;
    var area_width = area_wid / 4 * 3;

//设置div的高

    setTimeout(()=>{$floor_area_height.css("height", $floor_carousel.get(0).offsetHeight)},300);
    $floor_carousel.css("left", area_wid / 2 - $floor_carousel_li.get(0).offsetWidth / 2);


    window.onresize = function () {//页面改变时设置div的高
        var area_wid = $floor_area.get(0).offsetWidth;
        $floor_area_height.css("height", $floor_carousel.get(0).offsetHeight);
        $floor_carousel.css("left", area_wid / 2 - $floor_carousel_li.get(0).offsetWidth / 2)
    };

    var animated = false;

    function animate(offset) {
        animated = true;
        var newLeft = parseInt($floor_carousel.css("left")) + offset;		//计算每次点击的偏移距离
        var time = 300;													//位移总的时间(毫秒)
        var interval = 10;											//位移间隔时间
        var speed = offset / (time / interval);		//每次位移的距离

        function go() {
            if ((speed < 0 && parseInt($floor_carousel.css("left")) > newLeft)/*向右移动*/ || (speed > 0 && parseInt($floor_carousel.css("left")) < newLeft)/*向左移动*/) {
                $floor_carousel.css("left", parseInt($floor_carousel.css("left")) + speed);
                setTimeout(go, interval);						//设置定时器
            } else {
                animated = false;

            }
        }

        go();
    }

    // 鼠标点击左右箭头移动


    /*往右移动*/
    $next.click(() => {

        var $cur_offset = parseInt($floor_carousel.css("left"));
        if ($cur_offset - area_wid < -area_wid * 2) {
            $floor_carousel.animate({
                "left": -area_wid * 2
            }, 300);

        } else {
            animate(-area_width);	//传入参数让图片偏移

        }
        setTimeout(three_mouseup, 800)

    });

    /*往左移动*/
    $prev.click(() => {

        var $cur_offset = parseInt($floor_carousel.css("left"));
        if ($cur_offset + area_wid > area_wid / 2) {
            $floor_carousel.animate({
                "left": area_wid / 2
            }, 300);
        } else {
            animate(area_width);
        }
        setTimeout(three_mouseup, 800)

    });


// 鼠标拖动

    var area_move = false, offsetX = 0, area_move_left = false, area_move_right = false;
// 鼠标按下时
    $floor_area.mousedown((e) => {
        area_move = true;
        area_move_left = true;
        area_move_right = true;
        offsetX = e.offsetX;
    });
// 鼠标左右移动时
    $floor_area.mousemove((e) => {
        var distance = e.offsetX - offsetX;
        var $cur_offset = parseInt($floor_carousel.css("left"));
        var $floor_width = area_wid / 2;

        if ($cur_offset >= $floor_width) {
            area_move_left = false;
        } else {
            area_move_left = true;
        }
        if ($cur_offset <= -area_wid * 2) {
            area_move_right = false;
        } else {
            area_move_right = true;
        }
        if (area_move && area_move_right && !area_move_left) {
            $cur_offset = parseInt($floor_carousel.css("left"));
            distance = e.offsetX - offsetX;
            if (distance < 0) {
                $floor_carousel.css("left", $cur_offset + distance);
            }
        } else if (area_move && !area_move_right && area_move_left) {
            $cur_offset = parseInt($floor_carousel.css("left"));
            distance = e.offsetX - offsetX;
            if (distance > 0) {
                $floor_carousel.css("left", $cur_offset + distance);
            }
        } else if (area_move && area_move_left && area_move_right) {
            $floor_carousel.css("left", $cur_offset + distance);
        }
    });

// 鼠标抬起时
    $floor_area.mouseup(() => {
        three_mouseup()
    });
// 鼠标移动到左右箭头上抬起时
    $prev.mouseup(() => {
        three_mouseup()
    });
    $next.mouseup(() => {
        three_mouseup()
    });


    function three_mouseup() {
        area_move = false;
        area_move_left = false;
        area_move_right = false;
        var $li_width = $floor_carousel_li.get(0).offsetWidth;
    // 判断是是否让左右箭头消失
        if (parseInt($floor_carousel.css("left")) > area_wid / 2 - $li_width) {
            $prev.hide();
        } else if (parseInt($floor_carousel.css("left")) < -area_wid * 2 + $li_width) {
            $next.hide();
        } else if (parseInt($floor_carousel.css("left")) < area_wid / 2 - $li_width && parseInt($floor_carousel.css("left")) > -area_wid * 2 + $li_width) {
            $prev.show();
            $next.show();
        }
        // 判断现在是哪个li使其回正
        if (parseInt($floor_carousel.css("left")) > area_wid / 2 - $li_width / 2) {
            $floor_carousel.animate({
                "left": area_wid / 2 - $li_width / 2
            }, 300);
            $floor_three_span.html("");
            $floor_three_span.html("01" + "/" + $ul_len);
        } else if (parseInt($floor_carousel.css("left")) < -area_wid * 2 + $li_width / 2) {
            $floor_carousel.animate({
                "left": area_wid / 2 - $ul_len * $li_width + $li_width / 2
            }, 300);
            $floor_three_span.html("");
            $floor_three_span.html($ul_len + "/" + $ul_len);
        } else {
            $floor_carousel_li.each(function (index, Element) {
                if (area_wid / 2 >= $(Element).offset().left && $(Element).offset().left >= area_wid / 2 - $li_width) {
                    var ul_offset = index * $li_width + $li_width / 2;
                    $floor_carousel.animate({
                        "left": area_wid / 2 - ul_offset
                    }, 300);
                    // 改变span的内容
                    if (index + 1 < 10) {
                        $floor_three_span.html("");
                        $floor_three_span.html("0" + (index + 1) + "/" + $ul_len);
                    } else {
                        $floor_three_span.html("");
                        $floor_three_span.html((index + 1) + "/" + $ul_len);
                    }
                }

            })
        }
    }



}


(() => {
    var $floor_one = $("#floor_one");
    var $floor_two = $("#floor_two");
    var $floor_three = $("#floor_three");
    var $floor_four = $("#floor_four");
    var $floor_five = $("#floor_five");
    var $floor_six = $("#floor_six");
    $.ajax({
        url: "data/index.php",
        type: "get",
        dataType: "json"
    }).then(data => {

// 楼层1
        $floor_one.html("");
        $floor_one.html(`
             <div class="floor_font_style">
            <h2 class="floor_h2">${data["floor_one"][0].f_title}</h2>
            <p class="floor_p">${data["floor_one"][0].f_content}</p>
        </div>
        <div>
            <img src="${data["floor_one"][0].f_url}">
            <div>
                <img src="${data["floor_one"][1].p_img_l}" title="欧米茄45.5毫米至臻天文台GMT腕表">
                <p class="floor_p">${data["floor_one"][1].p_title}</p>
            </div>
        </div>
        `);

// 楼层2
        $floor_two.html("");
        $floor_two.html(`
        <div class="floor_font_style">
            <h2 class="floor_h2">${data["floor_two"][0].f_title}</h2>
            <p class="floor_p">${data["floor_two"][0].f_content}</p>
            <a href="#" class="search_series">探索此系列腕表</a>
        </div>

        <div>
            <video src="${data["floor_two"][0].f_url}"> 
                您的浏览器不支持此控件,请升级您的浏览器
            </video>
            <img src="img/floor/play.png">
        </div>
        `);

// 楼层3

        $floor_three.html("");
        $floor_three.html(`
        <div><span>01/10</span></div>
        <div>
            <canvas width="10" height="10" id="triangle">
                您的浏览器版本太低,请先升级浏览器
            </canvas>
        </div>
        <!--产品主体-->
        <div>
            <ul>
                <li><a href="product.html?p_id=${data["floor_two"][1][0].p_id}"><img src="${data["floor_two"][1][0].p_img_l}">
                    <p>${data["floor_two"][1][0].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][1].p_id}"><img src="${data["floor_two"][1][1].p_img_l}">
                    <p>${data["floor_two"][1][1].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][2].p_id}"><img src="${data["floor_two"][1][2].p_img_l}">
                    <p>${data["floor_two"][1][2].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][3].p_id}"><img src="${data["floor_two"][1][3].p_img_l}">
                    <p>${data["floor_two"][1][3].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][4].p_id}"><img src="${data["floor_two"][1][4].p_img_l}">
                    <p>${data["floor_two"][1][4].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][5].p_id}"><img src="${data["floor_two"][1][5].p_img_l}">
                    <p>${data["floor_two"][1][5].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][6].p_id}"><img src="${data["floor_two"][1][6].p_img_l}">
                    <p>${data["floor_two"][1][6].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][7].p_id}"><img src="${data["floor_two"][1][7].p_img_l}">
                    <p>${data["floor_two"][1][7].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][8].p_id}"><img src="${data["floor_two"][1][8].p_img_l}">
                    <p>${data["floor_two"][1][8].p_title}</p></a></li>
                <li><a href="product.html?p_id=${data["floor_two"][1][9].p_id}"><img src="${data["floor_two"][1][9].p_img_l}">
                    <p>${data["floor_two"][1][9].p_title}</p></a></li>
            </ul>
            <div></div>
        </div>
        <!--左右箭头-->
        <div><img src="img/arrows_left.png"></div>
        <div><img src="img/arrows_right.png"></div>
        <!--左右两边的遮罩层-->
        <div></div>
        <div></div>
        `);


// 楼层4
        $floor_four.html("");
        $floor_four.html(`
        <div class="floor_font_style">
            <h2 class="floor_h2">${data["floor_three"][0].f_title}</h2>
            <p class="floor_p">${data["floor_three"][0].f_content}</p>
            <a href="#" class="search_series">探索此系列腕表</a>
        </div>
        <img src="${data["floor_three"][0].f_url}">
        `);
        console.log(data["floor_four"][1][0].p_id);
// 楼层5
        $floor_five.html("");
        $floor_five.html(`
        <div class="floor_font_style">
            <h2 class="floor_h2">${data["floor_four"][0].f_title}</h2>
            <p class="floor_p">${data["floor_four"][0].f_content}</p>
            <a href="#" class="search_series">探索此系列腕表</a>
        </div>
        <div>
            <img src="${data["floor_four"][0].f_url}" class="four_left_img">
            <div class="four_right_div">
                <ul class="four_right_img">
                    <li><a href="product.html?p_id=${data["floor_four"][1][0].p_id}"><img src="${data["floor_four"][1][0].p_img_l}"></a></li>
                    <li><a href="product.html?p_id=${data["floor_four"][1][1].p_id}"><img src="${data["floor_four"][1][1].p_img_l}"></a></li>
                    <li><a href="product.html?p_id=${data["floor_four"][1][2].p_id}"><img src="${data["floor_four"][1][2].p_img_l}"></a></li>
                    <li><a href="product.html?p_id=${data["floor_four"][1][3].p_id}"><img src="${data["floor_four"][1][3].p_img_l}"></a></li>
                </ul>
            </div>
        </div>
        `);

// 楼层6
        $floor_six.html("");
        $floor_six.html(`
         <p>节选自欧米茄杂志《LIFETIME·磁力号》</p>
        <div>
            <div class="floor_font_style">
                <h2 class="floor_h2">${data["floor_five"][0].f_title}</h2>
                <p class="floor_p">${data["floor_five"][0].f_content}</p>
                <a href="#" class="search_series">查看详情</a>
            </div>
            <div>
                <img src="${data["floor_five"][0].f_url}">
            </div>
        </div>
        `);

        floor_three_carousel();

        var $floor_one_title=$("#floor_one>div:first-child");           //楼层一的文字
        var $floor_one_img=$("#floor_one>div:last-child>img");          //楼层一的海报图
        var $floor_one_product=$("#floor_one>div:last-child>div");      //楼层一的产品














    });
})();
