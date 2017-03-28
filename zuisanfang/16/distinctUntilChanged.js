const Rx = require('rxjs');

const source = Rx.Observable.from(['a', 'b', 'c', 'c', 'b'])
                .zip(Rx.Observable.interval(300), (x, y) => x);

const example = source.distinctUntilChanged(); // 当发生改变还是重复的则去除
example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')}
});