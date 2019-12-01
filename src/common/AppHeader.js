import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        if (this.props.authenticated) {

        }
        return (
            <div className="header">
                <NavLink style={{float: 'right'}} to="/signup">РЕГИСТРАЦИЯ</NavLink>
                <NavLink style={{float: 'right'}} to="/login">ВХОД</NavLink>
            </div>
        )
    }
}

export default AppHeader;
