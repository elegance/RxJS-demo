// "小偷" 我可被观察
function Observable(generator) { // 生成逻辑封装到一个函数中，延迟到应用开发时再实现
    this.generator = generator;
}

// 提供接口 subscribe，让"警察"来订阅我， 达到主动通知“警察”
Observable.prototype.subscribe = function(observer) {
    // "警察" 真正调用了订阅我时，我才执行生成器
    console.log('小偷：你subscribe了我，我搞事情了，会告诉你的', observer);
    this.generator.call(this, observer);
}

// “警察”  观察者
function Observer(consumer) { // 消费逻辑装到一个函数中，延迟到应用开发时再实现
    this.consumer = consumer;
}

// 当小偷告诉了警察“我要搞事情了”的时候，警察这个时候具体要做的事情
Observer.prototype.onNotify = function(data) {
    console.log('小偷，要搞事情了。')
    this.consumer.call(this, data)
}

// 数据： 生成 =》 发送 =》 利用

// 可被观察对象生成数据
// 观察者利用数据
// 观察者订阅 可被观察对象，可被观察对象变动时 发送通知 观察者

// 意味着：
// 可被观察对象中 需要注入 观察者
// 


var observable = new Observable(function(consumer) {
    var cnt = 0;
    setInterval(function() {
        console.log(`事件起源，第${++cnt}次伸手`);
        consumer.onNotify(cnt);
    }, 1000);
});


var consumer = new Observer(function(data) {
    console.log(`观察者监听到事件了，这是第${data}次`)
}); // 

observable.subscribe(consumer);


// observable : 生成数据、通知观察者 ===> 内置generator 来生成数据，通过调用观察者提供的 方法来通知 观察者

// observer: dome something

// observable subscribe observer 关联注入
