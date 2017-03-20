// withLatestFrom 的运作方式与 combineLatest相像，只是它有主从关系，只有在主要的observable送出新值时，才会运行callback
const Rx = require('rxjs');

let main = Rx.Observable.from('hello').zip(Rx.Observable.interval(500), (x, y) => x); // hello （iterator 每隔500 输出一个字符）
let some = Rx.Observable.from([0, 1, 0, 0, 0, 1]).zip(Rx.Observable.interval(300), (x, y) => x);

let example = main.withLatestFrom(some, (x, y) => {
    return y === 1 ? x.toUpperCase() : x;
});
example.subscribe({
    next: (v) => {console.log(v); },
    complete: () => { console.log('complete');}
});