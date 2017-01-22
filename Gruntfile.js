module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'nodemon': {
      'mqtt-broker': {
          script: 'node-mqtt/mqtt_broker.js'
        },

      'server': {
          script: 'server/server.js'
        },

      'publisher': {
          script: 'node-mqtt/node_publisher.js'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon:mqtt-broker', 'nodemon:server', 'nodemon:publisher']
    }
  });

  grunt.registerTask('build',['concurrent:tasks']);

};
