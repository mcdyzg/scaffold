import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import store from '../store'
import userReducer from './user'
import promiseReducer from './promise'

// ================================
// 同步的 Reducers（即应用初始化所必需的）
// ================================
const syncReducers = {
  // router: routerReducer,
  user: userReducer,
  promise: promiseReducer,
}

// ================================
// 异步加载的 Reducers（Code Splitting 按需加载的）
// ================================
const asyncReducers = {}

/**
 * @return {Function} rootReducer
 */
export default function createRootReducer() {
  return combineReducers({
    ...syncReducers,
    ...asyncReducers
  })
}

/**
 * 按需加载时，立即注入对应的 Reducer
 * @param  {String}   key
 * @param  {Function} reducer
 */
// export function injectReducer(key, reducer) {
//   asyncReducers[key] = reducer
//   store.replaceReducer(createRootReducer()) // 替换当前的 rootReducer
// }
