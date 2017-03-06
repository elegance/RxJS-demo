function T1(rnner) {
    this.rnner = rnner;
    this.observers = [];
    console.log('T1 init...');
}

T1.prototype.subscribe = function(observer) {
    this.observers.push(observer);
    if (!(this.observers.length > 1)) {
        console.log('call..')
        this.rnner.call(this);
    }
    return this;
}

var observable = new T1(function(observer) {
    setInterval(() => {
        observable.observers.forEach((item) => {
            console.log('rnner ecute..' , item);
        });
    }, 1000)
});
observable
    .subscribe('hello')
    .subscribe('hello2');