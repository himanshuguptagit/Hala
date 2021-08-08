var amqp = require('amqplib/callback_api');

let _Channel = null;

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    _Channel = channel;
    channel.prefetch(1);
  });
});


module.exports.publish = async (queueName, data) => {
    _Channel.assertQueue(queueName, {
        durable: true
      });
      
    _Channel.sendToQueue(queueName, Buffer.from(data));
}

module.exports.consume = (queueName) => {

    return new Promise((resolve, reject) => {
        _Channel.assertQueue(queueName, {
            durable: true
          });
    
        _Channel.consume(queueName, function(msg) {
            resolve({channel: _Channel, msg: msg});
        }, {noAck: false});
    });



}
