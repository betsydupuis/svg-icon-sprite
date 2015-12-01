// Gruntfile.js
module.exports = function (grunt) {
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            iconTemp: [ //removes temporary icons
                    'dev/icons/cleaned'
                    ],
        },
        svgmin: {
            icons: {
                options: {
                    plugins: [
                        { removeViewBox: true },
                        { removeUselessStrokeAndFill: true},
                        { mergePaths: false },
                        { collapseGroups: true },
                        { convertColors: false},
                        { convertStyleToAttrs: true},
                        { removeFill: true},
                        { cleanupEnableBackground: false},
                        { removeStyleElement: true}
                    ],
                },

                files: [{
                    expand: true,
                    cwd: 'dev/icons/',
                    src: ['*.svg'],
                    dest: 'dev/icons/cleaned',
                }],
            }
        },
        svgstore: {
            icons : {
                options: {
                    prefix : 'icon-', // this will prefix each id attribute of <symbol>
                    svg: {
                        // viewbox: '0 0 100 100',
                        style: 'width: 0; height: 0;',
                    },
                    includedemo: true,
                    cleanup: ['fill', 'overflow', 'enablebackground'],
                },
                files: {
                    'dist/icons/icon-sprite.svg'
                    :
                    ['dev/icons/cleaned/*.svg'],
                }
            }
        }
    });

    grunt.registerTask('icons', ['svgmin:icons',
                                 'svgstore:icons',
                                 'clean:iconTemp',
                                ]);
    // grunt.registerTask('default', []);
};
