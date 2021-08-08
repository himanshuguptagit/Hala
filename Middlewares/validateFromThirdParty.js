
const {publish, consume} = require('../rabbit');
const crypto = require("crypto");

module.exports = async function validateFromThirdParty(req, res, next) {

  const id = crypto.randomBytes(16).toString("hex");
  
  publish("validation_in_queue", id);
  let obj = await consume('validation_out_queue');
  obj.channel.ack(obj.msg);

  let val = obj.msg.content.toString();
  console.log(val);
  if(val === 'false'){
    res.status(401).send("Third party rejected request");
  }else{
    next();
  }

};