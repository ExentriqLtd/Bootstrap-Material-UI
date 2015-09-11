(function ($) {
    EqUI.side_nav = {};

    // Init
    EqUI.side_nav.init = function() {
        // Global vars
        EqUI.side_nav.element = $('.eq-ui-side-nav');

        $('.eq-ui-side-nav-toggle').on('click', function(){
            EqUI.side_nav.nav_toggle();
        });
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
