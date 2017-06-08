// import userService from 'SERVICE/userService'
// ================================
// Action Type
// ================================
const Add = 'Add'

// ================================
// Action Creator
// ================================
const add = (val) => ({
  type: Add,
  payload: val
})
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
export {
  add
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [Add]: (state, { payload }) => state+payload, // payload is userData
  // [LOG_OUT]: () => null
}
