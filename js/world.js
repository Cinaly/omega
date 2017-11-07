
(()=>{
    console.log(111);
    window.addEventListener("scroll",function(){
        var scrollTop=
            document.body.scrollTop
            ||
            document.documentElement.scrollTop;
        //console.log(scrollTop);
        if(scrollTop>=300){
            var timer=setTimeout(function(){
                $(".scroll").css({"opacity":1,"transform":"translate(300px)","transition":"all "+0.5+"s linear"});
            },5);
            var timer1=setTimeout(function(){
                $(".scroll0").css({"opacity":1,"transform":"translate(-300px)","transition":"all "+0.5+"s linear"});
            },5);
            //console.log(timer);
        }
    })
})();