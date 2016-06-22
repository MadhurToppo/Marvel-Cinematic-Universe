module.exports = function (grunt)
{
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: "\n\n"
			},
			dev: {
				src: ['src/resources/js/**/*.js'],
				dest: 'src/<%= pkg.name %>.js'
			},
			deps: {
				src: [
					'bower_components/modernizr/modernizr.js',
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/bootstrap/dist/js/bootstrap.min.js',
					'bower_components/angularjs/angular.min.js',
					'bower_components/angular-route/angular-route.min.js'
				],
				dest: 'src/<%= pkg.name %>-deps.js'
			},
			css: {
				src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
						'src/resources/css/styles.css'
				],
				dest: 'src/resources/css/<%= pkg.name %>.css'
			},
			dist: {
				files: {
					'bin/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.min.js'],
					'bin/<%= pkg.name %>-deps.js': ['src/<%= pkg.name %>-deps.js']
				}
			},
			moveMap: {
				src: ['bower_components/angularjs/angular.min.js.map'],
				dest: 'src/angular.min.js.map'
			},
			moveRoute: {
				src: ['bower_components/angular-route/angular-route.min.js.map'],
				dest: 'src/angular-route.min.js.map'
			}
		},

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			dist: {
				files: [
					{
						expand: true,
						src: 'src/<%= pkg.name %>.js',
						ext: '.annotated.js',
						extDot: 'last'
					}
				]
			}
		},

		sass: {
			dev: {
				files: {
					'src/resources/css/styles.css': 'src/resources/css/styles.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed',
					noCache: true,
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("mm-dd-yyyy") %> */'
				},
				files: [{
					expand: true,
					src: '*/resources/css/styles.scss',
					dest: 'bin/',
					ext: '.css'
				}]
			}
		},

		uglify: {
			options: {
				mangle: false,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("mm-dd-yyyy") %> */'
			},
			distJS: {
				files: {
					'src/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
				}
			}
		},

		watch: {
			scripts: {
				files: ['src/resources/js/**/*.js'],
				tasks: ['concat:dist']
			},
			styles: {
				files: ['src/resources/css/*.scss'],
				tasks: ['sass:dev', 'concat:css']
			}
		}
	});

	//npm tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-ngdocs');

	//tasks
	grunt.registerTask('default', 'Default Task Alias', ['build']);

	grunt.registerTask('build', 'Build the application', 
		['sass:dev',
		'concat:dist', 'ngAnnotate:dist', 'concat:css', 'concat:moveMap', 'concat:moveRoute'
		]);
}