import createReducer from '../util/createReducer'
import { ACTION_HANDLERS } from '../actions/user'
// import initState from 'STORE/initState'

let initState = null ;
export default createReducer(initState, ACTION_HANDLERS)
