import createReducer from '../util/createReducer'
import { ACTION_HANDLERS } from '../actions/promiseAction'
// import initState from 'STORE/initState'

// 这里的initState区别于createStore时的initState,这里的initState会先执行，而后被createStore时的initState覆盖，但是这里的state不能是undefined,null或其他可以
let initState = {
	// name:'默认',
	// title:'默认',
	// find:{
	// 	type:'默认',
	// 	rate:'默认'
	// },
	// date: Date.now()
}
export default createReducer(initState, ACTION_HANDLERS)
