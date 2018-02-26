import React, {Component} from 'react'

import {withRouter,Route,NavLink,Switch} from 'react-router-dom'
import Bundle from '@modules/Bundle'
import DynamicImport from '@modules/DynamicImport'


// 异步加载方式一：使用bundle-loader，其实原理是使用webpack的require.ensure
import ListC from 'bundle-loader?lazy&name=app-list!./List';
// const List = Bundle(ListC)

// 异步加载方式二：使用dynamic-import
const List = DynamicImport(() => import(/* webpackChunkName: "List" */'./List'))



class Article extends Component {
	constructor(props) {
        super(props);
		this.state = {
			List:null,
		}
    }

    componentDidMount(){
		ListC((file)=>{
			this.setState({
				List:file.default
			})
		})
    }

	render() {
        const { match } = this.props;
		return (
		<section>
			<Route path={`${match.url}`} exact component={this.state.List} />
			<Route path={`${match.url}/list2`} component={List} />
		</section>)
	}
}

export default withRouter(Article)
