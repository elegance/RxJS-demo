var Observable = function(generator) {
    this._generator = generator;
};

Observable.prototype.subcribe = function(observer) {
    this._generator.call(this, observer);
};

var Observer = function(consumer) {
    this._consumer = consumer;
};

Observer.prototype.onNotify = function(data) {
    this._consumer.call(this, data);
};

window.onload = function() {
    var elClock = document.getElementById('clock');
    var getTime =  function(){
        var _ = ['00','01','02','03','04','05','06','07','08','09'],  //补零
            d = new Date(), h = d.getHours(),m = d.getMinutes(),s = d.getSeconds();
    	return [_[h]||h,_[m]||m,_[s]||s].join(":");
    };
    
    var tickStream = new Observable(function(observer) {
        setInterval(function() {
            observer.onNotify(getTime());
        }, 1000);
    });
    
    var uiRefresher = new Observer(function(data) {
        elClock.textContent = data;
    });
    
    tickStream.subcribe(uiRefresher);
};