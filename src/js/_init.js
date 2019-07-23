(function ($) {
  EqUI.init = {};
  var _this = function(){return EqUI.init;}();
  _this.Waves = Waves;
  _this.WavesIsInit = false;

  // Update
  _this.update = function() {
      EqUI.app_bar.update();
      EqUI.side_nav.update();
      EqUI.breadcrumb.update();
      EqUI.table.update();
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

  // Init
  _this.init = function() {
    // ...
  };

  // READY & OBSERVE
  if (EqUI.mutationObserver === null) {
    _this.init = function() {
      // Init Waves
      if(!_this.WavesIsInit){ EqUI.init.Waves.init(); _this.WavesIsInit=true; }
      EqUI.init.Waves.attach('.eq-ui-waves', ['waves-effect']);
      EqUI.init.Waves.attach('.eq-ui-waves-light', ['waves-effect', 'waves-light']);
    };
  } else {
    // .EqUIObserve(selector, onAdded, onRemoved)
    $(document).EqUIObserve('.eq-ui-waves', function () {
      if(!_this.WavesIsInit){ EqUI.init.Waves.init(); _this.WavesIsInit=true; }
      EqUI.init.Waves.attach(this, ['waves-effect']);
    }, function () {
      EqUI.init.Waves.calm(this);
    })
    $(document).EqUIObserve('.eq-ui-waves-light', function () {
      if(!_this.WavesIsInit){ EqUI.init.Waves.init(); _this.WavesIsInit=true; }
      EqUI.init.Waves.attach(this, ['waves-effect', 'waves-light']);
    }, function () {
      EqUI.init.Waves.calm(this);
    })
  }

	$(document).ready(function() {

	  // Init
	  _this.init();

		// Resize
		$(window).resize( function() {
      // Update
      _this.update();
		});

		// Load complete
    $(window).on('load', function() {
      // Update
      _this.load();
		});

	});
}( jQuery ));
