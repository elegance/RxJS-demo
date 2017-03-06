const Rx = require('rx');
const moment = require('moment');

console.log(moment('2017-03-06 14:21:01').fromNow())

let createAt = '2017-03-06 14:21:01';

class Test {
    constructor() {
        this.diff = '';
        setInterval(() => {
            this.diff = moment(createAt).fromNow();
        }, 1000);
    }
}

let t = new Test();
setInterval(() => console.log(t.diff), 2000);

Rx.Observable.interval(1000).subscribe(() => {
    console.log('observable', moment(createAt).fromNow());
});