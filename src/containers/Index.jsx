import React , { Component } from 'react';
import Nav from '../components/Nav/Nav';
import List from '../containers/List/List';
class Index extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div>
                <Nav />
                <List />
            </div>
        )
    }
};
export default Index;