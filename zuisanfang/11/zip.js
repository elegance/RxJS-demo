
const Rx = require('rxjs');

let source = Rx.Observable.interval(500).take(3);
let newest = Rx.Observable.interval(300).take(6);

// zip 取相同 顺序位 传入 callback
let example = source.zip(newest, (x, y) => '' + x + y);

example.subscribe({
    next: (v) => {console.log(v); },
    complete: () => { console.log('complete');}
});

// source: ----0----1----2|
// newest: --0--1--2--3--4--5|
//      zip: (newest, (x, y) => '' + x +y)
//example: --00--11-22|

// zip 把各个 observable 相同顺位送出的值传入 callback，这经常拿来做demo使用
// 比如我们想要间隔100ms送出'h'，'e','l','l','o'，就可以这么做
let strSource = Rx.Observable.from('hello');
let itv100 = Rx.Observable.interval(100);

strSource.zip(itv100, (x, y) => x)
    .subscribe({
        next: (v) => {console.log(v); },
        complete: () => { console.log('complete');}
    });