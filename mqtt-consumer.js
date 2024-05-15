const mqtt = require('mqtt');

const options = {
    reconnectPeriod: 5000,
    keepalive: 60,
    connectTimeout: 30 * 1000 // Tempo de timeout para a conexão em milissegundos
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

// Adicionado tratamento de evento 'close'
client.on('close', function () {
    console.log('Connection closed');
});

// Adicionado tratamento de evento 'offline'
client.on('offline', function () {
    console.log('Client is offline');
});

