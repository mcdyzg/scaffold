import React from 'react'
import {Component} from 'reflux'
import './PageTwo.scss'
import { Link } from 'react-router-dom'
import Action from './action'
import Store from './store';
import Store2 from '../PageOne/store'
//import styles from './PageTwo.scss'

class PageTwo extends Component {
    constructor(props,context) {
		super(props,context)
        this.state = {};
        this.stores = [Store,Store2];
        Action.getData2('2222')
	}

    render() {
        console.log(this.state)
        return (
            <div className="pageTwo">
                <div className="title">这是pageTwo~</div>
                <Link to="/">上一页</Link>
            </div>
        )
    }
}
export default PageTwo
