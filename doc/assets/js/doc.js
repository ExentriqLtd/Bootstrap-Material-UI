(function ($) {
    var EqUIDoc = {};
    EqUIDoc.site = {};

    // Init
    EqUIDoc.site.init = function() {

        // Set active path in side bar menu
        if(_doc_route.root_path !== "" && _doc_route.path !== ""){
            var _root_path = $('#collapsible-nav-'+_doc_route.root_path);
            var _root_path_path = $('#collapsible-nav-'+_doc_route.root_path+'-'+_doc_route.path);

            // Set active for links
            _root_path.addClass("active");
            _root_path_path.addClass("active");

            // Set for open collapsible item
            _root_path.parent().addClass("active");

        } else if(_doc_route.path !== "") {
            var _path = $('#collapsible-nav-'+_doc_route.path);

            // Set active for links
            _path.addClass("active");

            // Set for open collapsible item
            _path.parent().addClass("active");
        }

        // Set title in app bar
        var _title_app_bar = $('#main-eq-ui-app-bar').find('.header-title');
        if(_doc_route.name_section !== "" && _doc_route.name_chapter !== ""){
            _title_app_bar.html('<span class="section-title">'+_doc_route.name_section+'</span>'+
                '<i class="mdi mdi-chevron-right icon icon-left icon-24"></i>'+
                '<span class="chapter-title">'+_doc_route.name_chapter+'</span>');
        } else if(_doc_route.name_chapter !== "") {
            _title_app_bar.html('<span class="section-title">'+_doc_route.name_chapter+'</span>');
        }

        // Refresh all collapsibles
        $('.eq-ui-collapsible').eq_collapsible();

        // Init modals
        $('.eq-ui-modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            ready: function() { console.log('Modal Open'); }, // Callback for Modal open
            complete: function() { console.log('Modal Close'); } // Callback for Modal close
        });
    };

    // Update
    EqUIDoc.site.update = function() {
        if (window.innerWidth > 768) {
            
            
        }
        else {

            
        }
    };

    $(document).ready(function() {
        // Init
        EqUIDoc.site.init();

        // Update
        EqUIDoc.site.update();

        // Resize
        $(window).resize( function() {
            
            EqUIDoc.site.update();

        });
    });
}( jQuery ));