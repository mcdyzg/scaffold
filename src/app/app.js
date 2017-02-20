// "use strict";
// //基本组件
// import React,{Component} from  'react'
// import ReactDOM from 'react-dom'
// import {Router,hashHistory} from 'react-router'

// //demo
// import PageOne from '../pages/PageOne'
// import PageTwo from '../pages/PageTwo'

// class App extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <section>
//                 {this.props.children}
//             </section>
//         )
//     }
// }
// const routes = {
//     path: '/',
//     component: App,
//     indexRoute: {component: PageOne},
//     childRoutes: [
//         {path: '/pageTwo', component: PageTwo}
//     ]
// };
// ReactDOM.render(<Router history={hashHistory} routes={routes}/>, document.getElementById('app'));

"use strict";
//基本组件
import React,{Component} from  'react'
import ReactDOM from 'react-dom'

//demo
import PageOne from '../pages/PageOne'

// class App extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div>
//                 1111sdfd333dsfdsfa
//             </div>
//         )
//     }
// }
ReactDOM.render(<PageOne />, document.getElementById('app'));