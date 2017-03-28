const Rx = require('rxjs');

const source = Rx.Observable.from(['a', 'b', 'c', 'd', 2])
                .zip(Rx.Observable.interval(500), (x, y) => x);

const example = source
                    .map(x => x.toUpperCase())
                    // .retry(1) // 指定重试1次，出现异常则会抛出，下面会输出error信息
                    .retry();   // 没有指定次数将一直重试下去     

example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')},
    error: err => console.log('Error:', err)  
});