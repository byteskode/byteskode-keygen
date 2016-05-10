'use strict';

module.exports = function(grunt) {

    // add grunt tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 20000
                },
                src: [
                    'spec/**/*.js'
                ]
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'index.js',
                'lib/**/*.js',
                'spec/**/*.js'
            ]
        },
        watch: {
            all: {
                files: [
                    'Gruntfile.js',
                    'index.js',
                    'lib/**/*.js',
                    'spec/**/*.js'
                ],
                tasks: ['default']
            }
        }
    });

    //custom tasks
    grunt.registerTask('default', ['jshint', 'mochaTest', 'watch']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);

};