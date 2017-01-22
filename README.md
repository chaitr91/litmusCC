# README #

### litmuscc ###

* Time-series Visualization with AngularJS front-end and Node.js backend.
* Version-0.0.1
* [Repository](https://chaitr91@bitbucket.org/chaitr91/litmuscc.git)

### Usage ###

* npm install
* grunt build

### Dependencies ###
* Important Note: Please Install mongodb running locally on Port No:27017;
* Refer MongoDbReadme on the Repository for installation instructions.

### MQTT Broker ###
* Locally implemented on mosca server.
* Front-end subscribes to MQTT broker(channel:1885) by angular-paho.
* Backend publisher to MQTT broker(channel:1885) by MQTTjs.

### About litmuscc ###

* Angualar-nvd3 chart used to give a time-series visualization.
* Angualar-nvd3 chart continuously updated by receiving published data from MQTT broker.
* Data is generated randomly.
* Supports user authentication using PassportJs.
* Backend Express Server sets up routes for front-end user authentication.
* New  User Registration also supported.
