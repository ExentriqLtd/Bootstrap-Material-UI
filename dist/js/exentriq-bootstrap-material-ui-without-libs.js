EqUI = {};

// Unique ID
EqUI.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

EqUI.elementOrParentIsFixed = function(element) {
    var $element = $(element);
    var $checkElements = $element.add($element.parents());
    var isFixed = false;
    $checkElements.each(function(){
        if ($(this).css("position") === "fixed") {
            isFixed = true;
            return false;
        }
    });
    return isFixed;
};

// Velocity has conflicts when loaded with jQuery, this will check for it
var Vel;
if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity;
}

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
        EqUI.site.set_checkbox_indeterminate();

        // Active js table
        EqUI.site.table_js();

        // Dismissable list
        EqUI.site.dismissableList();

        // Search
        EqUI.site.search('.eq-ui-search');

        // Search Top
        EqUI.site.search_top('.eq-ui-top-search');

        // Search Expandable
        EqUI.site.search_expandable('.eq-ui-search-expandable');
    };

    // Update
    EqUI.site.update = function() {

        var _layout_header_offset = 0;
        var _layout_header = $('.eq-ui-layout-header');
        var _layout_header_primary = $('.eq-ui-layout-header-primary');

        // Is header primary visible
        if(_layout_header_primary.length){
            _layout_header_offset = _layout_header_primary.outerHeight(true);
            if(_layout_header_offset > 0){ _layout_header_offset = _layout_header_offset-1; }
            $('.eq-ui-side-nav').css('top', _layout_header_offset+'px');
        } else {
            $('.eq-ui-side-nav').css('top', '0px');
        }

        // Is header fixed layout
        if(EqUI.site.body.hasClass('eq-ui-layout-header-fixed')){
            _layout_header.css('top', _layout_header_offset+'px');
            EqUI.site.body.css('margin-top', _layout_header.outerHeight(true)+_layout_header_offset+'px');
        } else {
            _layout_header.css('top', '0px');
            EqUI.site.body.css('margin-top', _layout_header_offset+'px');
        }
        
        if (window.innerWidth > 768) {
            
            
        }
        else {

            
        }
    };

    /* --------------------------------------- */
    /* Helps
    /* --------------------------------------- */

    // Set checkbox to indeterminate
    EqUI.site.set_checkbox_indeterminate = function() {
        $('[type="checkbox"].indeterminate-checkbox').each(function(index, element) {
            element.indeterminate = true;
        });
    };

    // Active js table
    EqUI.site.table_js = function() {

        // Select all checkboxes
        $('.eq-ui-data-table.eq-ui-data-table-js thead input[type="checkbox"]').click(function(e) {
            var _tbody = $(this).parents('table').children('tbody');
            var _is_checked = this.checked;

            _tbody.find('tr input[type="checkbox"]').each(function() {
                this.checked = _is_checked;

                var _parent = $(this).parent().parent();

                if(this.checked){
                    _parent.addClass('is-selected');
                } else {
                    _parent.removeClass('is-selected');
                }
            });
        });

        // Select checkbox
        $('.eq-ui-data-table.eq-ui-data-table-js tbody tr input[type="checkbox"]').click(function(e) {
            var _parent = $(this).parent().parent();

            if(this.checked){
                _parent.addClass('is-selected');
            } else {
                _parent.removeClass('is-selected');
            }
        });
    };

    // Get query string
    EqUI.site.query_string = function () {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                query_string[pair[0]] = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    // Toogle class
    EqUI.site.toogle_class = function(element,class_name) {
        if($(element).hasClass(class_name)){
            $(element).removeClass(class_name);
        } else  {
            $(element).addClass(class_name);
        }
    };

    /* --------------------------------------- */
    /* Search
    /* --------------------------------------- */

    EqUI.site.search = function(search_selector) {

        //----------------------
        // Search
        //----------------------
        var _serach_input_selector  = search_selector+' input';
        var _serach_action_clear_element  = $(search_selector+' .eq-ui-search-clear');

        // Add active when element has focus
        $(document).on('focus', _serach_input_selector, function () {
            var _element = $(this);
            var _element_parent = _element.parent();
            _element_parent.addClass('active');
        });

        // Remove active when element has out focus
        $(document).on('blur', _serach_input_selector, function () {
            var _element = $(this);
            var _element_parent = _element.parent();
            if (_element.val().length === 0) {
                _element_parent.removeClass('active');
            }
        });

        // Clear input search
        _serach_action_clear_element.on('click', function(e) {
            var _element = $(this);
            var _element_parent = _element.parent();
            _element_parent.removeClass('active');
            // Clear autocomplete
            if(_element_parent.find('autocomplete-suggestions')){
                _element_parent.find('input').autocomplete('hide');
            }
            _element_parent.find('input').val('');
        });
    };

    /* --------------------------------------- */
    /* Search Top
    /* --------------------------------------- */

    EqUI.site.search_top = function(search_selector) {

        var _top_serach_element  = $(search_selector);
        var _top_serach_action_close_element  = $(search_selector+' .eq-ui-top-search-close');
        var _top_serach_action_show_element  = $('.eq-ui-top-search-show');

        // Show top search
        _top_serach_action_show_element.on('click', function(e) {
            _top_serach_element.css('visibility', 'visible');
            _top_serach_element.css('top', '0');
        });

        // Close top search
        _top_serach_action_close_element.on('click', function(e) {
            var _element = $(this);
            var _element_parent = _element.parent();
            _top_serach_element.css('visibility', 'hidden');
            _top_serach_element.css('top', '-64px');

            // Clear search
            _element_parent.children('.eq-ui-search').removeClass('active');
            // Clear autocomplete
            if(_element_parent.find('autocomplete-suggestions')){
                _element_parent.children('.eq-ui-search').find('input').autocomplete('hide');
            }
            _element_parent.children('.eq-ui-search').find('input').val('');
        });
    };

    /* --------------------------------------- */
    /* Search Expandable
    /* --------------------------------------- */

    EqUI.site.search_expandable = function(search_selector) {

        var _serach_expandable_action_show_element = $(search_selector + ' .eq-ui-serach-expandable-show');

        // Show search expandable
        _serach_expandable_action_show_element.on('click', function(e) {
            var _element = $(this);
            var _element_parent = _element.parent();
            _element_parent.addClass('active');

            // Set focus
            _element_parent.find('input').focus();
        });
    };

    /* --------------------------------------- */
    /* Transitions
    /* --------------------------------------- */

    // Image fade
    EqUI.site.fadeInImage = function(selector) {
        var element = $(selector);
        element.css({opacity: 0});
        $(element).velocity({opacity: 1}, {
            duration: 650,
            queue: false,
            easing: 'easeOutSine'
        });
        $(element).velocity({opacity: 1}, {
            duration: 1300,
            queue: false,
            easing: 'swing',
            step: function(now, fx) {
                fx.start = 100;
                var grayscale_setting = now/100;
                var brightness_setting = 150 - (100 - now)/1.75;

                if (brightness_setting < 100) {
                    brightness_setting = 100;
                }
                if (now >= 0) {
                    $(this).css({
                        "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
                        "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
                    });
                }
            }
        });
    };

    // Horizontal staggered list
    EqUI.site.showStaggeredList = function(selector) {
        var time = 0;
        $(selector).find('li').velocity(
        { translateX: "-100px"},
        { duration: 0 });

        $(selector).find('li').each(function() {
            $(this).velocity(
            { opacity: "1", translateX: "0"},
            { duration: 800, delay: time, easing: [60, 10] });
            time += 120;
        });
    };

    // Dismissable list
    EqUI.site.dismissableList = function() {
        // Touch Event
        var swipeLeft = false;
        var swipeRight = false;

        $('.dismissable').each(function() {
            $(this).hammer({
                prevent_default: false
            }).bind('pan', function(e) {
                if (e.gesture.pointerType === "touch") {
                    var $this = $(this);
                    var direction = e.gesture.direction;
                    var x = e.gesture.deltaX;
                    var velocityX = e.gesture.velocityX;

                    $this.velocity({ translateX: x
                    }, {duration: 50, queue: false, easing: 'easeOutQuad'});

                    // Swipe Left
                    if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
                        swipeLeft = true;
                    }

                    // Swipe Right
                    if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
                        swipeRight = true;
                    }
                }
            }).bind('panend', function(e) {
                // Reset if collection is moved back into original position
                if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
                    swipeRight = false;
                    swipeLeft = false;
                }

                if (e.gesture.pointerType === "touch") {
                    var $this = $(this);
                    if (swipeLeft || swipeRight) {
                        var fullWidth;
                        if (swipeLeft) { fullWidth = $this.innerWidth(); }
                        else { fullWidth = -1 * $this.innerWidth(); }

                        $this.velocity({ translateX: fullWidth
                        }, {duration: 100, queue: false, easing: 'easeOutQuad', complete:
                        function() {
                            $this.css('border', 'none');
                            $this.velocity({ height: 0, padding: 0
                            }, {duration: 200, queue: false, easing: 'easeOutQuad', complete:
                            function() { $this.remove(); }
                            });
                        }
                        });
                    }
                    else {
                        $this.velocity({ translateX: 0
                        }, {duration: 100, queue: false, easing: 'easeOutQuad'});
                    }
                    swipeLeft = false;
                    swipeRight = false;
                }
            });

        });
    };

    $(document).ready(function() {
        // Init
        EqUI.site.init();

        // Update
        EqUI.site.update();
    });
}( jQuery ));

