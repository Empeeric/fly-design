module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'public/js/jquery.js',
                    'public/js/jquery-ui.js.js',
                    'public/js/browser.js',
                    'public/js/loaded.js',
                    'public/js/masonry.js',
                    'public/js/hoverdir.js',
                    'public/js/mousewheel.js',
                    'public/js/jscrollpane.js',
                    'public/js/fancybox.js',
                    'public/js/jquery.restjson.js',
                    'public/js/jquery.serializeobject.js',
                    'public/js/page.js',
                    'public/js/contact.js'
                ],
                dest: 'public/js/built.js'
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'public/js/built.min.js': ['public/js/built.js'],
                    'public/js/respond.modernizr.min.js': ['public/js/respond.js', 'public/js/modernizr.js']
                }
            }
        },

        cssmin: {
            minify: {
                files: {
                    "public/generated/build.min.css": [
                        "public/css/fonts/fonts.css",
                        "public/components/fontello/css/fontello-embedded.css",
                        "public/components/normalize-css/normalize.css",
                        "public/components/resp-slides/responsiveslides.css",
                        "public/css/style.css",
                        "public/css/mobile.css"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
