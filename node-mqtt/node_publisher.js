var mqtt = require('mqtt')

client = mqtt.connect();

client.subscribe('mqttest');

console.log('Client publishing.. ');
message = "Hi"

client.publish('mqttest', message);
var i = 0;
flag = 1;
var interval = setInterval(function() {
  flag = Math.random() * (20 - 1) + 1;
  message = [ 1328005200000+(i*3000000000) , 1271000.0+(100000*flag)]
  //message = ""+i
  client.publish('mqttest', message.toString());
  i++;
}, 2000);
