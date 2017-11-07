//搜索
/*function productsSearch(pno=0){
    var kw=location.search.split("=")[1]||"";
    ajax(
        "get",
        "data/search.php?kw="+kw
    )
}*/
$(function(){
    var $document = $(document),
        $window = $(window),
        $container = $("#pm_container"),
        winWidth = $window.innerWidth(),
        pno = 0,
        loadReady = true;


    //向服务器请求搜索数据,
    function loader(pno,kw){
        loadReady = false;
        $("#pm_loading").show();
        $.ajax({
            type:"get",
            url:"data/search.php",
            data:{pno:pno,kw:kw},
            success:function(output){
                var html ="";
                $.each(pager.data,function(){
                    html += `
                        
                    `;
                });
            }
        })
    }
});