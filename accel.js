var led = require('./led');

var accel;

var accelData = [];
var accelAvg = {
  'x': 0,
  'y': 0,
  'z': 0
};
var lastCheck = {
  'x': 0,
  'y': 0,
  'z': 0
};

var init = function(tessel) {
  accel = require('accel-mma84').use(tessel.port.B);
  
  // see https://github.com/tessel/accel-mma84 for accel stuff
  accel.on('ready', function () {
    accel.setScaleRange(2);
    accel.setOutputRate(5, function() {
      accel.on('data', function(theData) {
        if(accelData.length >= 125) accelData.shift();
        accelData.push(theData);
        //console.log(theData);
        accelAvg = {
          'x': 0,
          'y': 0,
          'z': 0
        };
        for(var i = 0; i < accelData.length - 1; i++) {
          accelAvg.x += theData[0];
          accelAvg.y += theData[1];
          accelAvg.z += theData[2] - .8; 
        }
        accelAvg.x = accelAvg.x / (accelData.length - 1);
        accelAvg.y = accelAvg.y / (accelData.length - 1);
        accelAvg.z = accelAvg.z / (accelData.length - 1);
      });
    });
  });
  
  accel.on('error', function(err){
    console.log('Error:', err);
  });
};

var update = function() {
  lastCheck = accelAvg;
}

// should return bool to say if laundry seems complete
var complete = function() {
    var lastVector = Math.sqrt(Math.pow(lastCheck.x, 2) + Math.pow(lastCheck.y, 2) + Math.pow(lastCheck.z, 2));
    var avgVector = Math.sqrt(Math.pow(accelAvg.x, 2) + Math.pow(accelAvg.y, 2) + Math.pow(accelAvg.z, 2));
    
    console.log('accelavgs: ', avgVector, lastVector);
    
    if(accelData.length < 125) {
      return false;
    } else if(lastCheck.x === 0 && lastCheck.y === 0 && lastCheck.z === 0) {
      update();
      return false;
    } else if(avgVector < lastVector*.77) {
      console.log('accel complete');
      led.blinkGreen(3);
      return true;
    } else {
      update();
      return false;
    }
};

var off = function() {
  accel.on('data', function() { });
};

module.exports = {
  init: init,
  complete: complete,
  update: update,
  off: off
};