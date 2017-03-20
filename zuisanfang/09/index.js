const Rx = require('rxjs');

let source = Rx.Observable.interval(1000);
let newest = source.take(3); // 只取前3个元素

newest.subscribe({
    next: (v) => console.log(`take: ${v}`),
    complete: () => console.log('first complete!')
});

let newest2 = source.first(); // 只取observable送出的第1个元素，行为与take(1)一致
newest2.subscribe({
    next: (v) => console.log(`first: ${v}`),
    complete: () => console.log('first complete!')
});

let threeSecNext = Rx.Observable.timer(3000, 1000);
let newest3 = source.takeUntil(threeSecNext); // 当 threeSecNext 有元素推出时，newest3取值结束，until: 到...为止

newest3.subscribe({
    next: (v) => console.log(`takeUntil: ${v}`),
    complete: () => console.log('takeUntil complete!')
});