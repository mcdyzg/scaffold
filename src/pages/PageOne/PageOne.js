import React from 'react'
import './PageOne.css'
import {Component} from 'reflux';
import Action from './action'
import Store from './store';
import {
  Route,
  Link
} from 'react-router-dom'

// import App2 from '../../pages/App2'

class PageOne extends Component {
	constructor(props,context) {
		super(props,context)
        this.store = Store;
        Action.getData('laowang')
	}

    render() {
    	const t = this;
        return (
            <div className="pageOne">
                <div className="title">这是pageOne~</div>
                <Link to="/pagetwo">下一页</Link>
                <div className='title'>
                	{t.state.data && t.state.data.total_count}
                </div>
            </div>
        )
    }
}

// const PageOne = (match) =>{
//     return (
//         <div className=''>
//             adsfsd
//         </div>
//         )
// }
export default PageOne