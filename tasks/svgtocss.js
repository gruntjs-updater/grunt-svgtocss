var svgtocss = require('svgtocss');
var path = require('path');

var default_options = {
	style: 'css'
}

module.exports = function(grunt) {

	return grunt.registerMultiTask('svgtocss', 'Grunt plugin to convert svg to css', function() {

		var options = this.options(svgtocss.defaults);
		var done = this.async();

		this.files.forEach(function(file) {

			var files = file.src.map(function(f) { return path.join(file.cwd, f) })
			options.cwd = path.join(file.cwd, file.dest);

			grunt.log.debug('Encoding: ' +  files.length + ' files.');

			svgtocss.encode(files, options).then(function() {
				grunt.log.writeln(files.length + " svg files encoded in: " + options.cwd);
				done();
			}).catch(function(err) {
				grunt.log.error(err);
			})

		})
		

	});
};