angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.click = function(){
     $location.path('/login');
     $scope.disabled = false;
     $scope.registerForm = {};
    }

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.click = function(){
     $location.path('/register');
     $scope.disabled = false;
     $scope.registerForm = {};
    }

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

  angular.module('myApp').controller('connect', ['$scope', 'MqttClient', 'dataShare', function($scope, MqttClient, dataShare) {

    var ip = "localhost";
    var port = "1885";
    var id = "testLitmusUI";

    MqttClient.init(ip, port, id);
    MqttClient.connect({onSuccess: successCallback});
    function successCallback() {
      MqttClient.subscribe('mqttest');
      console.log('subscribed')
      MqttClient._client.onMessageArrived = onMessageArrived;
    }

    console.log(dataShare.value())
    function onMessageArrived(message) {
      console.log("onMessageArrived:"+message.payloadString);
      $scope.data = message.payloadString;
      dataShare.set($scope.data)
      //console.log(dataShare.value())
      $scope.$apply();
    }

  }]);

  angular.module('myApp').controller('historicalBarChartCtrl', function($scope, dataShare){
          $scope.options = {
              chart: {
                  type: 'historicalBarChart',
                  height: 450,
                  margin : {
                      top: 20,
                      right: 20,
                      bottom: 65,
                      left: 50
                  },
                  x: function(d){return d[0];},
                  y: function(d){return d[1]/100000;},
                  showValues: true,
                  valueFormat: function(d){
                      return d3.format(',.1f')(d);
                  },
                  duration: 100,
                  xAxis: {
                      axisLabel: 'Time',
                      tickFormat: function(d) {
                          return d3.time.format('%x')(new Date(d))
                      },
                      rotateLabels: 30,
                      showMaxMin: false
                  },
                  yAxis: {
                      axisLabel: 'Y Axis',
                      axisLabelDistance: -10,
                      tickFormat: function(d){
                          return d3.format(',.1f')(d);
                      }
                  },
                  tooltip: {
                      keyFormatter: function(d) {
                          return d3.time.format('%x')(new Date(d));
                      }
                  },
                  zoom: {
                      enabled: true,
                      scaleExtent: [1, 100],
                      useFixedDomain: false,
                      useNiceScale: false,
                      horizontalOff: true,
                      verticalOff: true,
                      unzoomEventType: 'dblclick.zoom'
                  }
              }
          };

          $scope.data = [
              {
                  "key" : "Quantity" ,
                  "bar": true,
                  "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
  }];
  $scope.service = dataShare
  $scope.valC = "new"
  $scope.$watch("service.value()", function(newVal){
    $scope.valC = newVal;
    update($scope.valC)
  })
  //console.log($scope.data[0].values)

  function update(val){
    $scope.data[0].values.push(JSON.parse('['+val+']'))
    //$scope.$apply()
  }

});
