var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['D']);
var soundData = [];

var sInterval;

var off = function(sInterval){
	clearInterval();
}

ambient.on('ready', function(){

    var getSoundData = function() {
        ambient.getSoundLevel(function(err, sdata){
    		if (err) throw err;
    		//add sound level to data array
    		soundData.push(sdata);
    		console.log("Sound level: ", soundData.pop().toFixed(8));
    	} );
    }

	//checks sound every 1 second
	var sInterval = setInterval(getSoundData, 1000);

});

ambient.on('error', function(err){
	console.log('Error:', err);
});