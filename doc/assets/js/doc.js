var EqUIDoc = {};
(function ($) {
    EqUIDoc.site = {};

    // Init
    EqUIDoc.site.init = function() {

        // Set active path in side bar menu
        if (_doc_route.root_path !== "" && _doc_route.path !== "") {
            var _root_path      = $('#collapsible-nav-' + _doc_route.root_path);
            var _root_path_path = $('#collapsible-nav-' + _doc_route.root_path + '-' + _doc_route.path);

            // Set active for links
            _root_path.addClass("active");
            _root_path_path.addClass("active");

            // Set for open collapsible item
            _root_path.parent().addClass("active");

        } else if (_doc_route.path !== "") {
            var _path = $('#collapsible-nav-' + _doc_route.path);

            // Set active for links
            _path.addClass("active");

            // Set for open collapsible item
            _path.parent().addClass("active");
        }

        // Test
        /*$('#eq-ui-tab-s1-t1').bind('isShow', function () {
            console.log($(this), 'show...');
        });*/

        // Set title in app bar
        /*var _title_app_bar = $('#main-eq-ui-app-bar').find('.header-title');
        if(_doc_route.name_section !== "" && _doc_route.name_chapter !== ""){
            _title_app_bar.html('<span class="section-title">'+_doc_route.name_section+'</span>'+
                '<i class="mdi mdi-chevron-right icon icon-left icon-24"></i>'+
                '<span class="chapter-title">'+_doc_route.name_chapter+'</span>');
        } else if(_doc_route.name_chapter !== "") {
            _title_app_bar.html('<span class="section-title">'+_doc_route.name_chapter+'</span>');
        }*/

        // Set Breadcrumb
        var _breadcrumb      = $('#main-eq-ui-app-bar').find('.eq-ui-breadcrumb');
        var _breadcrumb_path = _doc_route.path === 'index' ? './' : _doc_route.path + '.html';
        if (_doc_route.name_section !== "" && _doc_route.name_chapter !== "") {
            _breadcrumb.html('<a href="./" class="eq-ui-breadcrumb-item"><span>' + _doc_route.name_section + '</span></a>' +
            '<a href="' + _breadcrumb_path + '" class="eq-ui-breadcrumb-item"><span>' + _doc_route.name_chapter + '</span></a>');
        } else if (_doc_route.name_chapter !== "") {
            _breadcrumb.html('<a href="' + _breadcrumb_path + '" class="eq-ui-breadcrumb-item"><span>' + _doc_route.name_chapter + '</span></a>');
        }

        // Refresh all collapsibles
        $('.eq-ui-collapsible').eq_collapsible();

        // Init modals
        $('.eq-ui-modal-trigger').leanModal({
            dismissible : true, // Modal can be dismissed by clicking outside of the modal
            opacity     : .5, // Opacity of modal background
            in_duration : 300, // Transition in duration
            out_duration: 200, // Transition out duration
            ready       : function () {
                console.log('Modal Open');
            }, // Callback for Modal open
            complete    : function () {
                console.log('Modal Close');
            } // Callback for Modal close
        });

        // Form validations
        if (_doc_route.path === "form-validation") {
            EqUIDoc.site.form_validations();
        }

        // Create File Upload Drop
        var _dropzone = EqUI.forms.file_upload_drop('.eq-ui-file-upload-drop-zone', {
            url                  : 'http://localhost:8888/upload/',
            defaultImageThumbnail: "assets/img/doc/files/empty.png"
        });

        if (_dropzone) {
            // File Upload Drop - Events
            _dropzone.on("addedfile", function (file) {
                console.log(file);
            });
        }

        // Build Git in Home
        if (_doc_route.path === "index") {
            EqUIDoc.site.build_git_home();
        }

        // Show layout structures
        if (_doc_route.path === "buttons") {
            EqUI.site.body.addClass('doc-show-in-layout-struture-1');
        }

        // Autocomplete
        var autocomplete_minChars  = 2;
        var autocomplete_countries = EqUIDoc.site.countries_v_d();

        // Autocomplete -> Top search
        $('#doc-eq-ui-top-search-autocomplete input').autocomplete({
            lookup  : autocomplete_countries,
            appendTo: '#doc-eq-ui-top-search-autocomplete',
            groupBy : '',
            minChars: autocomplete_minChars,
            onSelect: function (suggestion) {
                alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });

        // Autocomplete -> Side nav -> search
        $('#doc-eq-ui-side-nav-search-autocomplete input').autocomplete({
            lookup  : autocomplete_countries,
            appendTo: '#doc-eq-ui-side-nav-search-autocomplete',
            groupBy : '',
            minChars: autocomplete_minChars,
            onSelect: function (suggestion) {
                alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });

        // Autocomplete -> search
        $('#doc-eq-ui-search-autocomplete input').autocomplete({
            lookup  : autocomplete_countries,
            appendTo: '#doc-eq-ui-search-autocomplete',
            groupBy : '',
            minChars: autocomplete_minChars,
            onSelect: function (suggestion) {
                alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });

        // Autocomplete -> search expandable
        $('#doc-eq-ui-search-expandable-autocomplete input').autocomplete({
            lookup  : autocomplete_countries,
            appendTo: '#doc-eq-ui-search-expandable-autocomplete',
            groupBy : '',
            minChars: autocomplete_minChars,
            onSelect: function (suggestion) {
                alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });

        // Autocomplete -> input
        $('#doc-text-autocomplete input').autocomplete({
            lookup  : autocomplete_countries,
            appendTo: '#doc-text-autocomplete',
            groupBy : '',
            minChars: autocomplete_minChars,
            onSelect: function (suggestion) {
                alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });

        //-----------------------------------
        // Table -> Lazy load (Sample)
        //-----------------------------------
        var fakeJsonData                           = "http://37.187.137.141:3500/posts"; // http://192.168.1.20:3500/posts
        var fakeDataTable                          = [];
        var EqUILazyLoad_Sample1                   = null;
        var EqUILazyLoad_Sample1_Scroll_Content_ID = $('#table-lazy-load-sample1 tbody')[0];

        // Load json data
        if (EqUILazyLoad_Sample1_Scroll_Content_ID) {
            $.getJSON(fakeJsonData, {
                _page : 1,
                _limit: 300000
            })
            .done(function (data) {

                // Transform data
                $.each(data, function (i, item) {
                    fakeDataTable.push(
                    '<tr>\n' +
                    '<td class="eq-ui-data-table-cell-non-numeric table-fixed-col-100 eq-ui-hidden-xs-">' + (i + 1) + '</td>\n' +
                    '<td class="eq-ui-data-table-cell-non-numeric"><span class="truncate">' + item.model + '</span></td>\n' +
                    '<td>' + item.quantity + '</td>\n' +
                    '<td>' + item.price + '</td>\n' +
                    '</tr>'
                    );
                });

                // Run Lazy Load
                if (EqUILazyLoad_Sample1 === null) {
                    EqUILazyLoad_Sample1 = new EqUILazyLoad({
                        rows     : fakeDataTable,
                        scrollId : EqUILazyLoad_Sample1_Scroll_Content_ID,
                        contentId: EqUILazyLoad_Sample1_Scroll_Content_ID,
                        callbacks: {
                            clusterWillChange: function () {
                                console.log('[Table -> Lazy load] clusterWillChange');
                            },
                            clusterChanged   : function () {
                                console.log('[Table -> Lazy load] clusterChanged');
                            },
                            scrollingProgress: function (progress) {
                                // console.log('[Table -> Lazy load] scrollingProgress', progress);
                            }
                        }
                    });
                }
            });
        }
        //-----------------------------------

        // Sticky Table
        $(".eq-ui-sticky-table").EqUIStickyTable({top:50});

        // When our page loads, check to see if it contains and anchor
        EqUIDoc.site.scroll_if_anchor(window.location.hash);

      //-----------------------------------
      // Wassap Simulate
      //-----------------------------------
      if (_doc_route.path === "dropdown") {
        /* Meme */
        var memes = [
          'Dude, you smashed my turtle saying "I\'M MARIO BROS!"',
          'Dude, you grabed seven oranges and yelled "I GOT THE DRAGON BALLS!"',
          'Dude, you threw my hamster across the room and said "PIKACHU I CHOOSE YOU!"',
          'Dude, you congratulated a potato for getting a part in Toy Story',
          'Dude, you were hugging an old man with a beard screaming "DUMBLEDORE YOU\'RE ALIVE!"',
          'Dude, you were cutting all my pinapples yelling "SPONGEBOB! I KNOW YOU\'RE THERE!"',
        ];

        var random = document.querySelector('#random');

        random.innerHTML = memes[Math.floor(Math.random() * memes.length)];

        /* Time */
        var deviceTime = document.querySelector('.status-bar .time');
        var messageTime = document.querySelectorAll('.message .time');

        deviceTime.innerHTML = moment().format('h:mm');

        setInterval(function() {
          deviceTime.innerHTML = moment().format('h:mm');
        }, 1000);

        for (var i = 0; i < messageTime.length; i++) {
          messageTime[i].innerHTML = moment().format('h:mm A');
        }

        /* Message */
        var form = document.querySelector('.conversation-compose');
        var conversation = document.querySelector('.conversation-container');

        form.addEventListener('submit', newMessage);

        function newMessage(e) {
          var input = e.target.input;
          var guid = EqUI.guid();

          if (input.value) {
            var message = buildMessage(input.value, guid);
            conversation.appendChild(message);
            $('.dropdown-trigger-'+guid).dropdown();
            animateMessage(message);
          }

          input.value = '';
          conversation.scrollTop = conversation.scrollHeight;

          e.preventDefault();
        }

        function buildMessage(text, guid) {
          var element = document.createElement('div');

          element.classList.add('message', 'sent');

          element.innerHTML = text +
            '<span class="metadata">' +
            '<span class="time">' + moment().format('h:mm A') + '</span>' +
            '<span class="tick tick-animation">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
            '</span>' +
            '</span>' +
            '<div class="message-menu-option">' +
            '<!-- Dropdown Trigger -->' +
            '<a data-target="dropdown-message-menu-option-'+guid+'" data-auto-align-target="doc-conversation-container" data-hover="false" data-below-origin="true" class="dropdown-trigger-'+guid+'">' +
            '<i class="mdi mdi-chevron-down icon icon-18"></i>' +
            '</a>' +
            '<!-- Dropdown Structure -->' +
            '<ul id="dropdown-message-menu-option-'+guid+'" class="eq-ui-dropdown">' +
            '<li><a href="#!">Some Action</a></li>' +
            '<li class="disabled"><a href="#!">Disabled Action</a></li>' +
            '<li><a href="#!" class="active">Item Active</a></li>' +
            '<li><a href="#!">Another Action</a></li>' +
            '</ul>' +
            '</div>';

          return element;
        }

        function animateMessage(message) {
          setTimeout(function() {
            var tick = message.querySelector('.tick');
            tick.classList.remove('tick-animation');
          }, 500);
        }
      }
      //-----------------------------------

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

    // Get countries (value, data)
    EqUIDoc.site.countries_v_d = function() {
        var _obj = [];
        $.map(EqUIDoc.site.countries, function (val, key) {
            _obj.push({ value: val, data: key });
        }).join('');
        return _obj;
    };

    EqUIDoc.site.countries = {
        AF: 'Afghanistan',
        AX: 'Aland Islands',
        AL: 'Albania',
        DZ: 'Algeria',
        AS: 'American Samoa',
        AD: 'Andorra',
        AO: 'Angola',
        AI: 'Anguilla',
        AQ: 'Antarctica',
        AG: 'Antigua And Barbuda',
        AR: 'Argentina',
        AM: 'Armenia',
        AW: 'Aruba',
        AU: 'Australia',
        AT: 'Austria',
        AZ: 'Azerbaijan',
        BS: 'Bahamas',
        BH: 'Bahrain',
        BD: 'Bangladesh',
        BB: 'Barbados',
        BY: 'Belarus',
        BE: 'Belgium',
        BZ: 'Belize',
        BJ: 'Benin',
        BM: 'Bermuda',
        BT: 'Bhutan',
        BO: 'Bolivia',
        BA: 'Bosnia And Herzegovina',
        BW: 'Botswana',
        BV: 'Bouvet Island',
        BR: 'Brazil',
        IO: 'British Indian Ocean Territory',
        BN: 'Brunei Darussalam',
        BG: 'Bulgaria',
        BF: 'Burkina Faso',
        BI: 'Burundi',
        KH: 'Cambodia',
        CM: 'Cameroon',
        CA: 'Canada',
        CV: 'Cape Verde',
        KY: 'Cayman Islands',
        CF: 'Central African Republic',
        TD: 'Chad',
        CL: 'Chile',
        CN: 'China',
        CX: 'Christmas Island',
        CC: 'Cocos (Keeling) Islands',
        CO: 'Colombia',
        KM: 'Comoros',
        CG: 'Congo',
        CD: 'Congo, Democratic Republic',
        CK: 'Cook Islands',
        CR: 'Costa Rica',
        CI: 'Cote D\'Ivoire',
        HR: 'Croatia',
        CU: 'Cuba',
        CY: 'Cyprus',
        CZ: 'Czech Republic',
        DK: 'Denmark',
        DJ: 'Djibouti',
        DM: 'Dominica',
        DO: 'Dominican Republic',
        EC: 'Ecuador',
        EG: 'Egypt',
        SV: 'El Salvador',
        GQ: 'Equatorial Guinea',
        ER: 'Eritrea',
        EE: 'Estonia',
        ET: 'Ethiopia',
        FK: 'Falkland Islands (Malvinas)',
        FO: 'Faroe Islands',
        FJ: 'Fiji',
        FI: 'Finland',
        FR: 'France',
        GF: 'French Guiana',
        PF: 'French Polynesia',
        TF: 'French Southern Territories',
        GA: 'Gabon',
        GM: 'Gambia',
        GE: 'Georgia',
        DE: 'Germany',
        GH: 'Ghana',
        GI: 'Gibraltar',
        GR: 'Greece',
        GL: 'Greenland',
        GD: 'Grenada',
        GP: 'Guadeloupe',
        GU: 'Guam',
        GT: 'Guatemala',
        GG: 'Guernsey',
        GN: 'Guinea',
        GW: 'Guinea-Bissau',
        GY: 'Guyana',
        HT: 'Haiti',
        HM: 'Heard Island & Mcdonald Islands',
        VA: 'Holy See (Vatican City State)',
        HN: 'Honduras',
        HK: 'Hong Kong',
        HU: 'Hungary',
        IS: 'Iceland',
        IN: 'India',
        ID: 'Indonesia',
        IR: 'Iran, Islamic Republic Of',
        IQ: 'Iraq',
        IE: 'Ireland',
        IM: 'Isle Of Man',
        IL: 'Israel',
        IT: 'Italy',
        JM: 'Jamaica',
        JP: 'Japan',
        JE: 'Jersey',
        JO: 'Jordan',
        KZ: 'Kazakhstan',
        KE: 'Kenya',
        KI: 'Kiribati',
        KR: 'Korea',
        KW: 'Kuwait',
        KG: 'Kyrgyzstan',
        LA: 'Lao People\'s Democratic Republic',
        LV: 'Latvia',
        LB: 'Lebanon',
        LS: 'Lesotho',
        LR: 'Liberia',
        LY: 'Libyan Arab Jamahiriya',
        LI: 'Liechtenstein',
        LT: 'Lithuania',
        LU: 'Luxembourg',
        MO: 'Macao',
        MK: 'Macedonia',
        MG: 'Madagascar',
        MW: 'Malawi',
        MY: 'Malaysia',
        MV: 'Maldives',
        ML: 'Mali',
        MT: 'Malta',
        MH: 'Marshall Islands',
        MQ: 'Martinique',
        MR: 'Mauritania',
        MU: 'Mauritius',
        YT: 'Mayotte',
        MX: 'Mexico',
        FM: 'Micronesia, Federated States Of',
        MD: 'Moldova',
        MC: 'Monaco',
        MN: 'Mongolia',
        ME: 'Montenegro',
        MS: 'Montserrat',
        MA: 'Morocco',
        MZ: 'Mozambique',
        MM: 'Myanmar',
        NA: 'Namibia',
        NR: 'Nauru',
        NP: 'Nepal',
        NL: 'Netherlands',
        AN: 'Netherlands Antilles',
        NC: 'New Caledonia',
        NZ: 'New Zealand',
        NI: 'Nicaragua',
        NE: 'Niger',
        NG: 'Nigeria',
        NU: 'Niue',
        NF: 'Norfolk Island',
        MP: 'Northern Mariana Islands',
        NO: 'Norway',
        OM: 'Oman',
        PK: 'Pakistan',
        PW: 'Palau',
        PS: 'Palestinian Territory, Occupied',
        PA: 'Panama',
        PG: 'Papua New Guinea',
        PY: 'Paraguay',
        PE: 'Peru',
        PH: 'Philippines',
        PN: 'Pitcairn',
        PL: 'Poland',
        PT: 'Portugal',
        PR: 'Puerto Rico',
        QA: 'Qatar',
        RE: 'Reunion',
        RO: 'Romania',
        RU: 'Russian Federation',
        RW: 'Rwanda',
        BL: 'Saint Barthelemy',
        SH: 'Saint Helena',
        KN: 'Saint Kitts And Nevis',
        LC: 'Saint Lucia',
        MF: 'Saint Martin',
        PM: 'Saint Pierre And Miquelon',
        VC: 'Saint Vincent And Grenadines',
        WS: 'Samoa',
        SM: 'San Marino',
        ST: 'Sao Tome And Principe',
        SA: 'Saudi Arabia',
        SN: 'Senegal',
        RS: 'Serbia',
        SC: 'Seychelles',
        SL: 'Sierra Leone',
        SG: 'Singapore',
        SK: 'Slovakia',
        SI: 'Slovenia',
        SB: 'Solomon Islands',
        SO: 'Somalia',
        ZA: 'South Africa',
        GS: 'South Georgia And Sandwich Isl.',
        ES: 'Spain',
        LK: 'Sri Lanka',
        SD: 'Sudan',
        SR: 'Suriname',
        SJ: 'Svalbard And Jan Mayen',
        SZ: 'Swaziland',
        SE: 'Sweden',
        CH: 'Switzerland',
        SY: 'Syrian Arab Republic',
        TW: 'Taiwan',
        TJ: 'Tajikistan',
        TZ: 'Tanzania',
        TH: 'Thailand',
        TL: 'Timor-Leste',
        TG: 'Togo',
        TK: 'Tokelau',
        TO: 'Tonga',
        TT: 'Trinidad And Tobago',
        TN: 'Tunisia',
        TR: 'Turkey',
        TM: 'Turkmenistan',
        TC: 'Turks And Caicos Islands',
        TV: 'Tuvalu',
        UG: 'Uganda',
        UA: 'Ukraine',
        AE: 'United Arab Emirates',
        GB: 'United Kingdom',
        US: 'United States',
        UM: 'United States Outlying Islands',
        UY: 'Uruguay',
        UZ: 'Uzbekistan',
        VU: 'Vanuatu',
        VE: 'Venezuela',
        VN: 'Viet Nam',
        VG: 'Virgin Islands, British',
        VI: 'Virgin Islands, U.S.',
        WF: 'Wallis And Futuna',
        EH: 'Western Sahara',
        YE: 'Yemen',
        ZM: 'Zambia',
        ZW: 'Zimbabwe'
    }

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
