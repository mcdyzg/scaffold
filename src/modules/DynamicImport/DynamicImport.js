import React from 'react'

export default class DynamicImport extends React.Component {
    state = {
        mod: null
    }
    componentWillMount() {
        this.load(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }
    // 更改 load 方法为异步函数
    async load(props) {
        this.setState({mod: null});
        /*
            使用 props.load() 返回的是一个 promise
           */
        const mod = await props.load();

        this.setState({
            mod: mod.default
                ? mod.default
                : mod
        });
    }

    render() {
        return this.state.mod
            ? this.props.children(this.state.mod)
            : null;
    }
}
