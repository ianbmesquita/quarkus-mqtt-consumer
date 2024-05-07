// Importar a biblioteca mqtt
const mqtt = require('mqtt');

// Conectar ao broker MQTT
const client = mqtt.connect('tcp://kafka-strimzi-kafka-bootstrap.amq-strimzi.svc.cluster.local:9092');

// Tópico que desejamos subscrever
const topic = 'messages_default';

client.on('connect', function () {
    console.log('Connected to broker');

    while(true) {
        client.subscribe(topic, function (err) {
            if (!err) {
                console.log(`Subscribed to "${topic}"`);
            } else {
                console.error('Subscription error:', err);
            }
        });
    }
});

client.on('message', function (topic, message) {
    // Mensagem é um buffer
    console.log(`Message received on "${topic}": ${message.toString()}`);
});

client.on('error', function (error) {
    console.error('Connection error:', error);
});
