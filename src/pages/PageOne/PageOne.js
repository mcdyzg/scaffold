import React,{Component} from 'react'
import { add } from '../../actions/user'
import { promiseAction,promiseAction2,promiseAction3,promiseAction4,promiseAction5 } from '../../actions/promiseAction'
import { connect } from 'react-redux'
import './PageOne.css'

import {
  Route,
  Link
} from 'react-router-dom'

// import App2 from '../../pages/App2'

class PageOne extends Component {
	constructor(props,context) {
		super(props,context)
		// this.store = Store;
		// Action.getData('laowang')
	}

	render() {
		const t = this;
		return (
			<div className = "pageOne" >
				<div className = "title" > 这是pageOne~ </div>
				<Link to = "/pagetwo" > 下一页 </Link>


				<div className = 'title' > { t.props.user } </div>
				<div onClick = { this.props.onIncreaseClick } >
					点击调用add 
				</div>
				<br /><br /><br />






				<div className=''>
					{t.props.promise.title}
				</div>
				<div className=''>
					{t.props.promise.name}
				</div>
				<div className=''>
					{t.props.promise.find.type}
				</div>
				<div className=''>
					{t.props.promise.find.rate}
				</div>
				<div className=''>
					{t.props.promise.date}
				</div>
				<div onClick = { t.props.proA } className=''>
					更改promise数据
				</div>
				<div onClick = { t.props.proA2 } className=''>
					更改promise2数据
				</div>
				<div onClick = { t.props.proA3 } className=''>
					更改promise3数据
				</div>
				<div onClick = { t.props.proA4 } className=''>
					更改promise4数据
				</div>
				<div onClick = { t.props.proA5 } className=''>
					更改promise5数据
				</div>






			</div>
		)

	}
}



// 上下两种都行
// function mapStateToProps(state) {
//   return {
//     user: state.user
//   }
// }
const mapStateToProps = (state) => ({
  	user: state.user,
  	promise: state.promise,
})


// 上下两种都行
// // Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//   return {
//     onIncreaseClick: ()=> dispatch(add())
//   }
// }

const mapDispatchToProps = {
  	onIncreaseClick : () => add(2),
  	proA : () => promiseAction({title:'haha',name:'ssss'}),
  	proA2 : () => promiseAction2({name:'qqq'}),
  	proA3 : () => promiseAction3({name:'aaa'}),
  	proA4 : () => promiseAction4({name:'bbb'}),
  	proA5 : () => promiseAction5({name:'ccc'}),
}



export default connect(
  	mapStateToProps,
  	mapDispatchToProps
)(PageOne)
