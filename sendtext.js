// function to send text when laundry is finished
// sendtext(phoneNumber);
// ex usage: sendtext("+15042750135");
module.exports = function(phoneNumber) {
  console.log("Check");
  var twilio = require('twilio')('ACd5e9ef254743b0fd8f1c9a5e46a777b9', '29c264780e2c7619a854b907cc212632');
  
  twilio.messages.create({
      body: "Your laundry is finished!!",
      to: phoneNumber,
      from: "+19494385114"
  }, function(err, message) {
    if(err) console.log(err);
    else console.log(message);
  });
}
