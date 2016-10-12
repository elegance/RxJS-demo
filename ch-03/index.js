window.onload = function() {
    var elClock = document.getElementById('clock');
    var getTime =  function(){
        var _ = ['00','01','02','03','04','05','06','07','08','09'],  //补零
            d = new Date(), h = d.getHours(),m = d.getMinutes(),s = d.getSeconds();
    	return [_[h]||h,_[m]||m,_[s]||s].join(":");
    };
    
    var tickStream = Rx.Observable.create((observer) => {
        setInterval(() => {
            observer.onNext(getTime());
        }, 1000);
    });
    
    var uiRefresher = Rx.Observer.create((data) => {
        elClock.textContent = data;
    });
    
    tickStream.subscribe(uiRefresher);
};