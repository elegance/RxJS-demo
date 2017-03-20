const Rx = require('rxjs');

let source = Rx.Observable.interval(1000);
source.subscribe(v => console.log(`source: ${v}`))

let newest = source.map(x => x * 2);
newest.subscribe(v => console.log(`map: ${v}`));

let newest2 = source.mapTo(2); // 传入的值改成一个固定的值
newest2.subscribe(v => console.log(`mapTo: ${v}`));

// filter
let newest3 = source.filter(x => x % 2 === 0);
newest3.subscribe(v => console.log(`filter: ${v}`));