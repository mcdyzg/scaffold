/**
 * Created by Eugene on 16/11/28.
 */
import React, {Component} from 'react'
import './PageTwo.scss'
//import styles from './PageTwo.scss'

class PageTwo extends Component {
    //<div className={styles.pageTwo}>
    //    <div className={styles.title}>这是pageTwo~</div>
    //    <a href="#/">上一页</a>
    //</div>
    render() {
        return (
            <div className="pageTwo">
                <div className="title">这是pageTwo~</div>
                <a href="#/">上一页</a>
            </div>
        )
    }
}
export default PageTwo