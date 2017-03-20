const Rx = require('rxjs');

var source = Rx.Observable.of('Jerry', 'Anna');  //同步传递几个值
source.subscribe((v) => {
    console.log(v);
});


var arr = ['Jerry', 'Anna', '2016', '2017', '30 days'];
var source2 = Rx.Observable.from(arr); // from 接收可Iterator

source2.subscribe({
    next: (v) => {
        console.log(v);
    },
    complete: () => {
        console.log('complete！');
    }
});

var source3 = Rx.Observable.from('Hello'); // from 字符串
source3.subscribe({
    next: (v) => {
        console.log(v);
    },
    complete: () => {
        console.log('complete！');
    }
});

var sourcePromise = Rx.Observable
    .from(new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello RxJS');
        }, 3000);
    }));
sourcePromise.subscribe({
    next: (v) => {
        console.log(v);
    },
    complete: () => {
        console.log('complete！');
    }
});

var sourceEmpty = Rx.Observable.empty();
sourceEmpty.subscribe({
    next: (v) => {
        console.log('empty:'+ v);
    },
    complete: () => {
        console.log('empty complete！');
    }
});

var sourceNever = Rx.Observable.never();
sourceNever.subscribe({
    next: (v) => {
        console.log('never:'+ v);
    },
    complete: () => {
        console.log('never complete！');
    }
});

var sourceThrow = Rx.Observable.throw('Oop');
sourceThrow.subscribe({
    error: (err) => {
        console.error(err);
    }
});
