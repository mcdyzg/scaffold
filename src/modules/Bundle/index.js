import Bundle from './bundle'
import React from 'react'

export default (com)=>{
    return () => (
        <Bundle load={com}>
            {(List) => <List />}
        </Bundle>
    )
}