const Rx = require('rx');
const ReplaySubject = Rx.ReplaySubject;


const 九阴真经 = '天之道，损有余而补不足';

const 黄蓉$ = new Rx.ReplaySubject(Number.MAX_VALUE)
const 郭靖$ = new Rx.ReplaySubject(3)

const 读书$ = Rx.Observable.from(九阴真经.split(''))

读书$.subscribe(黄蓉$)
读书$.subscribe(郭靖$)

// 读书$.subscribe((s) => console.log(s));

黄蓉$.subscribe((s) => console.log('h', s));
郭靖$.subscribe((s) => console.log('g', s));
