var led = require('./led');

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port.D);

var soundData = [];
var lastAvg = 0;
var sInterval;

var init = function(tessel) {
    ambient.on('ready', function(){
        var getSoundData = function() {
            ambient.getSoundLevel(function(err, sdata){
        		if (err) throw err;
        		//add sound level to data array
        		if(soundData.length >= 50) soundData.shift();
        		soundData.push(sdata);
        		//console.log("Sound level: ", sdata.toFixed(8));
        	} );
        };

    	//checks sound every 250 milliseconds
    	sInterval = setInterval(getSoundData, 250);
    });

    ambient.on('error', function(err){
	    console.log('Error:', err);
    });
};

var update = function() {
    
}

var complete = function() {
    var soundAvg = 0.0;
    for(var i = 0; i < soundData.length; i++){
	    soundAvg += soundData[i];
	}
    soundAvg = soundAvg / soundData.length;
    	
    console.log('soundavgs: ', soundAvg, lastAvg);
    	
    if(soundData.length < 50){
        return false;   
    } else if(lastAvg === 0) {
        lastAvg = soundAvg;
        return false;
    } else if(soundAvg < lastAvg*0.82) {
        console.log('ambient complete');
        led.blinkBlue(3);
        return true;
    } else {
        lastAvg = soundAvg;
        return false;
    }
};

var off = function(sInterval) {
    clearInterval(sInterval);
};

module.exports = {
    init: init,
    complete: complete,
    update: update,
    off: off
};