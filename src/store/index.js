import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from '../reducers'
import middlewares from './middlewares'
// import enhancers from './enhancers'
// import syncHistoryWithStore from './syncHistoryWithStore'
let enhancers = []


// ======================================================
// 实例化 Store
// ======================================================
const store = createStore(
    createRootReducer(),
    window.__INITIAL_STATE__ || {
        user: 10,
        promise: {
            name: '111',
            title: '222',
            find: {
                type: '333',
                rate: '444'
            },
            date: Date.now()
        }
    }, // 前后端同构（服务端渲染）数据同步
    compose(
        applyMiddleware(...middlewares),
        ...enhancers
    )
)

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}

export default store

// ======================================================
// 增强版 history
// ======================================================
// export const history = syncHistoryWithStore(store)
