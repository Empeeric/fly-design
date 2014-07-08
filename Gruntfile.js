module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
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
