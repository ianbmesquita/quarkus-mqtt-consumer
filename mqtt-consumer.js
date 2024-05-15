// Importar a biblioteca mqtt
const mqtt = require('mqtt');

// Conectar ao broker MQTT do serviço mqtt-bridge
const client = mqtt.connect('mqtt://mqtt-bridge.amq-strimzi.svc.cluster.local:1883');

// Tópico que desejamos subscrever
const topic = 'messages_default';

client.on('connect', function () {
    console.log('Connected to broker');
        client.subscribe(topic, function (err) {
            if (!err) {
                console.log(`Subscribed to "${topic}"`);
            } else {
                console.error('Subscription error:', err);
            }
        });
});

client.on('message', function (topic, message) {
    // Mensagem é um buffer
    console.log(`Message received on "${topic}": ${message.toString()}`);
});

client.on('error', function (error) {
    console.error('Connection error:', error);
});
