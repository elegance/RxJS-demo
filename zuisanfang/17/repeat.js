const Rx = require('rxjs');

const source = Rx.Observable.from(['a', 'b', 'c'])
                .zip(Rx.Observable.interval(500), (x, y) => x);

source
    .repeat() // 无限重复
    // .repeat(2)
    .subscribe({
        next: (v) => { console.log(v)},
        complete: () => { console.log('complete!')},
        error: err => console.log('Error:', err)  
    });