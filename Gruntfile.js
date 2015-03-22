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
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-markdown');

	grunt.registerTask('default', ['watch']);

	grunt.event.on('watch', function(action, filepath, target) {
		if (action == 'deleted') 
			grunt.file.delete(filepath.substr(0, filepath.lastIndexOf('.')) + '.html');
		else
			grunt.config('markdown.all.src', filepath);
	})
}