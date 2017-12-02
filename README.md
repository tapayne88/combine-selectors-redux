# `combineSelectors(selectors)`

[![build status](https://img.shields.io/travis/tapayne88/combine-selectors-redux.svg?branch=master&style=flat-square)](https://travis-ci.org/tapayne88/combine-selectors-redux)
[![npm version](https://img.shields.io/npm/v/combine-selectors-redux.svg?style=flat-square)](https://www.npmjs.com/package/combine-selectors-redux)
[![npm downloads](https://img.shields.io/npm/dm/combine-selectors-redux.svg?style=flat-square)](https://www.npmjs.com/package/combine-selectors-redux)

This module follows the patterns set out by redux with `combineReducers`. It allows you to colocate your selectors with the reducer state they work on and simplifies their usage. It follows a pattern outlined by Dan Abramov in a free egghead.io lesson [here](https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers)

The basic idea is to use `combineSelectors` everywhere you use `combineReducer` as you progressively build up your store state. This allows a convenient way to access more complicated derived state (provided through selector functions) following your store state.

Example:
```
export const selectors = combineSelectors({
  potato: potatoSelectors,
  tomato: tomatoSelectors
});
// Like combineReducers, this will produce an object where the selectors are called with the section of the redux state it's keyed by
{
  potato: {
    // ... potato selectors
  },
  tomato: {
    // ... tomato selectors
  },
}
```

The access of your selectors now mirrors your redux state.


#### Example:
#### `reducers/todos.js`

```js
export default function todos(state = {}, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        [action.payload.id]: action.payload.text
      }
    default:
      return state
  }
}

// Selectors
export const getTodo = (state, id) => state[id];
export const getAllIds = state => Object.keys(state);
```

#### `reducers/counter.js`

```js
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// Selectors
export const getCount = state => state;
```

#### `reducers/index.js`

```js
import { combineReducers } from 'redux'
import { combineSelectors } from 'combine-selectors-redux'
import todos, * as todoSelectors from './todos'
import counter, * as counterSelectors from './counter'

export default combineReducers({
  todos,
  counter
})

export const selectors = combineSelectors({
  todos: todoSelectors,
  counter: counterSelectors
})
```

#### `App.js`

```js
import { createStore } from 'redux'
import reducer, { selectors } from './reducers/index'

let store = createStore(reducer)
console.log(store.getState())
// {
//   todos: [],
//   counter: 0
// }

console.log(selectors)
// {
//   todos: function() {...},
//   counter: function() {...}
// }

console.log(selectors.todos.getAllIds())
// []

console.log(selectors.counter.getCount())
// 0
```
