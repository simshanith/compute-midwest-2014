'use strict';

module.exports = function(grunt) {
    grunt.registerTask('main', 'Perform main build tasks.', function(){
      grunt.task.run([
        //'concurrent:main',
        // markup inlines styles now
        'scripts',
        'styles',
        'markup',
        'clean:build'
      ]);
    });
};
