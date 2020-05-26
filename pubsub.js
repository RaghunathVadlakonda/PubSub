class PubSub {
    constructor() {
        this.channels = {
            topic: {
                message: '',
                subscribers: []
            }
        }
    }
    
    subscribe(subscriber, channel) {
        console.log(`subscribing to ${channel}`);
        // this.channels[channel].subscribers.push(subscriber);
    }

    publish(publisher, channel, message) {
        console.log(`message ${message}`);
        Console.log(`channel ${channel}`);
        // this.channels[channel].message = message;
    }
}

function publish(res) {
    var message = res('message').value;
    var channel = res('channel').value;
    var ws = new WebSocket('ws://' + host + ':8080');
    ws.onopen = function () {
        ws.send(JSON.stringify({
            request: 'PUBLISH',
            message: message,
            channel: channel
        }));
        ws.close();
    };
}

function subscribe(res) {
    var message = res('message');
    var channel = res('channel').value;
    var ws = new WebSocket('ws://' + host + ':8080');
    ws.onopen = function () {
        ws.send(JSON.stringify({
            request: 'SUBSCRIBE',
            message: '',
            channel: channel
        }));
        ws.onmessage = function(event){
            data = JSON.parse(event.data);
            console.log(`message`, data.message);
        };
    };
}
module.exports = PubSub;