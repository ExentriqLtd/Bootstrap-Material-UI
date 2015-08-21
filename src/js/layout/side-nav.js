(function ($) {
    EqUI.side_nav = {};

    EqUI.side_nav.element = $('.eq-ui-side-nav');

    // Init
    EqUI.side_nav.init = function() {
        $('.eq-ui-side-nav-toggle').on('click', function(){
            EqUI.side_nav.nav_toggle();
        });
    };

    // Update
    EqUI.side_nav.update = function() {
        
        if (window.innerWidth > 768) {
            
            /*if(!$('body').hasClass('eq-ui-side-nav-visible')){
                $('body').addClass("eq-ui-side-nav-visible");
            }*/

            // Close menu if window is resized bigger than 992 and user has fixed sidenav
            /*if ($('#sidenav-overlay').css('opacity') !== 0 && menuOut) {
                removeMenu(true);
            }
            else {
                menu_id.removeAttr('style');
                menu_id.css('width', options.menuWidth);
            }*/
        }
        else {

            /*if($('body').hasClass('eq-ui-side-nav-visible')){
                $('body').removeClass("eq-ui-side-nav-visible");
            }*/

            /*if (options.edge === 'left')
                menu_id.css('left', -1 * (options.menuWidth + 10));
            else
                menu_id.css('right', -1 * (options.menuWidth + 10));*/
        }
    };

    // Nav Toggle
    EqUI.side_nav.nav_toggle = function() {
        if($('body').hasClass('eq-ui-side-nav-visible')){
            $('body').removeClass("eq-ui-side-nav-visible");
            $('body').addClass("eq-ui-side-nav-hide");
        } else if($('body').hasClass('eq-ui-side-nav-hide')) {
            $('body').removeClass("eq-ui-side-nav-hide");
            $('body').addClass("eq-ui-side-nav-visible");
        } else {
            if (window.innerWidth > 768) {
                $('body').addClass("eq-ui-side-nav-hide");
            } else{
                $('body').addClass("eq-ui-side-nav-visible");
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
