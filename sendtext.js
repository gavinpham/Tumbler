module.exports = function(phoneNumber) {
  var twilio = require('twilio')('accid', 'token');
  
  twilio.messages.create({
      body: "Your laundry is finished!!",
      to: phoneNumber,
      from: "+19090909090"
  }, function(err, message) {
    if(err) console.log(err);
    else console.log(message);
  });
}
