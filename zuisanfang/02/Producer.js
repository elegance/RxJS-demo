function Producer() {
    if (!(this instanceof Producer)) {
        throw new Error('请用new Producer()进行实例化！');
    }
    this.listeners = [];
}

Producer.prototype = {
    constructor: Producer,
    
    addListener: function(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        } else {
            throw new Error('入参必须是 function。')
        }
    },

    removeListener: function(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    },

    notify: function(message) {
        this.listeners.forEach((listener) => {
            listener(message);
        });
    }
};

var eggHead = new Producer();

function listener1(message) {
    console.log(message + ' from listener1');
}

function listener2(message) {
    console.log(message + ' from listener2');
}

eggHead.addListener(listener1);
eggHead.addListener(listener2);

eggHead.notify('hello');
eggHead.notify('A new Course');