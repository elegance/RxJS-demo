const moment = require('moment');
const Rx = require('rxjs/Rx');

/** 
 * 小偷：
 * attr: 名称、伸手次数
 * triggerMethos: 伸手()
 */
function Xt(name) {
    this.name = name;
    this.counter = 0;
}

Xt.prototype = {
    constructor: Xt,
    shenShou: function() {
        console.log(`${this.name} 开始第${++this.counter}次伸手(${moment(new Date()).format()})。`)
    }
};

function Jc(name) {
    this.name = name;
}

Jc.prototype = {
    constructor: Jc,
    catchXt: function(xt) {
        console.log(`${this.name} catchXt ${xt.name}第${xt.counter}次伸手。`)
    }
};

var xt1 = new Xt('小偷1号');

var jc1 = new Jc('警察No.1');
var jc2 = new Jc('警察No.2');

var tickStream = Rx.Observable.create(function(observer) {
    setInterval(function() {
        xt1.shenShou();
        observer.next(xt1);
    }, 1000);
});

var jcDo = {
    next: (data) => {
        jc1.catchXt(data);
        jc2.catchXt(data);
    }
};

tickStream.subscribe(jcDo);