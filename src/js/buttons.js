(function ($) {
    EqUI.buttons = {};

    // Init
    EqUI.buttons.init = function() {

        // Global vars
        EqUI.buttons.element = $('.btn');
        EqUI.buttons.fab_action_id = 'eq-ui-btn-fab-action';
        EqUI.buttons.fab_action_element = $('.'+EqUI.buttons.fab_action_id);

        // Events for FAB Action Button
        if(EqUI.site.isTouch){
            EqUI.buttons.fab_action_element.on('click', function(e) {
                EqUI.buttons.toggleFAB($(this));
            });

            $('html').on('touchstart', function(e) {
                var element = $(e.target);
                if (!element.hasClass(EqUI.buttons.fab_action_id) && element.parents('.'+EqUI.buttons.fab_action_id).length !== 1) {
                    EqUI.buttons.fab_action_element.closeFAB();
                }
            });
        } else {
            EqUI.buttons.fab_action_element.on('mouseenter', function(e) {
                EqUI.buttons.toggleFAB($(this));
            });

            EqUI.buttons.fab_action_element.on('mouseleave', function(e) {
                EqUI.buttons.toggleFAB($(this));
            });
        }

        // Extend fab functions
        $.fn.extend({
            toggleFAB: function() {
                EqUI.buttons.toggleFAB($(this));
            },
            openFAB: function() {
                EqUI.buttons.toggleFAB($(this), false);
            },
            closeFAB: function() {
                EqUI.buttons.toggleFAB($(this), true);
            }
        });
    };

    // Update
    EqUI.buttons.update = function() {
        
    };

    // Toggle FAB
    EqUI.buttons.toggleFAB = function(element, isClose) {
        if(!element.hasClass(EqUI.buttons.fab_action_id)){
            return;
        }

        // Parse undefined
        if (typeof isClose === "undefined") { isClose = 'none'; }

        // Vars
        var total = element.find('ul li').length;
        var onAnimationEnd = null;
        var animationDuration = 150;
        var animationDelay = 75;
        var time = 0;

        // End animation event
        function animationEnd() {
            if(!element.hasClass(EqUI.buttons.fab_action_id+' active')){
                $('.'+EqUI.buttons.fab_action_id+' ul').css('height', '0');
            }
        }

        // Add animation class
        if(!element.hasClass(EqUI.buttons.fab_action_id+' active') && (isClose === false || isClose === 'none')){
            // SHOW
            $('.'+EqUI.buttons.fab_action_id+' ul').css('height', 'auto');
            element.addClass("active");

            // Set start position
            element.find('ul li').velocity(
                { opacity: "0", scaleY: ".4", scaleX: ".4", translateY: "40px"},
                { duration: 0 }
            );

            // Set animations show
            element.find('ul li').reverse().each(function (index) {
                $(this).velocity(
                    { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0"},
                    { duration: animationDuration, delay: time }
                );
                time += animationDelay;
            });
        } else if((isClose === true || isClose === 'none')) {
            // HIDE
            element.removeClass("active");

            // Stop all animations
            element.find('ul li').velocity("stop", true);

            // Set hide animations
            element.find('ul li').each(function (index) {

                // Set event complete only the last item
                if (index === total - 1) {
                    onAnimationEnd = animationEnd;
                } else {
                    onAnimationEnd = null;
                }

                $(this).velocity(
                    { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: "40px"},
                    { duration: animationDuration, delay: time, complete: onAnimationEnd}
                );
                time += animationDelay;
            });
        }
    };

    $(document).ready(function() {
        // Init
        EqUI.buttons.init();

        // Update
        EqUI.buttons.update();
    });
}( jQuery ));