(function ($) {
    EqUI.app_bar = {};

    // Init
    EqUI.app_bar.init = function() {
        // Global vars
        EqUI.app_bar.element = $('.eq-ui-app-bar');
    };

    // Update
    EqUI.app_bar.update = function() {
        
        if (window.innerWidth > 768) {
            
            //...
        }
        else {

            //...
        }
    };

    $(document).ready(function() {
        // Init
        EqUI.app_bar.init();

        // Update
        EqUI.app_bar.update();
    });
}( jQuery ));

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

(function ($) {
    EqUI.breadcrumb = {};
    var _this = function(){return EqUI.breadcrumb;}();

    _this.breadcrumb_class = 'eq-ui-breadcrumb';
    _this.breadcrumb_min_class = 'eq-ui-breadcrumb-min';
    _this.breadcrumb_item_class = 'eq-ui-breadcrumb-item';
    _this.breadcrumb_item_truncate_class = 'eq-ui-breadcrumb-item-truncate';
    _this.breadcrumb_item_min_class = 'eq-ui-breadcrumb-item-min';
    _this.breadcrumb_item_hide_class = 'eq-ui-breadcrumb-item-hide';
    _this.last_children_hiden_old_width = 0;

    // Init
    _this.init = function() {
        // Render
        _this.render();

        // Detect resize
        $('#main-eq-ui-app-bar').on('elementResize', function(event) {
            // Render
            _this.render();
        });
    };

    // Update
    _this.update = function() {
        // Render
        _this.render();
    };

    // Load
    _this.load = function() {
        // Render
        _this.render();
    };

    // Render
    _this.render = function() {

        $('.'+_this.breadcrumb_class).each(function(){
            var origin = $(this);
            var origin_width = 0;
            var origin_parent = origin.parent();
            var origin_parent_width = 0;
            var siblings_width = 0;
            var _width_diff = 0;
            var offset_width = 4;
            var divider_width = 32;
            var only_one = origin.data('onlyOne') || false;

            // Update sizes
            function updateSizes(){
                origin_width = origin.innerWidth();
                origin_parent_width = origin_parent.width();
                siblings_width = 0;

                // Get siblings
                origin.siblings().each(function(){
                    var _sibling = $(this);
                    if(_sibling.css('position') !== 'absolute' && _sibling.css('display') !== 'none'){
                        siblings_width += _sibling.innerWidth();
                    }
                });

                _width_diff = origin_parent_width - (origin_width + siblings_width + offset_width);

                // Set max-width
                var origin_new_width = origin_parent_width - (siblings_width);
                origin.css({"max-width": origin_new_width+'px'});

            }
            updateSizes();

            // Update children
            var origin_children = [];
            var origin_children_hiden = [];
            function updateChildren(){
                // Get children
                origin_children = origin.children('.'+_this.breadcrumb_item_class+':not(.'+_this.breadcrumb_item_hide_class+')');
                origin_children_hiden = origin.children('.'+_this.breadcrumb_item_class+'.'+_this.breadcrumb_item_hide_class);

                // Is last
                var _last_children;
                var _last_children_hiden;
                if(origin_children.length === 1 && origin_children_hiden.length > 0){
                    _last_children = $(origin_children[0]);
                    _last_children_hiden = $(origin_children_hiden[origin_children_hiden.length-1]);
                    origin.addClass(_this.breadcrumb_min_class);
                    // Save old last children hiden width
                    if(_this.last_children_hiden_old_width === 0){
                        _this.last_children_hiden_old_width = _last_children_hiden.innerWidth();
                    }
                    _last_children_hiden.addClass(_this.breadcrumb_item_min_class);
                } else if(origin_children.length === 1 && origin_children_hiden.length === 0) {
                    _last_children = $(origin_children[0]);
                    _last_children.addClass(_this.breadcrumb_item_truncate_class);
                } else {
                    origin.removeClass(_this.breadcrumb_min_class);
                    origin.children().removeClass(_this.breadcrumb_item_min_class);
                    origin.children().removeClass(_this.breadcrumb_item_truncate_class);
                    _this.last_children_hiden_old_width = 0;
                }
            }
            updateChildren();

            // Update elements
            function updateElements(){
                // Hide children
                if(_width_diff < 1){
                    // Hide
                    if(origin_children.length > 1){

                        if(only_one){ // Only one
                            _this.last_children_hiden_old_width = 0;
                            origin_children.each(function(i){
                                var _origin_children = $(this);
                                if((origin_children.length-1) !== i){
                                    _this.last_children_hiden_old_width += _origin_children.innerWidth() + divider_width;
                                    _origin_children.addClass(_this.breadcrumb_item_hide_class);
                                }
                            });
                        } else {
                            var _first_children = $(origin_children[0]);
                            _first_children.addClass(_this.breadcrumb_item_hide_class);

                            // Updates
                            updateSizes();
                            updateChildren();

                            if(origin_children.length > 1){updateElements();}
                        }
                    }

                } else { // Add children
                    // Add
                    if(origin_children_hiden.length) {

                        // Only one
                        if(only_one && _width_diff > (_this.last_children_hiden_old_width + offset_width)){ // Only one
                            _this.last_children_hiden_old_width = 0;
                            origin_children_hiden.each(function(i){
                                var _origin_children_hiden = $(this);
                                _origin_children_hiden.removeClass(_this.breadcrumb_item_hide_class);
                            });
                        } else {
                            var _last_children_hiden = $(origin_children_hiden[origin_children_hiden.length-1]);
                            var _last_children_hiden_width = _last_children_hiden.innerWidth();

                            // Is old width
                            _last_children_hiden_width = _this.last_children_hiden_old_width !== 0 ? _this.last_children_hiden_old_width:_last_children_hiden_width;

                            if(_width_diff > (_last_children_hiden_width + offset_width + divider_width)){
                                _last_children_hiden.removeClass(_this.breadcrumb_item_hide_class);

                                // Updates
                                updateSizes();
                                updateChildren();

                                if(origin_children_hiden.length){updateElements();}
                            }
                        }

                    }
                }

            }
            updateElements();

        });
    };

    // Ready
    $(document).ready(function() {
        // Init
        _this.init();

        // Update
        _this.update();
    });

}( jQuery ));
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
(function ($) {
    EqUI.cards = {};

    // Init
    EqUI.cards.init = function() {

    };

    // Update
    EqUI.cards.update = function() {
        
    };

    $(document).ready(function() {
        // Init
        EqUI.cards.init();

        // Update
        EqUI.cards.update();
    });
}( jQuery ));
(function ($) {
    EqUI.forms = {};

    EqUI.forms.validateLib = 'parsley'; // parsley | html5 | custom

    // Init
    EqUI.forms.init = function() {
        // Global vars
        EqUI.forms.element = $('.btn');
        EqUI.forms.select_selector = '.eq-ui-select';
        EqUI.forms.input_selector = 'input.eq-ui-input[type=text], input.eq-ui-input[type=password], input.eq-ui-input[type=email], input.eq-ui-input[type=url], input.eq-ui-input[type=tel], input.eq-ui-input[type=number], input.eq-ui-input[type=search], textarea.eq-ui-textarea';

        // Update Labels
        $(EqUI.forms.input_selector).each(function(index, element) {
            if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
                $(this).siblings('label, i').addClass('active');
            }
            else {
                $(this).siblings('label, i').removeClass('active');
            }
        });

        // Handle HTML5 autofocus
        $('input[autofocus]').siblings('label, i').addClass('active');

        // Add active if form auto complete
        $(document).on('change', EqUI.forms.input_selector, function () {
            if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
                $(this).siblings('label, i').addClass('active');
            }
            EqUI.forms.validate_field($(this));
        });

        // HTML DOM FORM RESET handling
        $(document).on('reset', function(e) {
            var formReset = $(e.target);
            if (formReset.is('form')) {
                formReset.find(EqUI.forms.input_selector).removeClass('valid').removeClass('invalid');
                formReset.find(EqUI.forms.input_selector).each(function () {
                    if ($(this).attr('value') === '') {
                        $(this).siblings('label, i').removeClass('active');
                    }
                });

                // Reset select
                formReset.find('select.initialized').each(function () {
                    var reset_text = formReset.find('option[selected]').text();
                    formReset.siblings('input.select-dropdown').val(reset_text);
                });
            }
        });

        // Add active when element has focus
        $(document).on('focus', EqUI.forms.input_selector, function () {
            $(this).siblings('label, i').addClass('active');
        });

        $(document).on('blur', EqUI.forms.input_selector, function () {
            var $inputElement = $(this);
            if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
                $inputElement.siblings('label, i').removeClass('active');
            }
            EqUI.forms.validate_field($inputElement);
        });

        // Textarea auto size
        autosize($('textarea.eq-ui-textarea'));

        // Is parsley
        if(EqUI.forms.validateLib === 'parsley'){
            Parsley.options.noFocus = true;
            Parsley.options.errorsMessagesDisabled = false;
            Parsley.options.successClass = 'valid';
            Parsley.options.errorClass = 'invalid';
        }

        // Setting Dropzone Globals
        if(Dropzone){
            Dropzone.autoDiscover = false;
        }

        // Init file inputs
        EqUI.forms.file_input('.eq-ui-input-file');

        // Init select
        $(EqUI.forms.select_selector).eq_select();
    };

    // Update
    EqUI.forms.update = function() {

    };

    // Add form for validate on submit
    EqUI.forms.add_form_for_submit_validate = function(object) {

        // Validate using a parsley lib
        if (EqUI.forms.validateLib === 'parsley') {
            return object.parsley();
        }

        return null;
    };

    // Validate form
    EqUI.forms.validate_form = function(object) {

        // Validate using a parsley lib
        if (EqUI.forms.validateLib === 'parsley') {
            var instance = object.parsley();
            return instance.validate();
        }

        return null;
    };

    // Validate
    EqUI.forms.validate_field = function(object) {

        // Validate using a parsley lib
        if (EqUI.forms.validateLib === 'parsley') {
            return EqUI.forms.validate_field_parsley(object);
        }

        // Validate using a html5
        if (EqUI.forms.validateLib === 'html5') {
            return EqUI.forms.validate_field_html5(object);
        }

        return null;
    };

    // Validate using a parsley lib (http://parsleyjs.org/)
    EqUI.forms.validate_field_parsley = function(object) {
        var instance = object.parsley();
        return instance.validate();
    };

    // Validate using a HTML5
    EqUI.forms.validate_field_html5 = function(object) {
        var hasLength = object.attr('length') !== undefined;
        var lenAttr = parseInt(object.attr('length'));
        var len = object.val().length;

        if (object.val().length === 0 && object[0].validity.badInput === false) {
            if (object.hasClass('validate')) {
                object.removeClass('valid');
                object.removeClass('invalid');
            }
        }
        else {
            if (object.hasClass('validate')) {
                // Check for character counter attributes
                if ((object.is(':valid') && hasLength && (len < lenAttr)) || (object.is(':valid') && !hasLength)) {
                    object.removeClass('invalid');
                    object.addClass('valid');
                    return true;
                }
                else {
                    object.removeClass('valid');
                    object.addClass('invalid');
                    return false;
                }
            }
        }

        return null;
    };

    // File upload drop, using a dropzone lib (http://www.dropzonejs.com/)
    EqUI.forms.file_upload_drop = function(object, options) {
        var _object = $(object);
        if(!_object.length){
            return false;
        }

        // Defaults
        var defaults = {
            previewTemplate: '',
            defaultImageThumbnail: ""
        };
        var _options = $.extend({}, defaults, options);

        // Default template
        if(_options.previewTemplate === ''){
            _options.previewTemplate = '' +
            '<li class="eq-ui-list-item eq-ui-list-avatar eq-ui-list-secondary-content eq-ui-list-truncate">'+
            '   <img class="circle" src="'+_options.defaultImageThumbnail+'" data-dz-thumbnail>'+
            '   <div class="eq-ui-list-body">'+
            '       <h6 class="eq-ui-list-title"><span data-dz-name></span></h6>'+
            '       <span data-dz-size></span><span class="eq-ui-file-upload-drop-zone-error-message truncate" data-dz-errormessage></span>'+
            '       <div class="eq-ui-progress">'+
            '           <div class="eq-ui-determinate" data-dz-uploadprogress></div>'+
            '       </div>'+
            '   </div>'+
            '<a class="eq-ui-list-secondary-content-body active eq-ui-file-upload-drop-zone-success"><i class="mdi mdi-check eq-ui-icon eq-ui-icon-24"></i></a>'+
            '<a class="eq-ui-list-secondary-content-body active eq-ui-file-upload-drop-zone-error"><i class="mdi mdi-close eq-ui-icon eq-ui-icon-24"></i></a>'+
            '</li>';
        }

        var _dropzone = new Dropzone(object, _options);

        return _dropzone;
    };

    // Init file input
    EqUI.forms.file_input = function(object_class) {

        // Trigger - Image preview
        $(object_class+' input[type=file]').each(function(){
            var img_preview = $("#"+ $(this).attr('data-img-preview'));
            if(img_preview.length){
                var _parent = $(this).closest('.eq-ui-input-file');
                var file_input = _parent.find('input[type=file]');
                img_preview.on('click', function() {
                    file_input.trigger('click');
                });
            }
        });

        // Trigger
        $(object_class+' input[type=text]').on('click', function() {
            var _parent = $(this).closest('.eq-ui-input-file');
            var file_input = _parent.find('input[type=file]');
            file_input.trigger('click');
        });

        // On Change
        $(object_class+' input[type=file]').on('change', function() {
            var _parent = $(this).closest('.eq-ui-input-file');
            var path_input = _parent.find('input[type=text]');
            var files = $(this)[0].files;
            var file_names = [];
            var file_images = [];
            for (var i = 0; i < files.length; i++) {
                file_names.push(files[i].name);

                // Only add image files.
                if (files[i].type.match('image.*')) {
                    file_images.push(files[i]);
                }
            }
            path_input.val(file_names.join(", "));
            path_input.trigger('change');

            // Image preview
            var img_preview = $("#"+ $(this).attr('data-img-preview'));
            if(img_preview.length){
                for (var ii = 0; ii < file_images.length; ii++) {
                    EqUI.forms.img_preview_file_read(file_images[ii],img_preview);
                }
            }
        });
    };

    // Img preview file read
    EqUI.forms.img_preview_file_read = function(file, img_preview) {
        if(!window.FileReader){
            return false;
        }

        var img_preview_img = img_preview.find('img');
        var img_preview_loading = img_preview.find('.img-preview-loading');
        var img_preview_text_loading = $(this).attr('data-img-preview-text-loading') || 'Loading...';

        // Loading text
        if(img_preview_loading.length){
            img_preview_loading.html(img_preview_text_loading);
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                img_preview_img.attr("src", e.target.result);

                // Loading text
                if(img_preview_loading.length){
                    img_preview_loading.html(escape(theFile.name));
                }
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    };

    // Select
    $.fn.eq_select = function (callback) {
        $(this).each(function() {
            var select = $(this);
            var select_id = $(this).attr('id') || '';
            var input_id = select_id + '-fake';
            var valuesSelected = [];
            var is_multiple = select.attr('multiple') ? true : false;
            var last_ID = select.attr('data-select-id');
            var label = '';

            // If exist, rebuild
            if (last_ID) {
                select.parent().find('span.eq-ui-caret').remove();
                select.parent().find('input').remove();

                select.unwrap();
                $('ul#dropdown-'+last_ID).remove();
            }

            // If destroying the select, remove the select-id and reset it to it's uninitialized state.
            if(callback === 'destroy') {
                select.attr('data-select-id', null).removeClass('initialized');
                select.attr('data-parsley-class-handler', null);
                return;
            }

            // Set ID
            var unique_ID = EqUI.guid();
            select.attr('data-select-id', unique_ID);
            var select_options = select.children('option');

            // Set class handler for parsley
            if(EqUI.forms.validateLib === 'parsley'){
                select.attr('data-parsley-class-handler', '#'+select_id+'-fake');
            }

            // Get msg text's
            var label_text_error = select.parent().find('label').attr('data-error') || '';
            var label_text_success = select.parent().find('label').attr('data-success') || '';

            // Get label
            if (select.find('option:selected').length > 0) {
                label = select.find('option:selected');
                if(is_multiple && !label.is(':disabled')){
                    label.each(function (i) {
                        label = build_values_selected_from_multiple(valuesSelected, $(this).index(), select);
                    });
                } else {
                    label = label.html();
                }
            } else {
                label = select_options.first().html();
            }

            // Wrapper
            var wrapper = $('<div class="eq-ui-select-wrapper"></div>');
            select.wrap(wrapper);

            // Add extra elements
            var dropdown_icon = $('<span class="eq-ui-caret"></span>');
            if (select.is(':disabled')){ dropdown_icon.addClass('disabled'); }
            var sanitizedLabelHtml = label && label.replace(/"/g, '&quot;');
            var select_fake = $('' +
            '<input id="'+input_id+'" data-target="dropdown-'+unique_ID+'" type="text" class="eq-ui-input eq-ui-select-fake eq-ui-select-input-'+unique_ID+'" readonly="true" ' + ((select.is(':disabled')) ? 'disabled' : '') + ' value="'+ sanitizedLabelHtml +'"/>' +
            '<span class="eq-ui-select-fake-msg-error">'+label_text_error+'</span>' +
            '<span class="eq-ui-select-fake-msg-success">'+label_text_success+'</span>'
            );

            select.before(select_fake);

            // Dropdown
            var select_dropdown = $('<ul id="dropdown-'+unique_ID+'" class="eq-ui-dropdown"></ul>');

            // Render option
            var append_option = function(select, option) {
                var disabled_class = (option.is(':disabled')) ? 'disabled ' : '';
                var slected_class = (option.is(':selected')) ? 'active' : '';

                select_dropdown.append($('' +
                '<li class="' + disabled_class + '">' +
                '<a ' + (is_multiple ? 'data-target="fake"' : '') + ' class="truncate ' + slected_class + '">' +
                '<i class="mdi mdi-check icon eq-ui-select-icon"></i> <span>' + option.html() + '</span>' +
                '</a></li>'));
            };

            // Create dropdown structure
            if (select_options.length) {
                select_options.each(function () {
                    append_option(select, $(this));
                });
            }

            // Add dropdown
            select.before(select_dropdown);
            select.before(dropdown_icon);

            // Init dropdown
            $('.eq-ui-select-input-'+unique_ID).dropdown({
                inDuration: 300,
                outDuration: 225,
                hover: false,
                gutter: -62,
                belowOrigin: false,
                close: false
            });

            // Add select dropdown events
            select_dropdown.find('li').each(function (i) {
                var curr_select = select;
                $(this).click(function (e) {
                    var element = $(e.target);

                    if (is_multiple) {
                        element.toggleClass('active');
                        build_values_selected_from_multiple(valuesSelected, $(this).index(), curr_select);
                        curr_select.find('option:disabled').eq(0).prop('selected', false);
                        select_dropdown.find('li a').eq(0).removeClass('active');
                    } else {
                        select_dropdown.find('li a').removeClass('active');
                        element.toggleClass('active');
                        curr_select.siblings('input.eq-ui-select-fake').val(element.find('span').text());
                    }

                    curr_select.find('option').eq(i).prop('selected', element.hasClass('active'));
                    curr_select.trigger('change');
                });
            });

            // Set initialized
            select.addClass('initialized');
        });

        function build_values_selected_from_multiple(entriesArray, entryIndex, select) {
            var index = entriesArray.indexOf(entryIndex);

            if (index === -1) {
                entriesArray.push(entryIndex);
            } else {
                entriesArray.splice(index, 1);
            }

            return set_input_from_multiple(entriesArray, select);
        }

        function set_input_from_multiple(entriesArray, select) {
            var value = '';

            for (var i = 0, count = entriesArray.length; i < count; i++) {
                var text = select.find('option').eq(entriesArray[i]).text();

                if(i === 0){
                    value += text;
                } else {
                    value += ', ' + text;
                }
            }

            if (value === '') {
                value = select.find('option:disabled').eq(0).text();
            }

            select.siblings('input.eq-ui-select-fake').val(value);

            return value;
        }
    };

    $(document).ready(function() {
        // Init
        EqUI.forms.init();

        // Update
        EqUI.forms.update();
    });
}( jQuery ));
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

        // Init
        EqUI.collapsible.element.eq_collapsible();

    };

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
(function ($) {
    EqUI.modals = {};

    EqUI.modals.element = $('.eq-ui-modal');
    EqUI.modals.action_close_selector = '.eq-ui-modal-close';
    EqUI.modals.overlay_selector = '.eq-ui-modal-overlay';
    EqUI.modals.overlay_class = 'eq-ui-modal-overlay';
    EqUI.modals.top_sheet_class = 'eq-ui-modal-top-sheet';
    EqUI.modals.bottom_sheet_class = 'eq-ui-modal-bottom-sheet';
    EqUI.modals.left_sheet_class = 'eq-ui-modal-left-sheet';
    EqUI.modals.right_sheet_class = 'eq-ui-modal-right-sheet';
    EqUI.modals.full_sheet_class = 'eq-ui-modal-full-sheet';

    EqUI.modals.stack = 0;
    EqUI.modals.last_id = 0;

    EqUI.modals.generate_id = function() {
        EqUI.modals.last_id++;
        return 'eq-ui-modal-overlay-' + EqUI.modals.last_id;
    };

    // Open Modal
    $.fn.extend({
        openModal: function(options) {

            EqUI.site.body.css('overflow', 'hidden');

            var defaults = {
                opacity: 0.5,
                in_duration: 350,
                out_duration: 250,
                ready: undefined,
                complete: undefined,
                dismissible: true,
                starting_top: '4%'
            },
            overlayID = EqUI.modals.generate_id(),
            $modal = $(this),
            $overlay = $('<div class="'+EqUI.modals.overlay_class+'"></div>'),
            lStack = (++EqUI.modals.stack);

            // Store a reference of the overlay
            $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
            $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);

            EqUI.site.body.append($overlay);

            // Override defaults
            options = $.extend(defaults, options);

            if (options.dismissible) {
                $overlay.click(function() {
                    $modal.closeModal(options);
                });
                // Return on ESC
                $(document).on('keyup.leanModal' + overlayID, function(e) {
                    if (e.keyCode === 27) {   // ESC key
                        $modal.closeModal(options);
                    }
                });
            }

            $modal.find(EqUI.modals.action_close_selector).on('click.close', function(e) {
                $modal.closeModal(options);
            });

            $overlay.css({ display : "block", opacity : 0 });

            $modal.css({
                display : "block",
                opacity: 0
            });

            $overlay.velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});
            $modal.data('associated-overlay', $overlay[0]);

            // Top and Full Sheet
            if ($modal.hasClass(EqUI.modals.top_sheet_class) || $modal.hasClass(EqUI.modals.full_sheet_class)) {
                $modal.velocity({top: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Bottom Sheet
            else if ($modal.hasClass(EqUI.modals.bottom_sheet_class)) {
                $modal.velocity({bottom: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Left Sheet
            else if ($modal.hasClass(EqUI.modals.left_sheet_class)) {
                $modal.velocity({left: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Right Sheet
            else if ($modal.hasClass(EqUI.modals.right_sheet_class)) {
                $modal.velocity({right: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Normal
            else {
                $.Velocity.hook($modal, "scaleX", 0.7);
                $modal.css({ top: options.starting_top });
                $modal.velocity({top: "10%", opacity: 1, scaleX: '1'}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            }


        }
    });

    // Close Modal
    $.fn.extend({
        closeModal: function(options) {
            var defaults = {
                out_duration: 250,
                complete: undefined
            },
            $modal = $(this),
            overlayID = $modal.data('overlay-id'),
            $overlay = $('#' + overlayID);

            options = $.extend(defaults, options);

            // Disable scrolling
            $('body').css('overflow', '');

            $modal.find(EqUI.modals.action_close_selector).off('click.close');
            $(document).off('keyup.leanModal' + overlayID);

            $overlay.velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});


            // Top and Full Sheet
            if ($modal.hasClass(EqUI.modals.top_sheet_class) || $modal.hasClass(EqUI.modals.full_sheet_class)) {
                $modal.velocity({top: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Bottom Sheet
            else if ($modal.hasClass(EqUI.modals.bottom_sheet_class)) {
                $modal.velocity({bottom: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Left Sheet
            else if ($modal.hasClass(EqUI.modals.left_sheet_class)) {
                $modal.velocity({left: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Right Sheet
            else if ($modal.hasClass(EqUI.modals.right_sheet_class)) {
                $modal.velocity({right: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Normal
            else {
                $modal.velocity(
                { top: options.starting_top, opacity: 0, scaleX: 0.7}, {
                    duration: options.out_duration,
                    complete:
                    function() {

                        $(this).css('display', 'none');
                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                }
                );
            }
        }
    });

    // Lean Modal
    $.fn.extend({
        leanModal: function(option) {
            return this.each(function() {

                var defaults = {
                    starting_top: '4%'
                },
                // Override defaults
                options = $.extend(defaults, option);

                // Close Handlers
                $(this).click(function(e) {
                    options.starting_top = ($(this).offset().top - $(window).scrollTop()) /1.15;
                    var modal_id = $(this).attr("href") || '#' + $(this).data('target');
                    $(modal_id).openModal(options);
                    e.preventDefault();
                }); // done set on click
            }); // done return
        }
    });

    // Init
    EqUI.modals.init = function() {

    };

    // Update
    EqUI.modals.update = function() {
        
    };

    $(document).ready(function() {
        // Init
        EqUI.modals.init();

        // Update
        EqUI.modals.update();
    });
}( jQuery ));
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
                    }
                    else {
                        $indicator.velocity({"left": $tab_left}, { duration: 300, queue: false, easing: 'easeOutQuad'});
                        $indicator.velocity({"right": $tab_right}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
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
(function ($) {
    EqUI.init = {};
    var _this = function(){return EqUI.init;}();

    // Update
    _this.update = function() {
        EqUI.app_bar.update();
        EqUI.side_nav.update();
        EqUI.breadcrumb.update();

        EqUI.buttons.update();
        EqUI.cards.update();
        EqUI.forms.update();
        EqUI.collapsible.update();
        EqUI.dropdown.update();
        EqUI.modals.update();
        EqUI.tabs.update();

        EqUI.site.update();
    };

    // Load
    _this.load = function() {
        // Site update
        EqUI.site.update();

        // Show body
        EqUI.site.body.css('visibility', 'visible');

        // Loads
        EqUI.breadcrumb.load();
        EqUI.dropdown.load();
        EqUI.tabs.load();
    };

	$(document).ready(function() {

		// Init Waves
        Waves.init();
        Waves.attach('.eq-ui-waves', ['waves-effect']);
        Waves.attach('.eq-ui-waves-light', ['waves-effect', 'waves-light']);

		// Resize
		$(window).resize( function() {
            // Update
            _this.update();
		});

		// Load complete
		$(window).load(function(){
            // Update
            _this.load();
	    });
	    
	});
}( jQuery ));
//# sourceMappingURL=exentriq-bootstrap-material-ui-without-libs.js.map