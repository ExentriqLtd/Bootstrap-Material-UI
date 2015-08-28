(function ($) {
    EqUI.collapsible = {};

    EqUI.collapsible.element = $('.eq-ui-collapsible');

    // Init
    EqUI.collapsible.init = function() {
        EqUI.collapsible.element.on('show.bs.collapse', function (event) {
            var _element = $(event.target.parentElement);
            _element.addClass("active");
            _element.children('.panel-heading').find('a').addClass("active");
        });
        EqUI.collapsible.element.on('hide.bs.collapse', function (event) {
            var _element = $(event.target.parentElement);
            _element.removeClass("active");
            _element.children('.panel-heading').find('a').removeClass("active");
        });
        
        // Expandable
        $('.eq-ui-collapsible.expandable .collapse').collapse({
            toggle: false
        });
    };

    // Update
    EqUI.collapsible.update = function() {
        
    };

    // Collapsible Toggle
    EqUI.collapsible.toggle = function() {
        // TODO EXENTRIQ
    };

    $(document).ready(function() {
        // Init
        EqUI.collapsible.init();

        // Update
        EqUI.collapsible.update();
    });
}( jQuery ));