const Rx = require('rxjs');

let source = Rx.Observable.from('hello')
             .zip(Rx.Observable.interval(600), (x, y) => x);

let example = source.scan((acc, curr) => acc + curr, ''); // scan 与 数组的 reducer 一毛一样，第一个参数回调函数(累加器， 当前值), 第二个参数：初始种子

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});