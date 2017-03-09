const Rx = require('rx');

var weight = Rx.Observable.of(70, 72, 76, 79, 75);
var height = Rx.Observable.of(1.76, 1.77, 1.78);
var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => { console.log(w, h); return w / (h * h)});

bmi.subscribe(x => console.log('BMI is ' + x));


let a$ = Rx.Observable.of('a', 'b', 'c', 'd', 'e');
let b$ = Rx.Observable.of('1', '2', '3', '4');

let c$ = Rx.Observable.combineLatest(a$, b$, (a, b) => a + b);
c$.subscribe(x => console.log('rs is ' + x));


// --a--b------------------------------------------------

// ---1-2--