;(function($) {
    $.fn.EqUIStickyTable = function(data) {
        var tableOffsetTopData = data.top ? data.top:0;
        return this.each(function() {
            var $this = $(this),
                $t_fixed;
            function init() {
                $this.wrap('<div class="eq-ui-sticky-table-wrap" />');
                $t_fixed = $this.clone();
                $t_fixed.find("tbody").remove().end().addClass("eq-ui-sticky-table-cloned").insertAfter($this);
                $t_fixed.css("top", tableOffsetTopData);
                resizeFixed();
            }
            function resizeFixed() {
                $t_fixed.find("th").each(function(index) {
                    $(this).css("width",$this.find("th").eq(index).outerWidth()+"px");
                });
            }
            function scrollFixed() {
                var offset = $(this).scrollTop(),
                    tableOffsetTop = $this.offset().top - tableOffsetTopData,
                    tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
                if(offset < tableOffsetTop || offset > tableOffsetBottom){
                    $t_fixed.hide();
                }
                else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden")){
                    $t_fixed.show();
                }
            }
            $(window).resize(resizeFixed);
            $(window).scroll(scrollFixed);
            init();
        });
    };
})(jQuery);