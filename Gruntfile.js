module.exports = function ( grunt ) {

   /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */

   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-ejs');

	var userConfig = {
		buildDir: "build",
		srcDir: "www"
	}

	var taskConfig = {

		copy: {
			assets: {
				files: [
					{ 
			            src: [ '**' ],
			            dest: '<%= buildDir %>/img/',
			            cwd: '<%= srcDir %>/img/',
			            expand: true
					},
					{ 
			            src: [ '**' ],
			            dest: '<%= buildDir %>/fonts/',
			            cwd: '<%= srcDir %>/fonts/',
			            expand: true
					},
					{ 
			            src: [ '**' ],
			            dest: '<%= buildDir %>/js/',
			            cwd: '<%= srcDir %>/js/',
			            expand: true
					}
		       ]
			}
		},

		ejs: {
			all: {
				src: ['**/*.ejs', '!partials/**/*'],
				dest: '<%= buildDir %>/',
				expand: true,
				cwd: '<%= srcDir %>/',
				ext: '.html',
			},
		},

		less: {
			compile: {
				options: {
					cleancss: false,
					compress: true,
					sourceMap: true,

					sourceMapFilename: 'build/css/main.css.map',
					sourceMapRootpath: '../../'
			    },
				files: {
					'<%= buildDir %>/css/main.css': '<%= srcDir %>/less/main.less'
				}
			},
			bootstrap: {
				files: {
					'<%= buildDir %>/css/bootstrap.css': '<%= srcDir %>/less/bootstrap/bootstrap.less'
				}
			},
			fontAwesome: {
				files: {
					'<%= buildDir %>/css/font-awesome.css': '<%= srcDir %>/less/font-awesome/font-awesome.less'
				}
			}
		},

		

		delta: {

	      options: {
	        livereload: true
	      },

	      /**
	       * When the LESS files change, we need to compile and copy to build dir
	       */
	      less: {
	        files: [ '<%= srcDir %>/**/*.less' ],
	        tasks: [ 'less:compile'],
	        options: {
	        	livereload: true
	      	},
	      },

	      /**
	       * When .ejs file changes, we need to compile ejs into HTML.
	       */
	      html: {
	        files: [ '<%= srcDir %>/**/*.ejs' ],
	        tasks: [ 'ejs:all'],
	        options: {
	        	livereload: true
	      	},
	      },

	      assets: {
	        files: [ 
	          '<%= srcDir %>/img/**/*',
	          '<%= srcDir %>/fonts/**/*',
	          '<%= srcDir %>/js/**/*',
	        ],
	        tasks: [ 'copy:assets' ]
	      },

	      js: {
	      	files: ['<%= srcDir %>/js**/*'],
	      	options: {
	        	livereload: true
	      	},
	      }

	    }
	}

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );
	// grunt.config.init(taskConfig);

	grunt.renameTask( 'watch', 'delta' );
  	grunt.registerTask( 'watch', [ 
  		'less:bootstrap',
  		'less:fontAwesome',
  		'less:compile', 
  		'ejs:all', 
  		'copy:assets',  
  		'delta' 
  	]);

	grunt.registerTask('build', [
		'less:bootstrap',
  		'less:fontAwesome',
		'less:compile',
		'ejs:all',
		'copy:assets'
	]);

	grunt.registerTask('default', ['less:compile']);

}
