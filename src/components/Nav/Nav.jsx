import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
class Nav extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <nav className="nav">
                <ul className="nav-list">
                    <li>
                        <Link className="nav-link" to="/">全部</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/?tab=good">精华</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/?tab=share">分享</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/?tab=ask">问答</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/?tab=job">招聘</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default Nav;











