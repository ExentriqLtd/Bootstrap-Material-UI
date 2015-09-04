(function ($) {
	$(document).ready(function() {

		// Init Waves
        Waves.init();
        Waves.attach('.eq-ui-waves', ['waves-effect']);
        Waves.attach('.eq-ui-waves-light', ['waves-effect', 'waves-light']);

		// Resize
		$(window).resize( function() {
			
			EqUI.app_bar.update();
			EqUI.side_nav.update();

			EqUI.buttons.update();
			EqUI.collapsible.update();
			
			EqUI.site.update();

		});

		// Load complete
		$(window).load(function(){ 
	        // Site update
	        EqUI.site.update();

	        // Show body
			$('body').css('visibility', 'visible');
	    });
	    
	});
}( jQuery ));