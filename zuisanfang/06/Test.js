const Rx = require('rxjs');

let observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry');
        observer.next('Anna');

        setTimeout(() => {
            observer.next('RxJS 30 days!');
            observer.error('err');
            observer.complete();
            observer.next('not work');
        });
    });

console.log('start')
observable.subscribe({
    next: (data) => {
        console.log(data);
    },
    error: (err) => {
        console.log(err);
    },
    complete: () => {
        console.log('complete');
    }
});
console.log('end');