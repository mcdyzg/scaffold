import React, {Component} from 'react'
import './PageTwo.scss'
import { Link } from 'react-router-dom'
//import styles from './PageTwo.scss'

class PageTwo extends Component {
    render() {
        return (
            <div className="pageTwo">
                <div className="title">这是pageTwo~</div>
                <Link to="/">上一页</Link>
            </div>
        )
    }
}
export default PageTwo