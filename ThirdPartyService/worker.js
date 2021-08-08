
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

    _Channel = channel
    var queue = 'validation_in_queue';

    channel.assertQueue(queue, {
      durable: true
    });
    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
      
      let id = msg.content.toString();
      console.log(`Received ${id}`);

      //Logic
      let val = 'false';
      if(Math.floor(Math.random() * 100) % 2 === 0){
        val = 'true';
      }

      //Publish to new queue
      publish(`validation_${id}`, val);
      channel.ack(msg);

    }, {
      noAck: false
    });
  });
});


const publish = async (queueName, data) => {
  _Channel.assertQueue(queueName, {
    durable: true,
  });
  _Channel.sendToQueue(queueName, Buffer.from(data));
}