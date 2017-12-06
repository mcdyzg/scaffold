import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Home from '@pages/Home'

const renders = Component => {
    render(
        <AppContainer>
            <Component/>
        </AppContainer>, document.getElementById('app'))
}

renders(Home)

if (module.hot) {
    module.hot.accept('@pages/Home', () => renders(Home))
}
