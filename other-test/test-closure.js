// http://www.cnblogs.com/wangfupeng1988/p/3994065.html
function fn() {
    var max = 10;

    return function bar(num) {
        if (num > max) {
            console.log(num);
        }
    }
}

var f1 = fn(),
    max = 100;

f1(11);