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