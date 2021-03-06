module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    eslint: {
      target: ['app/*.js', 'lib/*.js','app/models/*.js','server.js','server-config.js','test/*.js','public/client/*.js']
    },

    concat: {

      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/*.js'],
        dest: 'public/dist/client.js',
      },

    },

    uglify: {
      my_target: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.js']
          //output first
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
          //output first
        }
      }
    },

    gitadd: {
      task: {
        options: {
          force: true
        },
        files: {
          src: ['app/*.js', 'app/models/*.js', 'server.js','server-config.js','test/*.js','public/*.js' ,'views/*','package.json','Gruntfile.js','README.md']
        }
      }
    },

    gitcommit: {
      task: {
        options: {
          message: 'Testing',
          noVerify: true,
          noStatus: true
        },
        files: {
           src: ['app/*.js', 'server.js','lib/*.js','server-config.js','tests/*.js','public/*.js' ,'views/*','package.json','Gruntfile.js','README.md'],
        }
      }
    },

    gitpush: {
      your_target: {
        options: {
            remote: 'live',
            branch: 'HEAD:master'
          }
        }
    },

    watch: {
      scripts: {
        files: [
          'app/*.js', 'server.js','server-config.js',
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'mochaTest',
        ]
      },
      /*css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }*/
    },

    shell: {
      prodServer: {
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('build', ['mochaTest','eslint','concat','cssmin','uglify']);

  grunt.registerTask('uploadLive', function(n) {
    
  });

   grunt.registerTask('uploadBare', function(n) {
    
  });

  grunt.registerTask('commit-push', function(n) {
      grunt.task.run(['gitcommit','gitpush']);
  });

  grunt.registerTask('deploy', function(n){
    if(grunt.option('prod')){
      grunt.task.run(['build','gitadd', 'gitcommit', 'gitpush']);//,'gitpush']);
    } else {
      grunt.task.run(['build','nodemon'])
    }
  });

// comment here

};
