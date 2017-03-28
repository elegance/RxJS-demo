/**
 * delay延迟observable一开始发送元素的时间点，延迟指定的时间，或者延迟到指定的时间点开始
 */
const Rx = require('rxjs');

let source = Rx.Observable.interval(300).take(5);

let example = source.delay(500); // delay延迟observable一开始发送元素的时间点
example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')}
});

let example2 = source.delay(new Date(new Date().getTime() + 2000)); // 延迟到某个时间点开始发送元素
example2.subscribe({
    next: (v) => { console.log('delya(Date)', v)},
    complete: () => { console.log('delay(Date)complete!')}
});