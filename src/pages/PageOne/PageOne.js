/**
 * Created by Eugene on 16/11/28.
 */
import React from 'react'
import './PageOne.css'
import {Component} from 'reflux';
import Action from './action'
import Store from './store';

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
                <a href="#/pageTwo">下一页</a>
                <div className='title'>
                	{t.state.data && t.state.data.total_count}
                </div>
            </div>
        )
    }
}
export default PageOne