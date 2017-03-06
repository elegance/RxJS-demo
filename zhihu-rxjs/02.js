const Rx = require('rx');

let timeA$ = Rx.Observable.interval(1000);
let timeB$ = timeA$.filter(num => {
    return (num % 2 != 0) 
        && (num % 3 != 0)
        && (num % 5 != 0)
        && (num % 7 != 0);
});
// for (let a in timeA$) {
//     console.log(a)
// }
let timeC$ = timeB$.debounce(3000)
let timeD$ = timeC$.delay(2000);

let a = [],
    b = [],
    c = [],
    d = [];

timeA$.subscribe((s) => a.push(s));
timeB$.subscribe((s) => b.push(s));
timeC$.subscribe((s) => c.push(s));
timeD$.subscribe((s) => d.push(s));

setTimeout(() => {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    process.exit();
}, 22 * 1000);