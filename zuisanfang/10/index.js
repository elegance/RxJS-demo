const Rx = require('rxjs');

let source = Rx.Observable.interval(1000);
let newest = source.skip(3);

newest.subscribe({
    next: (v) => { console.log(`skip: ${v}`);},
    complete: () => { console.log('complete');}
});


let source2 = Rx.Observable.interval(1000).take(6);
let newest2 = source2.takeLast(2);

newest2.subscribe({
    next: (v) => { console.log(`takeLast: ${v}`);},
    complete: () => { console.log('takeLast complete');}
});

let newest3 = source2.last();
newest3.subscribe({
    next: (v) => { console.log(`last: ${v}`);},
    complete: () => { console.log('last complete');}
});

let source3 = Rx.Observable.interval(1000).take(3);
let source4 = Rx.Observable.of(3);
let source5 = Rx.Observable.of(4, 5, 6);
let concatSource = source3.concat(source4, source5); // concat 与 concatAll一样需要等待前一个Observable完成(complete)，才会继续下一个

concatSource.subscribe({
    next: (v) => { console.log(`concat: ${v}`);},
    complete: () => { console.log('concat complete');}
});

// concat 静态使用
Rx.Observable.concat(source3, source4, source5).subscribe({
    next: (v) => { console.log(`static concat: ${v}`);},
    complete: () => { console.log('static concat complete');}
});

// startWith
let source6 = Rx.Observable.interval(1000);
let newest4 = source6.startWith(0); // 在source的开始塞了一个0
newest4.subscribe({
    next: (v) => { console.log(`startWith: ${v}`);},
    complete: () => { console.log('startWith complete');}
});

// merge 类似 concat 但是其同时处理两个流的行为，不必想concat一样需要等待前面流的完成
let mSource1 = Rx.Observable.interval(500);
let mSource2 = Rx.Observable.interval(300);

let mRsSource = mSource1.merge(mSource2);
mRsSource.subscribe({
    next: (v) => { console.log(`merge: ${v}`);},
    complete: () => { console.log('merge complete');}
});