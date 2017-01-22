var mqtt = require('mqtt')

client = mqtt.connect();

client.subscribe('mqttest');

console.log('Client publishing.. ');
message = "Hi"

client.publish('mqttest', message);
var i = 0;
var interval = setInterval(function() {
  message = [ 1346005200000+(i*3000000000) , 1271000.0+(i*100000)]
  //message = ""+i
  client.publish('mqttest', message.toString());
  i++;
}, 5000);
