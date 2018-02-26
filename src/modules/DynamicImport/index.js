import React from 'react'
import Bundle from './DynamicImport'

// const Loading = () => <div>Loading...</div>;
export default (loadComponent) => (props) =>{
    return (
        <Bundle load={loadComponent}>
           {Comp => (Comp ? <Comp {...props}/> : null)}
        </Bundle>
    )
}
