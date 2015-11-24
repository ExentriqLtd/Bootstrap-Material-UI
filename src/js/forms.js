(function ($) {
    EqUI.forms = {};

    EqUI.forms.validateLib = 'parsley'; // parsley | html5 | custom

    // Init
    EqUI.forms.init = function() {
        // Global vars
        EqUI.forms.element = $('.btn');
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

    $(document).ready(function() {
        // Init
        EqUI.forms.init();

        // Update
        EqUI.forms.update();
    });
}( jQuery ));