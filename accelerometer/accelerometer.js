var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

// Initialize the accelerometer.
accel.on('ready', function () {
  accel.setOutputRate(1.5, function() {
    accel.on('data', function(theData) {
      console.log('x:', theData[0].toFixed(2),
      'y:', theData[1].toFixed(2),
      'z:', theData[2].toFixed(2));
    });
  });
});

accel.on('error', function(err){
  console.log('Error:', err);
});

