module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		markdown: {
			all: {
				expand: true,
				src: '*.md',
				dest: '',
				ext: '.html'
			}
		},
		watch: {
			watchHtml: {
				files: ['*.html', '*.js', '*.css'],
				options: {
					livereload: true
				}
			},
			mdAdded: {
				files: ['*.md'],
				tasks: ['markdown'],
				options: {
					spawn: false,
					event: ['added', 'changed']
				}
			},
			mdDeleted: {
				files: ['*.md'],
				tasks: [],
				options: {
					spawn: true,
					event: ['deleted']
				}				
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: '.',
					livereload: true
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect:server', 'markdown', 'watch']);

	grunt.event.on('watch', function(action, filepath, target) {
		if (action == 'deleted' && filepath.substr(filepath.lastIndexOf('.') + 1) == 'md') 
			grunt.file.delete(filepath.substr(0, filepath.lastIndexOf('.')) + '.html');
		else
			grunt.config('markdown.all.src', filepath);
	})
}