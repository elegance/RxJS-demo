window.onload = function() {
    var elClock = document.getElementById('clock');
    
    Rx.Observable.create((observer) => {
        var i = 10,
            timer = setInterval(() => {
                observer.onNext(i--);
                
                if (i < 0) {
                    observer.onCompleted();
                    clearInterval(timer);
                }
            }, 1000);
    }).subscribe((data) => {
        elClock.textContent = data;
    }, (err) => {
        console.error(err);
    }, () => {
        console.log('completed!');
    });
};

