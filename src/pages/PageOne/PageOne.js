/**
 * Created by Eugene on 16/11/28.
 */
import React, {Component} from 'react'
import './PageOne.css'
//import styles from './PageOne.css'

class PageOne extends Component {
    render() {
        return (
            <div className="pageOne">
                <div className="title">这是pageOne~</div>
                <a href="#/pageTwo">下一页</a>
            </div>
        )
    }
}
export default PageOne