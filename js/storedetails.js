/**
 * Created by web-01 on 2017/10/23.
 */
(() => {
    var pos_id = location.search.split("=")[1] || "";
    console.log(pos_id);

    $.ajax({
        url: "data/storedetails.php",
        dataType: "json",
        data: {"pos_id": pos_id}
    }).then(data => {
        console.log(data);
        var info = data.info;
        var sale_type = data.sale_type;
        $(".top_center>.city").html(info.pos_city_name);
        $(".top_center>.title").html(info.pos_name);
        var pos_conn = info.pos_connect.split(",");
        $(".second>.info").html(`<!--地址-->
                <div>
                    <h3>地址</h3>
                    <p>${info.pos_name}</p>
                    <p>${info.pos_address}</p>
                    <p>${info.pos_postcode} ${info.pos_city_name}</p>
                    <p>中国</p>
                    <a href="javascript:;" class="get_route">获取路线</a>
                </div>
                <!--联系方式-->
                <div>
                    <h3>联系方式</h3>
                    <p>${pos_conn[0]}</p>
                    <p>${pos_conn[1]}</p>
                    <a href="javascript:;">${pos_conn[2]}</a>
                </div>
                <!--营业时间-->
                <div>
                    <h3>营业时间</h3>
                    <p>${info.pos_business}</p>
                </div>`);

        var html = "";
        for (var type of sale_type) {
            html += `<li>
                    <img src=${type.sale_type_img} alt="">
                    <p>${type.sale_type_name}</p>
                </li>`;
        }
        $(".third>.ul1").html(html);


        //图片轮播
        var $ul2 = $(".ul2");
        var $ul3 = $(".ul3");

        var img_i = 1;
        var $img_list=$(".img_list");
        var $imgs=$img_list.children("img");
         var img_w = $imgs[0].clientWidth;
        console.log("=="+img_w);
        var deg=360/$imgs.length;
        var rotate=deg;
        console.log(deg);
        var r=(img_w/2)/Math.tan((deg/2)/180*Math.PI);
        $img_list.css("width",img_w.clientWidth);
        for(var i=0;i<$imgs.length;i++){
            console.log($($imgs[i]));
            $($imgs[i]).css("transform",`rotateY(${deg*i}deg) translateZ(${r}px)`);
        }

        autoChange(img_i*deg);

        $ul3.on("click", "a", function (e) {
           // clearInterval(timer);
            clearInterval(timer1);
            $(".ul3>li>a").attr("class", "");
            $(this).attr("class", "active");
            var i = $(this).parent().index();
            var deg=i*rotate;
            $img_list.css("transform",`rotateY(${deg}deg)`);
            autoChange(deg);

        });
        /*
        var canMove=false;
        var startX,rotateX;
        $(".stage").mouseenter(function (e) {
            e.preventDefault();
            clearInterval(timer1);
        });
        $(".stage").mouseleave(function (e) {
            e.preventDefault();
            console.log(timer1);
            autoChange(img_i*rotate);

        });
        $(".stage").mousedown(function (e) {
            startX=e.offsetX;
            console.log(rotateX,img_i);
            canMove=true;
        });

        //鼠标移动事件
        $(".stage").mousemove(function (e) {
            e.preventDefault();
            if(canMove){
                var offsetX=e.offsetX;
                var moveX=offsetX-startX;
                if(moveX>150||moveX<-150){
                    if(moveX>0){
                        $img_list.css("transform",`rotateY(${120*(img_i-1)}deg)`);
                    }else{
                        $(".ul3>li>a").attr("class", "");
                        $(`.ul3>li:nth-child(${img_i + 1})>a`).attr("class", "active");
                        $img_list.css("transform",`rotateY(${120*(img_i+1)}deg)`);
                    }
                }else{
                    $img_list.css("transform",`rotateY(${120*img_i}deg)`)
                }

            }
        });
        $(".stage").mouseup(function (e) {
            canMove=false;
        });
        */
        var timer1;
        function autoChange(deg) {
             timer1 = setInterval(function () {
                 if (img_i == 3) {
                     img_i = 0;
                 }
                 $(".ul3>li>a").attr("class", "");
                 $(`.ul3>li:nth-child(${img_i + 1})>a`).attr("class", "active");
                $img_list.css("transform",`rotateY(${deg}deg)`);
                deg+=120;
                img_i++;
                if(deg==360){
                    deg=0;
                }
            },3000);

        }

        var isOpen = true;
        $(".route>.left").click(function () {

            if (isOpen == true) {
                $(this).parent().attr("class", "route close");
                $(this).html("<span> < </span>");
                isOpen = false;
            } else {
                $(this).parent().attr("class", "route open");
                $(this).html("<span> > </span>");
                isOpen = true;
            }
        });
        // 百度地图API功能
        var map = new BMap.Map("map");    // 创建Map实例
        var point = new BMap.Point(info.pos_attitude, info.pos_longtitude);
        map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        var myIcon = new BMap.Icon("img/storedetails/store-omega.png", new BMap.Size(40, 40));
        var marker = new BMap.Marker(point, {icon: myIcon});

        map.setCurrentCity("杭州");          // 设置地图显示的城市 此项是必须设置的
        map.addOverlay(marker);
        //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        map.addControl(top_left_navigation);
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var opts = {
           // width : 200,     // 信息窗口宽度
          //  height: 100,     // 信息窗口高度
            title : info.pos_name , // 信息窗口标题

        }
        var infoWindow = new BMap.InfoWindow("地址："+info.pos_address.replace("<br>",""), opts);  // 创建信息窗口对象
        marker.addEventListener("click", function(){
            map.openInfoWindow(infoWindow,point); //开启信息窗口
        });


        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
                "input": "suggestId"
                , "location": map
            });
        ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            $("#searchResultPanel").html(str);
        });

        var myValue,search_point;
        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            $("#searchResultPanel").html("onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue);
            //setPlace();

            //根据输入的地址进行地址解析
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(myValue, function(point){
                if (point) {
                   // console.log(point);
                    search_point=point;
                }else{
                    alert("您选择地址没有解析到结果!");
                }
            },  _value.city);
        });

       //路径规划
        var $ul_plan=$(".search>ul");
        $ul_plan.on("click","li",function (e) {
            $ul_plan.children().removeClass("on");
            $(this).addClass("on");
            $search_res.html("");
        });

        var $btn_search=$(".input_location>img");
        var $search_res=$(".route>.search>span");
        $btn_search.on('click',function (e) {
            var ind=$ul_plan.children(".on").index();
            var $in=$(this).prev();
           if($in.val()!=""){
               console.log(search_point);
               var p1=search_point;
               var p2=new BMap.Point(info.pos_attitude,info.pos_longtitude);
               if(ind==0){
                   var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
                   driving.search(p1, p2);
               }else if(ind==1){
                   var transit = new BMap.TransitRoute(map, {
                       renderOptions: {map: map}
                   });
                   if(transit.kb==0){
                       transit.search(p1, p2);
                       $search_res.html("");
                   }else{
                       $search_res.html("暂无公交线路");
                   }

               }else{
                   $search_res.html("请输入起始点");
               }
           }else{
               console.log("没有输入起始位置");
           }
        });


        function setPlace() {
            //  map.clearOverlays();    //清除地图上所有覆盖物
            function myFun() {
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }

            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }


    });



})();

