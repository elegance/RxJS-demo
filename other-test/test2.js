const moment = require('moment');

/*
 * 可被观察者
 */
function Observable(generator) {
    this.observers = [];
    this.generator = generator;
}

/**
 * 可被观察者，提供subscribe 来注入观察者
 */
Observable.prototype = {
    constructor: Observable,
    subscribe: function(observer) {
        this.observers.push(observer);
        if (!(this.observers.length > 1)) {
            this.generator.call(this);
        }
        return this;
    }
}

/**
 * 观察者
 */
function Observer(consumer) {
    this.consumer = consumer;
}

Observer.prototype = {
    constructor: Observer,
    onNotify: function(data) {
        this.consumer.call(this, data);
    }
};

/** 
 * 小偷：
 * attr: 名称、伸手次数
 * triggerMethos: 伸手()
 */
function Xt(name) {
    this.name = name;
    this.counter = 0;
}

Xt.prototype = {
    constructor: Xt,
    shenShou: function() {
        console.log(`${this.name} 开始第${++this.counter}次伸手(${moment(new Date()).format()})。`)
    }
};

function Jc(name) {
    this.name = name;
}

Jc.prototype = {
    constructor: Jc,
    catchXt: function(xt) {
        console.log(`${this.name} catchXt ${xt.name}第${xt.counter}次伸手。`)
    }
};

var xt1 = new Xt('小偷1号');

var jc1 = new Jc('警察No.1');
var jc2 = new Jc('警察No.2');

var xt1Observable = new Observable(function(observer) {
    var id = setInterval(function() {
        xt1.shenShou(); // 触发伸手
        xt1Observable.observers.forEach((item) => {
            item.onNotify(xt1); // 通知订阅的警察们，如果没有订阅者，那么这个方法也没有被执行
        });
    }, 1000);
});

var jc1Observer = new Observer(function(data) {
    jc1.catchXt(data);
});

var jc2Observer = new Observer(function(data) {
    jc2.catchXt(data);
});

xt1Observable
    .subscribe(jc1Observer)
    .subscribe(jc2Observer);