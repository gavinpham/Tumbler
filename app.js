var sendtext = require('./sendtext'); 

var tessel = require('tessel');

var accel = require('./accel');
var ambient = require('./ambient');
var wifi = require('./wifi');
var led = require('./led');

led.init(tessel);
accel.init(tessel);
ambient.init(tessel);
wifi.init();

var turnAllOff = function() {
    clearInterval(checking); // turns off checking
    accel.off();
    ambient.off();
    //wifi.off();
};

// main loop
var checkForCompletion = function() {
    if(accel.complete() && ambient.complete()) {
        sendtext("+19492446246");
        turnAllOff();
    }
};

// checks for laundry completion every 2.5 seconds
var checking = setInterval(checkForCompletion, 2500);