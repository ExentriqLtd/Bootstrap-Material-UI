module.exports = function ( grunt ) {
  
    /** 
    * Config.
    */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            name_root_file: 'exentriq-bootstrap-material-ui',
            notify_title: 'Exentriq'
        },

        // Sass
        sass: {
            expanded: {
                options: {
                    outputStyle: 'expanded',
                    sourcemap: false,
                },
                files: {
                    'dist/css/<%= meta.name_root_file %>.css': 'src/sass/<%= meta.name_root_file %>.scss',
                }
            }

            /*min: {
                options: {
                    outputStyle: 'compressed',
                    sourcemap: false
                },
                files: {
                    'dist/css/<%= meta.name_root_file %>.min.css': 'src/sass/<%= meta.name_root_file %>.scss',
                }
            }

            bin: {
                options: {
                    style: 'expanded',
                    sourcemap: false
                },
                files: {
                    'bin/<%= meta.name_root_file %>.css': 'src/sass/<%= meta.name_root_file %>.scss',
                }
            }*/
        },

        // CSS autoprefixer
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'dist/css/*.css'
            }
        },

        // Notifications
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
    grunt.loadNpmTasks('grunt-notify');

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');

    /** 
    * Register Grunt tasks.
    */
    grunt.registerTask('sass_compile', ['sass:expanded', 'notify:sass_compile']);

    /*grunt.registerTask('default', ['postcss:dist']);*/

};
