const Rx = require('rxjs');

const source = Rx.Observable.interval(300).take(5);
const example = source.debounceTime(1000); // 收到元素，cache元素， 1000ms，如果1000ms内没有接收到新的元素，则把元素送出；
                                           // 否则1000ms内如果收到新的元素，则重新cache元素，重新即时1000ms
                                           // source interval后没有 take(5)，每300ms都有输出，example就不会有输出，example一直在做清除cache，存新cache，重新计时

example.subscribe({
    next: (v) => { console.log(v)},
    complete: () => { console.log('complete!')}
});