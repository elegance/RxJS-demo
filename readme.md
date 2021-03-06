RxJS是ReactiveX的JavaScript版本，在观察者模式之上，实现了丰富的操作符，适用于各种情况下的序列数据处理。

珠宝图：
http://rxmarbles.com/

# 练习Demo
debounce节流/switchMap取消上一个无用请求 [使用 RxJS 一步步实现搜索示例]()https://github.com/joeyguo/blog/issues/11

汇智：http://www.hubwiz.com/course/569d92e3acf9a45a69b05154/

### 扩展的观察者模式
Reference for http://gank.io/post/560e15be2dca930e00da1083

> 
观察者模式面向的需求是：A对象(观察者)对B对象(被观察者)的某种变化高度敏感，需要在B变化的一瞬间做出反应。
举个例子：`警察`需要在`小偷` `伸手`作案时实施抓捕。这个例子中：警察是观察者，小偷是被观察者、伸手是被观察者发出的变化，警察需要时刻盯着小偷，才能保证不会漏过任何瞬间。
在程序中警察叔叔就不用这么累了，不需要时时刻刻盯着小偷，程序中是采用**注册**(Register)或者称之为**订阅**(Subscribe)的方式，警察告诉下小偷：你伸手的时候，务必通知我。
程序的世界中就是这么的和谐 -_-||，当然这是得益于我们可以随意定制自己程序中的观察者和被观察者。

关键字：
Observer: 观察者
subscribe: 订阅
Observable: 被观察者/可观察者
    onNext(param): 触发变化
    onCompleted(): 事件队列完结（当不会再有新的 onNext() 发出时，需要触发 onCompleted() 方法作为标志）
    onError(): 事件队列异常

