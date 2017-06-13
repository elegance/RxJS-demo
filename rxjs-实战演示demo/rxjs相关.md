### 特点
关键字： 抽象、函数式编程、响应、观察者模式 RFP
1. Reactive Programming 的兴起 - 响应式编程是面向数据流和变化传播的一种编程范型
	angualr中RxJS为标配、Vue底层采用Reactive Programing，另有vue-rx、react
2. 多语言的支持   
	rxjava、rxruby、rxpy..等等 http://reactivex.io/languages.html
3. Functional Programming -- lodash 链式 ：可读性、可维护性 --lamda表达式


**RxJS 是用来解决异步和事件组合问题**

1. 竞态条件 (Race Condition) -- 对同一个资源同时做多次的异步存取时(搜索节流)
2. 内存泄漏 (Memory Leak) -- 传统网站的行为，我们每次换页都是整页重刷，并重新执行 JavaScript，所以不太需要理会内存的问题。 spa 事件绑定、释放
3. 复杂的状态 (Complex State) -- 
4. 异常处理 (Exception Handling) -- 针对不同的api

### 类比 
`rxjs` 之于 `angular2/vue-rx/redux-rx` 就点类似于 `jquery` 之于`easyui、jqueryui`

就像`jquery`的出现 极大的简化dom编程，更利于编写优雅、可维护的代码。

### 解决了什么问题 -- 应用场景
中间讲到再提出具体的应用场景，没有一一举尽。

#### 基础相关概念
Observable 可以被观察
Observer 观察者
Subject   （redux-observable ）
Schedulers

#### Observable

##### observable 的建立

1. observable.create
```javascript
	Rx.Observable.create((observer) {
		observer.next('hello');
		observer.next('rxjs');
		observer.complete();
		observer.next('I am invisible!');
	});

	var observer = { // 另外观察者可以是不完整的，他可以只具有一个 next 方法
		next:
		error:
		complete:
	};

	// 支持同步、异步的演示
```

2.  of/from
```javascript
	Rx.Observable.of('a', 'b', 'c'); // 发射指定参数的值，一个接一个，最后发出complete

	Rx.Observable.from('hello'); //收任何可列举的参数，如字符串，数组，set，map，Iterator
	Rx.Observable.from([1, 2, 3]);
	Rx.Observable.from(new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('hello rxjs');
		}, 3000);
	}));
```

3. 和时间有关的 interval/timer
```javascript
	Rx.Observable.interval(1000);
	// =>
	Rx.Observable.create((observer) => {
		var i = 0;
		setInterval(() => {
			observer.next(i++);
		});
	});

	Rx.Observable.timer(3000, 2000); // initialDelay:number|Date, period
```

4. 和事件相关的 fromEvent/fromEventPattern
从事件监听 fromEvent,有时候 Observable 会是一个无限的序列，例如 click 事件，这时 complete 方法
```javascript
	Rx.Observable.fromEvent(document.body, 'click');
```
-- demo 1.单次事件绑定
-- demo 1/2/3/4

5. 特殊的 empty, never, throw
```javascript
	// empty 有点像是数学上的 **零(0)**，虽然有时候好像没什麽，但却非常的重要，$.noop()
	Rx.Observable.empty(); // 订阅后立即发出 complete

	// never 无穷的 observable，订阅后什么都不发生，可以把 never 想像成一个结束在无穷久以后的 observable
	Rx.Observable.never();

	// throw 它也就只做一件事就是抛出错误
	Rx.Observable.throw('oop');

```

Subscription: 订阅 observable会传回subscription ，这个对象具有`unsubscribe`方法，释放资源

`Events observable` 尽量不要用 `unsubscribe` ，通常我们会使用 `takeUntil`，在某个事件发生后来完成 `Event observable`

#### Marble diagrams
`-`: 来表示一小段时间

`------`：串起就代表一个 observable

`X`: 则代表有错误发生 `--------X`

`|`: 则代表observable结束 `--------|`

`Rx.Observable.interval(1000)`: `-----0-----1-----2-----3--...`

`Rx.Observable.of(1, 2, 3, 4)`: `(1234)|` //小括号代表同步发生

##### Operators

###### 基础转换过滤

1. map，Observable 的 map 方法使用上跟数组的 map 是一样的，传入callback fn, callback会带入每次发出的元素，然后我们回传新的元素
```javascript
var source = Rx.Observable.interval(1000);
var newest = source.map(x => x + 2);
source: -----0-----1-----2-----3--...
            map(x => x + 2)
newest: -----2-----3-----4-----5--...
```

2. mapTo，把传进来的值改成一个固定的值
```javascript
var source = Rx.Observable.interval(1000);
var newest = source.mapTo(2);
```

