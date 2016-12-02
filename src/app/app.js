/**
 * Created by Eugene on 16/11/28.
 */
"use strict";
//基本组件
import React,{Component} from  'react'
import ReactDOM from 'react-dom'
import {Router,hashHistory} from 'react-router'

//demo
import PageOne from '../pages/PageOne'
import PageTwo from '../pages/PageTwo'

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                {this.props.children}
            </section>
        )
    }
}
const routes = {
    path: '/',
    component: App,
    indexRoute: {component: PageOne},
    childRoutes: [
        {path: '/pageTwo', component: PageTwo}
    ]
};
ReactDOM.render(<Router history={hashHistory} routes={routes}/>, document.getElementById('app'));