webpackJsonp(["app/js/teacher/index"],{"7840d638cc48059df0fc":function(t,n){"use strict";$("body").on("click",".teacher-item .follow-btn",function(){var t=$(this);$.post(t.data("url"),function(){var n=t.data("loggedin");1===n&&(t.hide(),t.closest(".teacher-item").find(".unfollow-btn").show())})}).on("click",".unfollow-btn",function(){var t=$(this);$.post(t.data("url"),function(){}).always(function(){t.hide(),t.closest(".teacher-item").find(".follow-btn").show()})})},0:function(t,n,c){"use strict";c("7840d638cc48059df0fc")}});