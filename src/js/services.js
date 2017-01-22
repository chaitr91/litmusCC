angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);



  angular.module('myApp').service('dataShare', function($rootScope){
    data = "HI"
    function set(val){
      //console.log('in', val)
      data = val
      $rootScope.$apply()
      //console.log(data)
    }
    return{
      set: set,
      value: function(){
        return data
      }
    }
  })

  angular.module('myApp').factory('MqttClient', [function() {

    // so we can use the member attributes inside our functions
    var client = {};

    // initialize attributes
    client._location = "";
    client._port = "";
    client._id = "";
    client._client = null;
    client._isConnected = false;

    // member functions
    client.init = init;
    client.connect = connect;
    client.disconnect = disconnect;
    client.send = send;
    client.startTrace = startTrace;
    client.stopTrace = stopTrace;
    client.subscribe = subscribe;
    client.unsubscribe = unsubscribe;

    return client;

    // onConnectionLost callback

    function _call(cb, args) {
      if (client._client) {
          cb.apply(this, args);
      } else {
        console.log('Angular-Paho: Client must be initialized first.  Call init() function.');
      }
    }

    function onConnectionLost(resp) {
      console.log("Angular-Paho: Connection lost on ", client._id, ", error code: ", resp);
      client._isConnected = false;
    }

    // connects to the MQTT Server
    function connect(options) {
      _call(_connect, [options]);
    }

    function _connect(options) {
      client._client.connect(options);
      client._isConnected = client._client.isConnected();
    }

    function disconnect() {
      _call(_disconnect);
    }

    function _disconnect() {
      client._client.disconnect();
      client._isConnected = false;
    }

    function init(location, port, id) {
      // initialize attributes
      client._location = location;
      client._port = port;
      client._id = id;

      // create the client and callbacks
      client._client = new Paho.MQTT.Client(client._location, Number(client._port), client._id);
      client._client.onConnectionLost = onConnectionLost;
      //client._client.onMessageArrived = onMessageArrived;
    }

    function send(message) {
      _call(_send, [message]);
    }

    function _send(message) {
      client._client.send(message);
    }

    function startTrace() {
      _call(_startTrace);
    }

    function _startTrace() {
      client._client.startTrace();
    }

    function stopTrace() {
      _call(_stopTrace);
    }

    function _stopTrace() {
      client._client.stopTrace();
    }

    function subscribe(filter, options) {
      _call(_subscribe, [filter, options]);
    }

    function _subscribe(filter, options) {
      client._client.subscribe(filter, options);
    }

    function unsubscribe(filter, options) {
      _call(_unsubscribe, [filter, options]);
    }

    function _unsubscribe(filter, options) {
      client._client.unsubscribe(filter, options);
    }

  }]);
