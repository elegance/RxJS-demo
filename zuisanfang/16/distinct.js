const Rx = require('rxjs');

const source = Rx.Observable.from(['a', 'b', 'c', 'a', 'b'])
                .zip(Rx.Observable.interval(300), (x, y) => x); // 按相同顺位，组合
const example = source.distinct(); // 去重

example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')}
});

const source2 = Rx.Observable.from([{ value: 'a'}, {value: 'b', }, {value: 'c'}, {value: 'a'}, {value: 'c'}])
                    .zip(Rx.Observable.interval(300), (x, y) => x);
const example2 = source2.distinct((x) => {
    return x.value;
});

example2.subscribe({
    next: (v) => { console.log('example2', v)},
    complete: () => { console.log('example2 complete!')}
});