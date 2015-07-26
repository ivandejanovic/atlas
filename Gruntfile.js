module.exports = function(grunt) {
  'use strict';
  
  // Project configuration.
  grunt.initConfig({
    // Hint Config
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/*.js',
      ]
    },
    uglify: {
      target: {
        files: {
          'build/atlas-min.js': ['src/atlas.js']
        }
      }
    }
  });

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Build task(s).
  grunt.registerTask('build', ['jshint', 'uglify']);
};