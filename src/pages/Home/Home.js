import React, {Component} from 'react'
import {HashRouter, Route, Switch, Link,Redirect} from 'react-router-dom'
import './Home.scss'
import Article from '@pages/Article'
import {hello} from '@comp/util'
import DB from '@DB'
import { Button } from 'antd'

class Home extends Component {
	constructor(props) {
        super(props);
		this.state = {
			a:hello()
		}
		DB.Analyse.getUserDate({
			q:'haha'
		})
		.then(res=>{
			console.log(res)
		})
    }

	render() {
		return (
		<div>
			头部{this.state.a}
			<Button type="primary">Primary</Button>
			<HashRouter>
				{/* 内容区域 */}
				<section className="">
					<Route path="/article" component={Article} />
				</section>
		    </HashRouter>
		</div>
		)
	}
}

export default Home
