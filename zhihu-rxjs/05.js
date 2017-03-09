const Rx = require('rx');

// 挣钱是为了买房，买房是为了赚钱
const house$ = new Rx.Subject()
const houseCount$ = house$.scan((acc, num) => acc + num, 0).startWith(0)

// 工资始终不涨
// const salary$ = Rx.Observable.interval(100).mapTo(2)
const salary$ = Rx.Observable.interval(100).map(2)
const rent$ = Rx.Observable.interval(3000)
  .withLatestFrom(houseCount$)
  .map(arr => arr[1] * 5)

// 一买了房，就没现金了……
const income$ = Rx.Observable.merge(salary$, rent$)
const cash$ = income$
  .scan((acc, num) => {
    const newSum = acc + num

    const newHouse = Math.floor(newSum / 100)
    if (newHouse > 0) {
    //   house$.next(newHouse)
      house$.onNext(newHouse)
    }

    return newSum % 100
  }, 0)

houseCount$.subscribe(num => console.log(`houseCount: ${num}`))
cash$.subscribe(num => console.log(`cash: ${num}`))
/** 
            工资周期  ———>  工资
                            ↓
房租周期  ———>  租金  ———>  收入  ———>  现金 
                ↑           ↓ 
             房子数量 <——— 新购房
*/