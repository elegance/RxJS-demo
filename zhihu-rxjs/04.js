const Rx = require('rx');

const meAction$ = new Rx.Subject()
const meReducer = (state, payload) => {}

const articleAction$ = new Rx.Subject()
const articleReducer = (state, payload) => {}

const me$ = meAction$.scan(meReducer).startWith({})
const article$ = articleAction$.scan(articleReducer).startWith({})

const state$ = Rx.Observable
  .zip(
    me$,
    article$,
    (me, article) => {me, article}
  )