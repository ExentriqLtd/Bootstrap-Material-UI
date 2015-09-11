(function ($) {
    EqUI.site = {};
    
    // jQuery reverse
    $.fn.reverse = [].reverse;

    // Init
    EqUI.site.init = function() {
        // Global vars
        EqUI.site.body = $('body');

        // Is touch
        EqUI.site.isTouch = 'ontouchstart' in window || 'msmaxtouchpoints' in window.navigator;
        if(EqUI.site.isTouch){ $('html').addClass("is-touch"); }

        // Set checkbox to indeterminate
        $('[type="checkbox"].indeterminate-checkbox').each(function(index, element) {
            element.indeterminate = true;
        });
        
    };

    // Update
    EqUI.site.update = function() {
        
        // Is layout header is fixed
        if(EqUI.site.body.hasClass('eq-ui-layout-header-fixed')){
            EqUI.site.body.css('margin-top', $('.eq-ui-layout-header').outerHeight(true)+'px');
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
