var tes = undefined;

var init = function(tessel) {
    tes = tessel;
};

var blinkGreen = function(num) {
    tes.led[0].write(1);
    if(num) {
        setTimeout(function() {
            tes.led[0].write(0);
            setTimeout(function() {
                blinkGreen(num-1);
            }, 150);
        }, 500);
    } else {
        setTimeout(function() {
            tes.led[0].write(0);
        }, 500);
    }
};

var blinkBlue = function(num) {
    tes.led[1].write(1);
    if(num) {
        setTimeout(function() {
            tes.led[1].write(0);
            setTimeout(function() {
                blinkBlue(num-1);
            }, 150);
        }, 500);
    } else {
        setTimeout(function() {
            tes.led[1].write(0);
        }, 500);
    }
};

module.exports = {
    init: init,
    blinkBlue: blinkBlue,
    blinkGreen: blinkGreen
};