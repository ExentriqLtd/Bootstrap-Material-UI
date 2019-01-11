(function ($) {
    EqUI.collapsible = {};

    EqUI.collapsible.element = $('.eq-ui-collapsible');
    EqUI.collapsible.header_selector = '.eq-ui-collapsible-header';
    EqUI.collapsible.body_selector = '.eq-ui-collapsible-body';

    $.fn.eq_collapsible = function(options) {
        var defaults = {
            accordion: undefined
        };

        options = $.extend(defaults, options);

        return this.each(function() {

            var $this = $(this);

            var $panel_headers = $(this).find('> li > '+EqUI.collapsible.header_selector);

            var collapsible_type = $this.data("collapsible");

            var animation_duration = 350;

            // Turn off any existing event handlers
            $this.off('click.collapse', EqUI.collapsible.header_selector);
            $panel_headers.off('click.collapse');

            //----------------------
            // Helper Functions
            //----------------------

            // Accordion Open
            function accordionOpen(object) {
                $panel_headers = $this.find('> li > '+EqUI.collapsible.header_selector);

                if (object.hasClass('active')) {
                    object.parent().addClass('active');
                }
                else {
                    object.parent().removeClass('active');
                }

                if (object.parent().hasClass('active')){

                    object.siblings(EqUI.collapsible.body_selector).stop(true,false).slideDown({
                        duration: animation_duration, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}
                    });
                }
                else{

                    object.siblings(EqUI.collapsible.body_selector).stop(true,false).slideUp({
                        duration: animation_duration, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}
                    });
                }

                $panel_headers.not(object).removeClass('active').parent().removeClass('active');

                $panel_headers.not(object).parent().children(EqUI.collapsible.body_selector).stop(true,false).slideUp(
                {
                    duration: animation_duration,
                    easing: "easeOutQuart",
                    queue: false,
                    complete:
                    function() {
                        $(this).css('height', '');
                    }
                });
            }

            // Expandable Open
            function expandableOpen(object) {

                if (object.hasClass('active')) {
                    object.parent().addClass('active');
                }
                else {
                    object.parent().removeClass('active');
                }

                if (object.parent().hasClass('active')){

                    object.siblings(EqUI.collapsible.body_selector).stop(true,false).slideDown({
                        duration: animation_duration, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}
                    });
                }
                else{

                    object.siblings(EqUI.collapsible.body_selector).stop(true,false).slideUp({
                        duration: animation_duration, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}
                    });
                }
            }

            // Check if object is children of panel header
            function isChildrenOfPanelHeader(object) {
                var panelHeader = getPanelHeader(object);
                return panelHeader.length > 0;
            }

            // Get panel header from a children element
            function getPanelHeader(object) {
                return object.closest('li > '+EqUI.collapsible.header_selector);
            }

            /*  End Helper Functions */

            if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion

                // Add click handler to only direct collapsible header children
                $panel_headers = $this.find('> li > '+EqUI.collapsible.header_selector);
                $panel_headers.on('click.collapse', function (e) {
                    var element = $(e.target);

                    if (isChildrenOfPanelHeader(element)) {
                        element = getPanelHeader(element);
                    }

                    // Is body present
                    if (element.siblings(EqUI.collapsible.body_selector).length > 0) {
                        element.toggleClass('active');
                        accordionOpen(element);
                    }
                });

                // Open first active
                accordionOpen($panel_headers.filter('.active').first());
            }
            else { // Handle Expandables
                $panel_headers.each(function () {

                    // Add click handler to only direct collapsible header children
                    $(this).on('click.collapse', function (e) {
                        var element = $(e.target);

                        if (isChildrenOfPanelHeader(element)) {
                            element = getPanelHeader(element);
                        }

                        // Is body present
                        if (element.siblings(EqUI.collapsible.body_selector).length > 0) {
                            element.toggleClass('active');
                            expandableOpen(element);
                        }
                    });

                    // Open any bodies that have the active class
                    if ($(this).hasClass('active')) {
                        expandableOpen($(this));
                    }

                });
            }

        });
    };

    // Init
    EqUI.collapsible.init = function() {

    };

    // READY & OBSERVE
    if (EqUI.mutationObserver === null) {
      // Load
      EqUI.collapsible.init = function() {
        EqUI.collapsible.element.eq_collapsible();
      };
    } else {
      // .EqUIObserve(selector, onAdded, onRemoved)
      $(document).EqUIObserve('.eq-ui-collapsible', function () {
        $(this).eq_collapsible();
      })
    }

    // Update
    EqUI.collapsible.update = function() {
        
    };

    $(document).ready(function() {
        // Init
        EqUI.collapsible.init();

        // Update
        EqUI.collapsible.update();
    });
}( jQuery ));
