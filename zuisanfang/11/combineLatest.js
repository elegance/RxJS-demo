// 最常见的 BMI 计算
// 我们身高变动时就拿上一次的体重计算新的 BMI，当体重变动时则拿上一次的身高计算 BMI，这就很适合用 combineLatest 来处理
const Rx = require('rxjs');

let source = Rx.Observable.interval(500).take(3);
let newest = Rx.Observable.interval(300).take(6);

// combineLatest : 合并流最后送出的值
let example = source.combineLatest(newest, (x, y) => '' + x + y);
example.subscribe({
    next: (v) => {console.log(v); },
    complete: () => { console.log('complete');}
});

// source: ----0----1----2|
// newest: --0--1--2--3--4--5|
    // combineLatest(newest, (x, y) => '' + x + y)
//example: --00--01--02--12--13--14--24--25

