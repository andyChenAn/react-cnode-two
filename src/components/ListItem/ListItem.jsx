import React , { Component } from 'react';
class ListItem extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { topic } = this.props;
        return (
            <li>{topic.id}</li>
        )
    }
}
export default ListItem;