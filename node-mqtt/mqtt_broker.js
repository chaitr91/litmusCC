var mosca = require('mosca');

var dbmqtt = {
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'mode-mqtt',
  mongo: {}
};

var settings = {
  http: {
    port: 1885,
    bundle: true,
    static: './'
  },
  //backend: dbmqtt
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}
