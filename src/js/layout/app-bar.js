(function ($) {
    EqUI.app_bar = {};

    EqUI.app_bar.element = $('.eq-ui-app-bar');

    // Update
    EqUI.app_bar.update = function() {
        
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

    $(document).ready(function() {
        // Update
        EqUI.app_bar.update();
    });
}( jQuery ));
