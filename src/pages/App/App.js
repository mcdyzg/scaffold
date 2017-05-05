import React,{Component} from 'react'
import './App.css'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import PageOne from 'bundle-loader?lazy&name=app-p1!../../pages/PageOne'
import PageTwo from 'bundle-loader?lazy&name=app-p2!../../pages/PageTwo'
import Bundle from '../../modules/bundle'

const Page1 = () => (
    <Bundle load={PageOne}>
        {(List) => <List />}
    </Bundle>
)
const Page2 = () => (
    <Bundle load={PageTwo}>
        {(List) => <List />}
    </Bundle>
)
// const Page2 = () => {
//   <Bundle load={PageTwo}>
// 	{
// 	  	(comp)=><comp />
// 	}
//   </Bundle>
// }

class App extends Component {
	constructor(props,context) {
		super(props,context)
	}

	render() {
		const t = this;
		return (
			<Router>
				<div className=''>
					<Route exact path="/" component={Page1}/>
					<Route path="/pagetwo" component={Page2}/>
				</div>
			</Router>
		)
	}
}
export default App