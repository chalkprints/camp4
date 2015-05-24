module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    dirs: {
      css: 'assets/styles',
      js: 'assets/scripts'
    },
    
    clean: [
      '<%= dirs.css %>/combined.*',
      '<%= dirs.js %>/combined.*'
    ],

    concat: {
      css: {
        src: [
            '<%= dirs.css %>/reset.css', '<%= dirs.css %>/monkey*', '<%= dirs.css %>/*'
        ],
        dest: '<%= dirs.css %>/combined.css'
      },
      js: {
        src: [
            '<%= dirs.js %>/jquery.js', '<%= dirs.js %>/jquery.*', '<%= dirs.js %>/*'
        ],
        dest: '<%= dirs.js %>/combined.js'
      }
    },
    
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      css: {
        src: '<%= dirs.css %>/combined.css',
        dest: '<%= dirs.css %>/combined.min.css'
      }
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      js: {
        files: {
          '<%= dirs.js %>/combined.min.js': ['<%= dirs.js %>/combined.js']
        }
      }
    },

    processhtml: {
      options: {
        data: {
          message: '<!-- AUTOGENERATED FILE - DO NOT EDIT - ' +
          '<%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> -->'
        }
      },
      dist: {
        files: {
          'index.html': ['index.template.html']
        }
      }
    },

    // Update codebase version number and tag git repo, for auditability
    bump: {
      options: {
        commitMessage: 'Autogenerate files and release v%VERSION%',
        commitFiles: ['package.json', 'index.html', 'assets/scripts/combined.min.js', 'assets/styles/combined.min.css'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['clean', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'processhtml:dist']);

  grunt.registerTask('deploy', ['clean', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'processhtml:dist', 'bump']);

};