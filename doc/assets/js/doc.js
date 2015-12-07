var EqUIDoc = {};
(function ($) {
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

        // Form validations
        if(_doc_route.path === "form-validation"){
            EqUIDoc.site.form_validations();
        }

        // Build Git in Home
        if(_doc_route.path === "index"){
            EqUIDoc.site.build_git_home();
        }

        // Show layout structures
        if(_doc_route.path === "buttons"){
            EqUI.site.body.addClass('doc-show-in-layout-struture-1');
        }

        // When our page loads, check to see if it contains and anchor
        EqUIDoc.site.scroll_if_anchor(window.location.hash);
    };

    // Form validations
    EqUIDoc.site.form_validations = function() {

        // Validate form (Test 1)
        EqUI.forms.add_form_for_submit_validate($('#form-validation-test1'));
        $('#form-validation-test1-submit').on('click', function(e) {
            var result = EqUI.forms.validate_field($('#username-test1'));
            console.log(result);

            $('#form-validation-test1').submit();
        });
    };

    // Build Git in Home
    EqUIDoc.site.build_git_home = function() {

        var _download_in_git_hub = $('.download-in-git-hub');
        var _download_in_git_hub_href = $('.download-in-git-hub-href');
        if (_download_in_git_hub.length) {
            $.ajax({
                url: "https://api.github.com/repos/ExentriqLtd/Bootstrap-Material-UI/tags",
                dataType: "json",
                success: function (data) {
                    _download_in_git_hub.html('<i class="mdi mdi-download icon icon-right icon-18"></i> Download v.'+data[0].name).attr('href', data[0].zipball_url);
                    _download_in_git_hub_href.attr('href', data[0].zipball_url);
                }
            });
        }
        var _last_commit_in_git_hub = $('.last-commit-in-git-hub');
        if (_last_commit_in_git_hub.length) {
            $.ajax({
                url: "https://api.github.com/repos/ExentriqLtd/Bootstrap-Material-UI/commits/master",
                dataType: "json",
                success: function (data) {
                    var date = $.timeago(data.commit.author.date);
                    _last_commit_in_git_hub.html(date).attr('href', data.html_url);
                }
            });
        }
    };


    // Scroll if anchor
    EqUIDoc.site.scroll_if_anchor = function(href) {
        href = typeof(href) == "string" ? href : $(this).attr("href");
        var fromTop = 160;

        if(href.indexOf("#") == 0) {
            var $target = $(href);

            if($target.length) {
                $('html, body').animate({ scrollTop: $target.offset().top - fromTop }, 1000);
                if(history && "pushState" in history) {
                    history.pushState({}, document.title, window.location.pathname + href);
                    return false;
                }
            }
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