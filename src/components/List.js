import React, {PureComponent, Component} from 'react'

class List extends PureComponent {

    /**
    * Default shouldComponentUpdate when not defined
    *
    * shouldComponentUpdate() {
    *   return true
    * }
    */

    render() {
        return (
            <div className="list">
                <h2>List</h2>
                <ul>
                    <li>Test1</li>
                    <li>Test2</li>
                    <li>Test3</li>
                    <li>Test4</li>
                </ul>
            </div>
        )
    }
}

export default List
