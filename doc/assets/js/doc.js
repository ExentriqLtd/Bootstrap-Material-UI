(function ($) {
    var EqUIDoc = {};
    EqUIDoc.site = {};

    // Init
    EqUIDoc.site.init = function() {

        // Set active path in side bar menu
        if(_doc_route.root_path !== "" && _doc_route.path !== ""){
            $('#collapsible-nav-'+_doc_route.root_path).collapse('show');
            $('#collapsible-nav-'+_doc_route.root_path+'-'+_doc_route.path).addClass("active");

        } else if(_doc_route.path !== "") {
            $('#collapsible-nav-'+_doc_route.path).addClass("active");
        }

        // Set title in app bar
        var _title_app_bar = $('#main-eq-ui-app-bar').find('.header-title');
        if(_doc_route.name_section !== "" && _doc_route.name_chapter !== ""){
            _title_app_bar.html('<span class="section-title">'+_doc_route.name_section+'</span>'+
                '<i class="material-icons icon icon-left icon-24">keyboard_arrow_right</i>'+
                '<span class="chapter-title">'+_doc_route.name_chapter+'</span>');
        } else if(_doc_route.name_chapter !== "") {
            _title_app_bar.html('<span class="section-title">'+_doc_route.name_chapter+'</span>');
        }
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