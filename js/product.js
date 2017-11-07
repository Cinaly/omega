/*****显示价格*****/

$("#product-reveal-price").click(e=>{
    var $tar=$(e.target);
$("#price-block").toggle(500,function() {
     if ($tar.html() == "显示价格") {
         $("#price-block").show();
         $tar.html("隐藏价格");
     } else {
         $("#price-block").hide();
         $tar.html("显示价格");
     }
 })
})


/****accordion****/
$(".pm-accordion").on("click",".pm-accordion-item",e=>
$(e.target).next(".pm-accordion-wrapper").toggleClass("in")
    .siblings(".pm-accordion-wrapper").removeClass("in")
);

