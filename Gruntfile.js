module.exports = function ( grunt ) {
  
    /** 
    * Config.
    */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            name_root_file: 'exentriq-bootstrap-material-ui',
            notify_title: 'Exentriq - Bootstrap Material UI'
        },

        // Clean
        clean: {
            dist: {
                src: ["dist/*"]
            }
        },

        // CSS Sass
        sass: {
            dist: {
                options: {
                    outputStyle: 'expanded',
                    sourcemap: false,
                },
                files: {
                    'dist/css/<%= meta.name_root_file %>.css': 'src/sass/<%= meta.name_root_file %>.scss',
                }
            }
        },

        // CSS autoprefixer
        postcss: {
            options: {
                map: {
                    inline: false // save all sourcemaps as separate files...
                },
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
                    })
                ]
            },
            dist: {
                src: 'dist/css/<%= meta.name_root_file %>.css'
            }
        },

        // CSS min
        cssmin: {
            options: {
                report: 'gzip'
            },
            dist: {
                src: 'dist/css/<%= meta.name_root_file %>.css',
                dest: 'dist/css/<%= meta.name_root_file %>.min.css'
            }
        },

        // JS Concat
        concat: {
            options: {
                // separator: ';',
            },
            bower: {
                src: [
                    'src/bower_components/jquery/dist/jquery.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
                    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
                    'src/bower_components/jquery-validation/dist/jquery.validate.js',
                    'src/bower_components/jquery-validation/dist/additional-methods.js',
                    'src/bower_components/velocity/velocity.js',
                    'src/bower_components/velocity/velocity.ui.js',
                    'src/bower_components/autosize/dist/autosize.js',
                    'src/bower_components/waves/dist/waves.js',
                    'src/bower_components/prism/prism.js',
                    'src/bower_components/prism/components/prism-php.js',
                    'src/bower_components/prism/components/prism-git.js',
                    'src/bower_components/prism/components/prism-bash.js',
                    'src/bower_components/prism/components/prism-http.js',
                    'src/bower_components/prism/components/prism-javascript.js',
                    'src/bower_components/prism/components/prism-markdown.js',
                    'src/bower_components/prism/components/prism-css.js',
                    'src/bower_components/prism/components/prism-scss.js'
                    ],
                dest: 'src/js/vendor/bower_components.js',
            },
            dist: {
                src: [
                    'src/js/vendor/bower_components.js',
                    'src/js/global.js',
                    'src/js/site.js',
                    'src/js/layout/app-bar.js',
                    'src/js/layout/side-nav.js',
                    'src/js/collapsible.js',
                    'src/js/_init.js'
                    ],
                dest: 'dist/js/<%= meta.name_root_file %>.js',
            }
        },

        // JS jshint
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                undef: false,
                browser: true,
                globals: {
                    jQuery: true
                },
                reporter: require('jshint-stylish')
            },
            beforeconcat: ['src/js/*.js'],
            afterconcat: ['dist/js/<%= meta.name_root_file %>.js']
        },

        // JS Uglify
        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                sourceMapName: 'dist/js/<%= meta.name_root_file %>.js.map'
            },
            dist: {
                files: {
                    'dist/js/<%= meta.name_root_file %>.min.js': [
                        'dist/js/<%= meta.name_root_file %>.js'
                    ]
                }
            }
        },

        // Copy
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/', 
                        src: ['fonts/**'],
                        dest: 'doc/assets'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/bower_components/bootstrap-sass/assets/fonts/bootstrap/*'],
                        dest: 'doc/assets/fonts/bootstrap',
                        filter: 'isFile'
                    }
                ]
            },
            img: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/', 
                        src: ['img/**'],
                        dest: 'doc/assets'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/', 
                        src: ['css/<%= meta.name_root_file %>.min.css', 'css/<%= meta.name_root_file %>.css.map'],
                        dest: 'doc/assets/'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['js/<%= meta.name_root_file %>.min.js', 'js/<%= meta.name_root_file %>.js.map'],
                        dest: 'doc/assets/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/', 
                        src: ['img/**'],
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        cwd: 'src/', 
                        src: ['fonts/**'],
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/bower_components/bootstrap-sass/assets/fonts/bootstrap/*'],
                        dest: 'dist/fonts/bootstrap',
                        filter: 'isFile'
                    }
                ],
            }
        },

        // Jade
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: true
                    }
                },
                files: {
                    "doc/color.html": "jade/color.jade",
                    "doc/helpers.html": "jade/helpers.jade",
                    "doc/typography.html": "jade/typography.jade",
                    "doc/buttons.html": "jade/buttons.jade",
                    "doc/collapsible.html": "jade/collapsible.jade",
                    "doc/showcase.html": "jade/showcase.jade",
                    "doc/index.html": "jade/index.jade"
                }
            }
        },

        // Watch
        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: [
                    'sass_compile'
                ]
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: [
                    'js_compile'
                ]
            },
            jade: {
                files: ['jade/**/*.jade', 'jade/**/*.html'],
                tasks: [
                    'jade_compile'
                ]
            }
        },

        // Concurrent
        concurrent: {
            watch: {
                tasks: ['watch:sass', 'watch:js', 'watch:jade', 'notify:watching', 'server'],
                options: {
                    logConcurrentOutput: true,
                    limit: 10,
                }
            }
        },

        // Browser Sync integration
        browserSync: {
            bsFiles: {
                src : [
                    'doc/assets/**/*',
                    'doc/*.html'
                ]
            },
            options: {
                server: {
                    baseDir: "./doc"
                },
                open: true,
                browser: ["google chrome"],
                port: 9090
            }
        },

        // System Notifications
        notify: {
            watching: {
                options: {
                    enabled: true,
                    message: 'Watching Files!',
                    title: "<%= meta.notify_title %>", // defaults to the name in package.json, or will use project directory's name
                    success: true, // whether successful grunt executions should be notified automatically
                    duration: 1 // the duration of notification in seconds, for `notify-send only
                }
            },

            sass_compile: {
                options: {
                    enabled: true,
                    message: 'Sass Compiled!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            },

            js_compile: {
                options: {
                    enabled: true,
                    message: 'JS Compiled!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            },

            jade_compile: {
                options: {
                    enabled: true,
                    message: 'Jade Compiled!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            },

            release_compile: {
                options: {
                    enabled: true,
                    message: 'Release Build Completed!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            },

            server: {
                options: {
                    enabled: true,
                    message: 'Server Running!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            }
        }

    });
  
    /** 
    * Load required Grunt tasks.
    */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-notify');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');

    grunt.loadNpmTasks('grunt-contrib-jade');

    /** 
    * Register Grunt tasks.
    */

    // default
    grunt.registerTask('default', ['concurrent:watch']);
    grunt.registerTask('Watch', ['concurrent:watch']);

    grunt.registerTask('sass_compile', ['sass:dist', 'postcss:dist', 'cssmin:dist', 'copy:css', 'notify:sass_compile']);
    grunt.registerTask('js_compile', ['jshint:beforeconcat', 'concat:dist', 'uglify:dist', 'copy:js', 'notify:js_compile']);
    grunt.registerTask('jade_compile', ['jade:compile', 'notify:jade_compile']);

    grunt.registerTask('server', ['browserSync', 'notify:server']);

    // Release
    grunt.registerTask('Release', [
        'clean:dist',
        'sass:dist', 
        'postcss:dist',
        'cssmin:dist',
        'concat:bower',
        'jshint:beforeconcat',
        'concat:dist',
        'uglify:dist',
        'copy:dist',
        'copy:fonts',
        'copy:img',
        'copy:css',
        'copy:js',
        'jade:compile',
        'notify:release_compile'
        ]);
};
