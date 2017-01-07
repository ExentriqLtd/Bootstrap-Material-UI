(function ($) {
    EqUI.dropdown = {};

    EqUI.dropdown.element_class = 'eq-ui-dropdown';

    $.fn.dropdown = function (option) {
        var defaults = {
            inDuration: 300,
            outDuration: 225,
            hover: true,
            gutter: 0,
            belowOrigin: false,
            close: false
        };

        this.each(function(){
            var origin = $(this);
            var options = $.extend({}, defaults, option);
            var target = $("#"+ origin.attr('data-target'));
            var target_items = $("#"+ origin.attr('data-target') + ' li');

            // Update options
            updateOptions();

            // Is close option
            if(options.close){
                dropdownClose(target);
                return;
            }

            // If below Origin
            if(options.belowOrigin){
                target.addClass('eq-ui-dropdown-below-origin');
            }

            // Set Gutter
            setGutter(target);

            // Close on items click
            target_items.on('click', function(e) {
                var element = $(e.target);
                if(element.attr('data-target') === undefined){
                    dropdownClose(target);
                }
            });

            // Is Touch
            if(EqUI.site.isTouch){
                origin.on('click', function(e) {
                    dropdownOpen(target);
                });

                $('html').on('touchstart', function(e) {
                    var element = $(e.target);
                    if (!element.hasClass(EqUI.dropdown.element_class) && element.parents('.'+EqUI.dropdown.element_class).length !== 1) {
                        dropdownClose(target);
                    }
                });
            } else {
                // Close on html click
                $('html').on('click', function(e) {
                    var element = $(e.target);
                    if (!element.hasClass(EqUI.dropdown.element_class) && element.parents('.'+EqUI.dropdown.element_class).length !== 1) {
                        dropdownClose(target);
                    }
                });

                // Hover
                if (options.hover) {
                    var _close_process = false;

                    origin.on('mouseenter', function(e) {
                        dropdownOpen(target);
                        _close_process = false;
                    });

                    origin.on('mouseleave', function(e) {
                        _close_process = true;
                        setTimeout(function(){
                            if(_close_process){
                                dropdownClose(target);
                                _close_process = false;
                            }
                        }, 350);
                    });

                    target.on('mouseleave', function(e) {
                        _close_process = true;
                        setTimeout(function(){
                            if(_close_process){
                                dropdownClose(target);
                                _close_process = false;
                            }
                        }, 350);
                    });

                    target.on('mouseenter', function(e) {
                        _close_process = false;
                    });
                } else { // Click
                    origin.on('click', function(e) {
                        dropdownOpen(target);
                    });
                }
            }

            //----------------------
            // Helper Functions
            //----------------------

            // Dropdown Open
            function dropdownOpen(object) {
                if ((options.hover && !object.hasClass('active')) || (!options.hover && !object.hasClass('open'))){

					if(!object.hasClass("active")){
						object.addClass('active');
						
						object.stop(true,false).slideDown({
	                        duration: options.inDuration, easing: "easeOutQuart", queue: false, complete: function() {
	                            object.addClass('open');
	                            $(this).css('height', '');
	                        }
	                    });
					}
                    
                }
            }
            

            // Dropdown Close
            function dropdownClose(object) {
                if ((options.hover && object.hasClass('active')) || (!options.hover && object.hasClass('open'))){

                    object.removeClass('active');

                    object.stop(true,false).slideUp({
                        duration: options.outDuration, easing: "easeOutQuart", queue: false, complete: function() {
                            object.removeClass('open');
                            $(this).css('height', '');
                        }
                    });

                    // Close all dropdown children
                    object.find('.'+EqUI.dropdown.element_class).each(function(){
                        var element = $(this);

                        element.removeClass('active');

                        element.stop(true,false).slideUp({
                            duration: (options.outDuration/2), easing: "easeOutQuart", queue: false, complete: function() {
                                $(this).removeClass('open');
                                $(this).css('height', '');
                            }
                        });
                    });
                }
            }

            // Set Gutter
            function setGutter(object) {
                if(options.gutter === 0){
                    return;
                }

                var origin_height = origin.outerHeight(true);

                // Bottom
                if (object.hasClass('eq-ui-dropdown-left-bottom') || object.hasClass('eq-ui-dropdown-right-bottom')){

                    // CSS
                    object.css({
                        bottom: origin_height + options.gutter
                    });

                } else { // Top

                    // CSS
                    object.css({
                        top: origin_height + options.gutter
                    });
                }
            }

            // Update options
            function updateOptions() {
                if (origin.data('inDuration') !== undefined) {
                    options.inDuration = origin.data('inDuration');
                }
                if (origin.data('outDuration') !== undefined) {
                    options.outDuration = origin.data('outDuration');
                }
                if (origin.data('hover') !== undefined) {
                    options.hover = origin.data('hover');
                }
                if (origin.data('gutter') !== undefined) {
                    options.gutter = origin.data('gutter');
                }
                if (origin.data('belowOrigin') !== undefined) {
                    options.belowOrigin = origin.data('belowOrigin');
                }
            }

        });
    }; // End dropdown plugin

    // Init
    EqUI.dropdown.init = function() {

    };

    // Update
    EqUI.dropdown.update = function() {
        
    };

    // Load
    EqUI.dropdown.load = function() {
        $('.dropdown-trigger').dropdown();
    };

    $(document).ready(function() {
        // Init
        EqUI.dropdown.init();

        // Update
        EqUI.dropdown.update();
    });
}( jQuery ));