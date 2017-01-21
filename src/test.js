(function() {
  angular.module('app', ['angularPaho']);
})();

(function() {
  angular.module('app').controller('test', [ '$scope', 'MqttClient', function($scope, MqttClient) {

    var ip = "172.24.16.67";
    var port = "1885";
    var id = "test";



    MqttClient.init(ip, port, id);
    console.log("Start Start");
    MqttClient.connect({onSuccess: successCallback});

    function successCallback() {
      console.log("successCallback");
      MqttClient.subscribe('mqttest');
      //message = new Paho.MQTT.Message("Hello");
      //message.destinationName = "mqttest";
      //MqttClient.send(message);
    }
  }]);
})();
