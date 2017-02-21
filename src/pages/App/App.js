import React,{Component} from 'react'
import './App.css'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import PageOne from '../../pages/PageOne'
import PageTwo from '../../pages/PageTwo'

class App extends Component {
	constructor(props,context) {
		super(props,context)
	}

    render() {
    	const t = this;
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
export default App