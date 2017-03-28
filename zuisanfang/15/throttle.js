const Rx = require('rxjs');

const source = Rx.Observable.interval(300).take(5);
const example = source.throttleTime(1000);

example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')}
});
