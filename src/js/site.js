(function ($) {
    EqUI.site = {};

    // Vars
    //EqUI.side_nav.element = $('.eq-ui-side-nav');

    // Init
    EqUI.site.init = function() {

    };

    // Update
    EqUI.site.update = function() {
        
        // Is layout header is fixed
        if($('body').hasClass('eq-ui-layout-header-fixed')){
            $('body').css('margin-top', $('.eq-ui-layout-header').outerHeight(true)+'px');
        }
        
        if (window.innerWidth > 768) {
            
            
        }
        else {

            
        }
    };

    $(document).ready(function() {
        // Init
        EqUI.site.init();

        // Update
        EqUI.site.update();
    });
}( jQuery ));
