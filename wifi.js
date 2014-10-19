var wifi = require('wifi-cc3000');

var SSID = "Verizon-SM-G900V-3E40";
var pass = "gavinpham";
var sec = "wpa2";

function tryConnect(){
  if (!wifi.isBusy()) {
    connect();
  } else {
    console.log("wifi busy, trying again");
    setTimeout(function(){
      tryConnect();
    }, 1000);
  } 
}

function connect(){
  wifi.connect({
    security: sec
    , ssid: SSID
    , password: pass
    , timeout: 60 // in seconds
  });
}

var init = function() {
    wifi.on('connect', function(err, data){
        //console.log("wifi connected", err, data);
        console.log('wifi connected');
    });
    
    wifi.on('disconnect', function(err, data){
        console.log("wifi disconnect", err, data);
        tryConnect();
    });
    
    wifi.on('timeout', function(err){
        console.log("wifi timeout"); 
        tryConnect();
    });
    
    wifi.on('error', function(err){
        console.log("error emitted", err);
        tryConnect();
    });
    
    tryConnect();
};

var off = function() {
    wifi.disconnect();
};

module.exports = {
    init: init,
    off: off
};