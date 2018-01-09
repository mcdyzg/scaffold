import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Bundle from '@modules/Bundle'

import List2C from 'bundle-loader?lazy&name=app-list2!@pages/List2';
const List2 = Bundle(List2C)

const renders = Component => {
    render(
        <AppContainer>
            <Component/>
        </AppContainer>, document.getElementById('app'))
}

renders(List2)

if (module.hot) {
    module.hot.accept('@pages/List2', () => renders(List2))
}
