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
            } else {
                label = select_options.first();
            }

            // Wrapper
            var wrapper = $('<div class="eq-ui-select-wrapper"></div>');
            select.wrap(wrapper);

            // Add extra elements
            var dropdown_icon = $('<span class="eq-ui-caret"></span>');
            if (select.is(':disabled')){ dropdown_icon.addClass('disabled'); }
            var sanitizedLabelHtml = label.html() && label.html().replace(/"/g, '&quot;');
            var select_fake = $('' +
            '<input id="'+input_id+'" data-target="dropdown-'+unique_ID+'" type="text" class="eq-ui-input eq-ui-select-fake" readonly="true" ' + ((select.is(':disabled')) ? 'disabled' : '') + ' value="'+ sanitizedLabelHtml +'"/>' +
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
            $('.eq-ui-select-wrapper input').dropdown({
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

            set_input_from_multiple(entriesArray, select);
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
        }
    };

    $(document).ready(function() {
        // Init
        EqUI.forms.init();

        // Update
        EqUI.forms.update();
    });
}( jQuery ));