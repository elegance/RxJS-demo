const Rx = require('rxjs');

var commonObserver = {
    next: (v) => {
        console.log(v);
    },
    complete: () => {
        console.log('complete!');
    },
    error: (err) => {
        console.error('Throw Error' + err);
    }
};

// var intervalSource = Rx.Observable.create((observer) => {
//     var i = 0;
//     setInterval(() => {
//         observer.next(i++);
//     }, 1000);
// });
// intervalSource.subscribe(commonObserver);

// var intervalSource2 = Rx.Observable.interval(1000); //基本等效于上面
// intervalSource2.subscribe(commonObserver);


var timerSource = Rx.Observable.timer(1000, 5000); // initialDelay   period
var subscription = timerSource.subscribe(commonObserver);
setTimeout(() => {
    subscription.unsubscribe();
}, 10 * 1000)
