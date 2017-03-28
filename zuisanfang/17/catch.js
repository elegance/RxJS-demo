const Rx = require('rxjs');

const source = Rx.Observable.from(['a', 'b', 'c', 'd', 2])
                .zip(Rx.Observable.interval(500), (x, y) => x);

const example = source
                    .map(x => x.toUpperCase())
                    .catch(error => Rx.Observable.of('h')); // catch 住了错误， 返回h

example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')},
    error: err => console.log('Error:', err)    // 此处了不会打印，上面已经catch住了
});