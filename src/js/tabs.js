(function ($) {
    EqUI.tabs = {};

    EqUI.tabs.methods = {
        init : function() {
            return this.each(function() {
                var $this = $(this);
                var $tab_class = 'eq-ui-tab';
                var $indicator_class = 'eq-ui-indicator';

                var $active, $content,
                $links = $this.find('li.'+$tab_class+' a'),
                $index = 0;

                // If the location.hash matches one of the links, use that as the active tab.
                $active = $($links.filter('[href="'+location.hash+'"]'));

                // If no match is found, use the first link or any with class 'active' as the initial active tab.
                if ($active.length === 0) {
                    $active = $(this).find('li.'+$tab_class+' a.active').first();
                }
                if ($active.length === 0) {
                    $active = $(this).find('li.'+$tab_class+' a').first();
                }

                // Set parent
                var $parent = $active.parent();

                // Set sizes
                var $tabs_width = $this.width();
                var $tab_width = $parent.innerWidth();
                var $tab_position = $parent.position();
                var $tab_left = $tab_position.left;
                var $tab_right = $tabs_width - ($tab_left + $tab_width);

                $active.addClass('active');
                $index = $links.index($active);
                if ($index < 0) {
                    $index = 0;
                }

                $content = $($active[0].hash);

                // append indicator then set indicator width to tab width
                $this.append('<div class="'+$indicator_class+'"></div>');
                var $indicator = $this.find('.'+$indicator_class);
                if ($this.is(":visible")) {
                    $indicator.css({"right": $tab_right});
                    $indicator.css({"left": $tab_left});
                    $indicator.css({"width": $tab_width});
                }

                // Resize
                $(window).resize(function () {
                    // Update sizes
                    $tabs_width = $this.width();
                    $tab_width = $parent.innerWidth();
                    $tab_position = $parent.position();
                    $tab_left = $tab_position.left;
                    $tab_right = $tabs_width - ($tab_left + $tab_width);

                    if ($index < 0) {
                        $index = 0;
                    }
                    if ($tab_width !== 0 && $tabs_width !== 0) {
                        $indicator.css({"right": $tab_right});
                        $indicator.css({"left": $tab_left});
                        $indicator.css({"width": $tab_width});
                    }
                });

                // Hide the remaining content
                $links.not($active).each(function () {
                    $(this.hash).hide();
                });

                // Bind the click event handler
                $this.on('click', 'a', function(e) {
                    $parent = $(this).parent();

                    if ($parent.hasClass('disabled')) {
                        e.preventDefault();
                        return;
                    }

                    // Update sizes
                    $tabs_width = $this.width();
                    $tab_width = $parent.innerWidth();
                    $tab_position = $parent.position();
                    $tab_left = $tab_position.left;
                    $tab_right = $tabs_width - ($tab_left + $tab_width);

                    // Make the old tab inactive.
                    $active.removeClass('active');
                    $content.hide();

                    // Update the variables with the new link and content
                    $active = $(this);
                    $content = $(this.hash);
                    $links = $this.find('li.'+$tab_class+' a');

                    // Make the tab active.
                    $active.addClass('active');
                    var $prev_index = $index;
                    $index = $links.index($(this));
                    if ($index < 0) {
                        $index = 0;
                    }

                    // Show and event
                    $content.show(0,function(){
                        $(this).trigger('isShow');
                    });

                    // Update indicator
                    if (($index - $prev_index) >= 0) {
                        $indicator.velocity({"right": $tab_right}, { duration: 300, queue: false, easing: 'easeOutQuad'});
                        $indicator.velocity({"left": $tab_left}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
                        $indicator.velocity({"width": $tab_width});
                    }
                    else {
                        $indicator.velocity({"left": $tab_left}, { duration: 300, queue: false, easing: 'easeOutQuad'});
                        $indicator.velocity({"right": $tab_right}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
                        $indicator.velocity({"width": $tab_width});
                    }

                    // Prevent the anchor's default click action
                    if($content.length > 0){
                        e.preventDefault();
                    }
                });

            });

        },
        select_tab : function( id ) {
            this.find('a[href="#' + id + '"]').trigger('click');
        }
    };

    $.fn.tabs = function(methodOrOptions) {
        if ( EqUI.tabs.methods[methodOrOptions] ) {
            return EqUI.tabs.methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return EqUI.tabs.methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tabs' );
        }
    };

    // Init
    EqUI.tabs.init = function() {

    };

    // Update
    EqUI.tabs.update = function() {
        
    };

    // Load
    EqUI.tabs.load = function() {
        $('ul.eq-ui-tabs').tabs();
    };

    // Ready
    $(document).ready(function() {
        // Init
        EqUI.tabs.init();

        // Update
        EqUI.tabs.update();
    });

}( jQuery ));