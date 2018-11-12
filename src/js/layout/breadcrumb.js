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
                    // _last_children = $(origin_children[0]);
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
