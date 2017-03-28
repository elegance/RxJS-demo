/**
 * 实践上我们不太会用 retryWhen 来做重新订阅的延迟
 * 通常是直接用 catch 做到这件事
 */
const Rx = require('rxjs');

const source = Rx.Observable.from(['a', 'b', 'c', 'd', 2])
                .zip(Rx.Observable.interval(500), (x, y) => x);

const example = source
                    .map(x => x.toUpperCase())
                    .retryWhen(errorObs => errorObs.delay(1000)); 

example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')},
    error: err => console.log('Error:', err)  
});