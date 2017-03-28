/**
 * delayWhen 的 区别是会影响每一个元素，延迟的基准是每个元素原本的时间点
 */
const Rx = require('rxjs');

let source = Rx.Observable.interval(300).take(5);

let example = source.delayWhen(
                            x => Rx.Observable.interval(100 * x).take(1)
                        );

example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')}
});