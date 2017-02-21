import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import PageOne from '../../pages/PageOne'
import PageTwo from '../../pages/PageTwo'
//import styles from './App2.scss'

class App2 extends Component {
    render() {
        return (
            <Router>
                <div className=''>
                    <Route exact path="/" component={PageOne}/>
                    <Route path="/pagetwo" component={PageTwo}/>
                </div>
            </Router>
        )
    }
}
export default App2