webpackJsonp(["app/js/course/header-top/index"],{bbe1f1e10924ccc8bdb1:function(n,t){"use strict";$("body").on("click",".es-qrcode",function(){var n=$(this);n.hasClass("open")?n.removeClass("open"):$.ajax({type:"post",url:n.data("url"),dataType:"json",success:function(t){n.find(".qrcode-popover img").attr("src",t.img),n.addClass("open")}})})},0:function(n,t,o){"use strict";function a(){$(".cancel-refund").on("click",function(){return!!confirm("真的要取消退款吗？")&&void $.post($(this).data("url"),function(n){window.location.reload()})})}function s(n,t){n.click(function(){var o=n.data("url");o&&$.post(o).done(function(o){o&&(t.show(),n.hide())})})}function e(){var n=parseInt($("#discount-endtime-countdown").data("remaintime"));if(n>=0){var t=new Date((new Date).valueOf()+1e3*n);$("#discount-endtime-countdown").countdown(t,function(n){$(this).html(n.strftime(Translator.trans("剩余 ")+"<span>%D</span>"+Translator.trans("天 ")+"<span>%H</span>"+Translator.trans("时 ")+"<span>%M</span>"+Translator.trans("分 ")+"<span>%S</span> "+Translator.trans("秒")))}).on("finish.countdown",function(){$(this).html(Translator.trans("活动时间到，正在刷新网页，请稍等...")),setTimeout(function(){$.post(app.crontab,function(){window.location.reload()})},2e3)})}}o("bbe1f1e10924ccc8bdb1");var r=$(".js-unfavorite-btn"),c=$(".js-favorite-btn");s(r,c),s(c,r),e(),a()}});