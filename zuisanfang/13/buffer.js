const Rx = require('rxjs');

const source = Rx.Observable.interval(300);
const source2 = Rx.Observable.interval(1000);
const example = source.buffer(source2);  // 以 source2 的送出点 作为 buffer分隔

example.subscribe({
    next: (value) => { console.log('     buffer', value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});

//  上面是以 时间 1000 为 间隔buffer，可以简化为以下：
source.bufferTime(1000)
    .subscribe({
        next: (value) => { console.log(' bufferTime', value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });

// 可以固定数量作为间隔 buffer
source.bufferCount(3) // 固定3个一隔 作为一个 buffer输出
    .subscribe({
        next: (value) => { console.log('bufferCount', value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });