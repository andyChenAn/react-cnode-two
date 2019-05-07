import React , { Component } from 'react';
import { connect } from 'react-redux';
class List extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { count , onIncrement} = this.props;
        return (
            <div>
                <div>coun is : {count}</div>
                <button onClick={onIncrement}>+</button>
            </div>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        count : state
    }
};

const mapDispatchToProps = (dispatch , ownProps) => {
    return {
        onIncrement : () => {
            dispatch({
                type : 'INCREMENT'
            })
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(List);