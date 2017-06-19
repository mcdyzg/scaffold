import DB from '../db/db'

// ================================
// Action Type
// ================================
const PROMISEACTION = 'promiseAction'
const PROMISEACTION2 = 'promiseAction2'




// ================================
// Action Creator
// ================================
export const promiseAction = (data) => {
	// const {title} = data
	return {
		type: PROMISEACTION,
		data:{
			...data,
			date:Date.now(),
		}
	}
}

export const promiseAction2 = ({ name }) => (dispatch, getState)=>{
	return DB.Test.getData({
    	q:name
    }).then(function (res) {
        if(res){
            dispatch(promiseAction({
            	title:res.items[0].avatar_url
            }))
        }
    });
}

export const promiseAction3 = ({ name }) => {
	return (dispatch, getState)=>{
		// 这里的getState是未改变之前的数据
		console.log(getState())
		return dispatch(promiseAction2({name}))
	}
}

export const promiseAction4 = ({ name }) => {
	return async (dispatch, getState)=>{
		await DB.Test.getData({
        	q:name
        }).then(function (res) {
            if(res){
                dispatch(promiseAction({
                	title:res.items[0].avatar_url
                }))
            }
        });
	}
}

export const promiseAction5 = ({ name }) => {
	return async (dispatch, getState)=>{
		dispatch(promiseAction({find:{type:'haha',rate:'hehe'}}))

		let data = await DB.Test.getData({
        	q:name
        })

		dispatch(promiseAction2({name:data.total_count}))
	}
}
export const promiseAction6 = ({ name }) => {
	return async (dispatch, getState)=>{
		dispatch(promiseAction({find:{type:'haha',rate:'hehe'}}))

		// 因为promiseAction2是个异步的action,所以如果想下面的请求等待promiseAction2完成后再执行的话，需要加await,如果不加，那么上下两次的请求会同时发
		await dispatch(promiseAction2({name:data.total_count}))

		let data = await DB.Test.getData({
        	q:name
        })


	}
}
	// const loginDone = (userData) => ({
	//   type: LOG_IN,
	//   payload: userData
	// })

// const loginDone = (userDate) => ({
//   type: LOG_IN,
//   payload: userData
// })

// const login = (formData) => {
//   return dispatch => {
//     userService
//       .login(formData)
//       .then(
//         re => dispatch(loginDone(re))
//       )
//   }
// }

// const login = (formData) => {
//   return dispatch => {
//     userService
//       .login(formData)
//       .then(
//         re => dispatch(loginDone(re))
//         )
//   }
// }

// const checkLogin = () => {
//   return dispatch => {
//     userService
//       .checkLogin()
//       .then((re) => {
//         if (!re) return
//         dispatch(loginDone(re))
//       })
//   }
// }

// const logout = () => {
//   return dispatch => {
//     userService
//       .logout()
//       .then(() =>
//         dispatch({
//           type: LOG_OUT
//         })
//       )
//   }
// }
/* default 导出所有 Actions Creator */
// export {
// 	promiseAction,
// 	promiseAction2
// }

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
	[PROMISEACTION]: (state , action) => {
		let { data } = action
		return {
			...state,
			...data,
		}
	},
}
