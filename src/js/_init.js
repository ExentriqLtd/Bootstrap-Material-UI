(function ($) {
	$(document).ready(function() {

		// Init Waves
        Waves.init();
        //Waves.attach('.btn', ['waves-effect', 'waves-light']);

		// Resize
		$(window).resize( function() {
			
			EqUI.app_bar.update();
			EqUI.side_nav.update();
			
			EqUI.site.update();

		});

	});
}( jQuery ));