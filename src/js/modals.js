(function ($) {
    EqUI.modals = {};

    EqUI.modals.element = $('.eq-ui-modal');
    EqUI.modals.action_close_selector = '.eq-ui-modal-close';
    EqUI.modals.overlay_selector = '.eq-ui-modal-overlay';
    EqUI.modals.overlay_class = 'eq-ui-modal-overlay';
    EqUI.modals.top_sheet_class = 'eq-ui-modal-top-sheet';
    EqUI.modals.bottom_sheet_class = 'eq-ui-modal-bottom-sheet';
    EqUI.modals.left_sheet_class = 'eq-ui-modal-left-sheet';
    EqUI.modals.right_sheet_class = 'eq-ui-modal-right-sheet';
    EqUI.modals.full_sheet_class = 'eq-ui-modal-full-sheet';

    EqUI.modals.stack = 0;
    EqUI.modals.last_id = 0;

    EqUI.modals.generate_id = function() {
        EqUI.modals.last_id++;
        return 'eq-ui-modal-overlay-' + EqUI.modals.last_id;
    };

    // Open Modal
    $.fn.extend({
        openModal: function(options) {

            EqUI.site.body.css('overflow', 'hidden');

            var defaults = {
                opacity: 0.5,
                in_duration: 350,
                out_duration: 250,
                ready: undefined,
                complete: undefined,
                dismissible: true,
                starting_top: '4%'
            },
            overlayID = EqUI.modals.generate_id(),
            $modal = $(this),
            $overlay = $('<div class="'+EqUI.modals.overlay_class+'"></div>'),
            lStack = (++EqUI.modals.stack);

            // Store a reference of the overlay
            $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
            $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);

            EqUI.site.body.append($overlay);

            // Override defaults
            options = $.extend(defaults, options);

            if (options.dismissible) {
                $overlay.click(function() {
                    $modal.closeModal(options);
                });
                // Return on ESC
                $(document).on('keyup.leanModal' + overlayID, function(e) {
                    if (e.keyCode === 27) {   // ESC key
                        $modal.closeModal(options);
                    }
                });
            }

            $modal.find(EqUI.modals.action_close_selector).on('click.close', function(e) {
                $modal.closeModal(options);
            });

            $overlay.css({ display : "block", opacity : 0 });

            $modal.css({
                display : "block",
                opacity: 0
            });

            $overlay.velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});
            $modal.data('associated-overlay', $overlay[0]);

            // Top and Full Sheet
            if ($modal.hasClass(EqUI.modals.top_sheet_class) || $modal.hasClass(EqUI.modals.full_sheet_class)) {
                $modal.velocity({top: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Bottom Sheet
            else if ($modal.hasClass(EqUI.modals.bottom_sheet_class)) {
                $modal.velocity({bottom: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Left Sheet
            else if ($modal.hasClass(EqUI.modals.left_sheet_class)) {
                $modal.velocity({left: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Right Sheet
            else if ($modal.hasClass(EqUI.modals.right_sheet_class)) {
                $modal.velocity({right: "0", opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            } // Normal
            else {
                $.Velocity.hook($modal, "scaleX", 0.7);
                $modal.css({ top: options.starting_top });
                $modal.velocity({top: "10%", opacity: 1, scaleX: '1'}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        if (typeof(options.ready) === "function") {
                            options.ready();
                        }
                    }
                });
            }


        }
    });

    // Close Modal
    $.fn.extend({
        closeModal: function(options) {
            var defaults = {
                out_duration: 250,
                complete: undefined
            },
            $modal = $(this),
            overlayID = $modal.data('overlay-id'),
            $overlay = $('#' + overlayID);

            options = $.extend(defaults, options);

            // Enable scrolling only if there no other modals open
            if($(EqUI.modals.overlay_selector).length < 2)
	            $('body').css('overflow', '');

            $modal.find(EqUI.modals.action_close_selector).off('click.close');
            $(document).off('keyup.leanModal' + overlayID);

            $overlay.velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});


            // Top and Full Sheet
            if ($modal.hasClass(EqUI.modals.top_sheet_class) || $modal.hasClass(EqUI.modals.full_sheet_class)) {
                $modal.velocity({top: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Bottom Sheet
            else if ($modal.hasClass(EqUI.modals.bottom_sheet_class)) {
                $modal.velocity({bottom: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Left Sheet
            else if ($modal.hasClass(EqUI.modals.left_sheet_class)) {
                $modal.velocity({left: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Right Sheet
            else if ($modal.hasClass(EqUI.modals.right_sheet_class)) {
                $modal.velocity({right: "-100%", opacity: 0}, {
                    duration: options.out_duration,
                    queue: false,
                    ease: "easeOutCubic",
                    // Handle modal ready callback
                    complete: function() {
                        $overlay.css({display:"none"});

                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                });
            } // Normal
            else {
                $modal.velocity(
                { top: options.starting_top, opacity: 0, scaleX: 0.7}, {
                    duration: options.out_duration,
                    complete:
                    function() {

                        $(this).css('display', 'none');
                        // Call complete callback
                        if (typeof(options.complete) === "function") {
                            options.complete();
                        }
                        $overlay.remove();
                        EqUI.modals.stack--;
                    }
                }
                );
            }
        }
    });

    // Lean Modal
    $.fn.extend({
        leanModal: function(option) {
            return this.each(function() {

                var defaults = {
                    starting_top: '4%'
                },
                // Override defaults
                options = $.extend(defaults, option);

                // Close Handlers
                $(this).click(function(e) {
                    options.starting_top = ($(this).offset().top - $(window).scrollTop()) /1.15;
                    var modal_id = $(this).attr("href") || '#' + $(this).data('target');
                    $(modal_id).openModal(options);
                    e.preventDefault();
                }); // done set on click
            }); // done return
        }
    });

    // Init
    EqUI.modals.init = function() {

    };

    // Update
    EqUI.modals.update = function() {
        
    };

    $(document).ready(function() {
        // Init
        EqUI.modals.init();

        // Update
        EqUI.modals.update();
    });
}( jQuery ));