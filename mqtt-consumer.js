const mqtt = require('mqtt');

const options = {
    reconnectPeriod: 5000,  // Tenta reconectar a cada 5000 ms (5 segundos)
};

const client = mqtt.connect('mqtt://mqtt-bridge.amq-strimzi.svc.cluster.local:1883', options);
const topic = 'messages_default';

client.on('connect', function () {
    console.log('Connected to broker');
    // Verificar se já está inscrito antes de tentar inscrever novamente
    if (!client.connected) {
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
    console.log(`Message received on "${topic}": ${message.toString()}`);
});

client.on('error', function (error) {
    console.error('Connection error:', error);
});

client.on('reconnect', function () {
    console.log('Reconnecting...');
});