3. filter, 过滤值
```javascript
var source = Rx.Observable.interval(1000);
var newest = source.filter(x => x % 2 === 0);
```

` map`, `filter` 这些方法其实都跟数组的相同，因为这些都是 `functional programming` 的通用函数，就算换个语言也有机会看到相同的命名及相同的用法

`Observable` 跟 `Array` 的 `operators(map, filter)`，在行为上还是有极大的差异。当我们的数据量很大时，`Observable` 的性能会好上非常多` 就像命令tail/head，vi编辑对比样

4. take/first/takeUntil
分别对应 取指定数量的个数、拿第一个、拿元素直到发生了指定事件则complete
```javascript
var source = Rx.Observable.interval(1000);
source.take(3);

var source = Rx.Observable.interval(1000);
var click = Rx.Observable.fromEvent(document.body, 'click');
var newest = source.takeUntil(click); // body 点击后 将complete
newest.subscribe(...);
```

5. concatAll 
有时Observable送出的元素又是一个observable，就像一个二维数组，数组里面的元素是数组，这是可以使用`concatAll`将其摊平，可以直接把concatAll想成把所有元素concat起来
```javascript
var click = Rx.Observable.fromEvent(document.body, 'click');
var source = click.map(e => Rx.Observable.of(1, 2, 3));

var newest = source.concatAll();
```
**`concatAll 后的行为永远都是先处理第一个 observable，等到当前处理的结束后才会再处理下一个**
```javascript
var s1 = Rx.Observable.interval(1000).take(5);
var s2 = Rx.Observable.interval(500).take(2);
var s3 = Rx.Observable.interval(2000).take(1);

var ss = Rx.Observable.of(s1, s2, s3);
var newest = ss.concatAll();
// newest.subscribe();
```
// 完毕讲解- demo 6 简单拖拽

6. buffer: buffer/bufferCount/bufferTime/bufferToggle/bufferWhen
```javascript
var source = Rx.Observable.interval(300);
var separate = Rx.Observable.interval(1000);

source.buffer(separate).subscribe(....);

source.bufferCount(5).subscribe(...);
...
```

6. skip/takeLast/last/concat
```javascript
// 可以当静态方法使用
var source = Rx.Observable.interval(1000).take(3);
var source2 = Rx.Observable.of(3);
var source3 = Rx.Observable.of(4,5,6);
var example = Rx.Observable.concat(source, source2, source3);
```

7. merge 
merge 跟 concat 一样都是用来合并 observable，但他们在行为上有非常大的不同
```javascript
var source = Rx.Observable.interval(500).take(3);
var source2 = Rx.Observable.interval(300).take(6);
var example = source.merge(source2);
```
merge 把多个 observable 同时处理，这跟 concat 一次处理一个 observable 是完全不一样的，由于是同时处理行为会变得较为复杂
图：
	500	     1000	    1500
300	 600	900   1200  1500    1800
// demo 7 数字的加减 --- 不同的事件来源，抽象出相同的行为 视频播放：暂停与停止按钮

第5个两个同时输出

8. combineLatest
```javascript
var source = Rx.Observable.interval(500).take(3);
var source2 = Rx.Observable.interval(300).take(6);

var newest = source.combineLatest(newest, );

// code bmi 例子
var heights = Rx.Observable.from([1.70, 1.71, 1.73]);
var weights = Rx.Observable.from([60, 65, 70, 72, 74, 75, 78]);

heights.combineLatest(weights, (h, w) => {
	return w / (h * h);
})
.map(v => v.toFixed(2))
.subscribe(console.log);
```

#### rxjs vs promise (异步解决方案：回调、thenable- promise、generator、await/async)
如果你没被异步问题**困扰**的话，那就不要使用 RxJS 吧，因为 Promise 已经能够解决简单的异步问题了。

#### 后语


提高自身的要求：框架是来解决一些问题的，或者说为相关问题提供更优雅的解决方案，这些框架没有出现前，好的编码者也能写出较为优美的代码，就算出现了这类框架，不好的编码者

也会制造出不会优雅的代码，例如像有人使用jquery/angular (1. 混编，原生选择器接口、自己写ajax兼容，自己写事件处理等此类造轮现象 2. angualr 不使用模板 在js中拼接html等违背)

全面了解，适时使用：总之用了什么框架尽量了解其核心或者其主要解决的是那几类问题，解决思想是什么，框架本身有什么短板等等，碰到新的问题先从框架类找方案， 不要再没了解清楚前自己写xx tab/弹框等,或者引入新的xxx，最终俨然成了一幅国共联合就中国的画面