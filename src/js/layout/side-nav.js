(function ($) {
    EqUI.side_nav = {};

    EqUI.side_nav.element = $('.eq-ui-side-nav');
    EqUI.side_nav.header_element = $('.eq-ui-side-nav .brand');
    EqUI.side_nav.footer_element = $('.eq-ui-side-nav .footer');
    EqUI.side_nav.content_wrapper_element = $('.eq-ui-side-nav .eq-ui-side-nav-content-wrapper');

    // Init
    EqUI.side_nav.init = function() {

        $('.eq-ui-side-nav-toggle').on('click', function(){
            EqUI.side_nav.nav_toggle();
        });

        // Calculate height for (eq-ui-side-nav-content-wrapper)
        var _content_wrapper_height_offset = EqUI.side_nav.header_element.outerHeight() + EqUI.side_nav.footer_element.outerHeight();
        EqUI.side_nav.content_wrapper_element.css('height','calc(100% - '+_content_wrapper_height_offset+'px)');
    };

    // Update
    EqUI.side_nav.update = function() {

        if (window.innerWidth > 768) {

            if(EqUI.site.body.hasClass('eq-ui-side-nav-auto')){
                EqUI.site.body.removeClass("eq-ui-side-nav-hide");
                EqUI.site.body.addClass("eq-ui-side-nav-visible");
            } else if(!EqUI.site.body.hasClass('eq-ui-side-nav-visible') && !EqUI.site.body.hasClass('eq-ui-side-nav-hide')) {
                EqUI.site.body.addClass("eq-ui-side-nav-visible");
            }
        }
        else {

            if(EqUI.site.body.hasClass('eq-ui-side-nav-auto')){
                EqUI.site.body.removeClass("eq-ui-side-nav-visible");
                EqUI.site.body.addClass("eq-ui-side-nav-hide");
            } else if(!EqUI.site.body.hasClass('eq-ui-side-nav-visible') && !EqUI.site.body.hasClass('eq-ui-side-nav-hide')) {
                EqUI.site.body.addClass("eq-ui-side-nav-hide");
            }
        }
    };

    // Nav Toggle
    EqUI.side_nav.nav_toggle = function() {
        if(EqUI.site.body.hasClass('eq-ui-side-nav-visible')){
            EqUI.site.body.removeClass("eq-ui-side-nav-visible");
            EqUI.site.body.addClass("eq-ui-side-nav-hide");
        } else if(EqUI.site.body.hasClass('eq-ui-side-nav-hide')) {
            EqUI.site.body.removeClass("eq-ui-side-nav-hide");
            EqUI.site.body.addClass("eq-ui-side-nav-visible");
        } else {
            if (window.innerWidth > 768) {
                EqUI.site.body.addClass("eq-ui-side-nav-hide");
            } else{
                EqUI.site.body.addClass("eq-ui-side-nav-visible");
            }
        }
    };

    $(document).ready(function() {
        // Init
        EqUI.side_nav.init();

        // Update
        EqUI.side_nav.update();
    });
}( jQuery ));
