import React, {Component} from 'react';
import './AppFooter.css';
import {NavLink} from "react-router-dom";
import {Icon, Dropdown} from "semantic-ui-react";

class AppFooter extends Component {
    render() {
        return (
            <div>
                {this.props.authenticated ? (
                    <div className="footer-authenticated">
                        <div className='footer-left-logo'>
                            <NavLink to="/"><span style={{color: '#F2F2F2'}}>© 2019 YourAPI</span></NavLink>
                        </div>

                        <div className="footer-link-container">
                            <NavLink to="/"><span style={{color: '#F2F2F2'}}>Политика конфиденциальности</span></NavLink>
                        </div>
                        <div className="footer-link-container">
                            <NavLink to="/"><span style={{color: '#F2F2F2'}}>Пользовательское соглашение</span></NavLink>
                        </div>
                        <div className='footer-icons-group'>
                            <div className='footer-icon-container'>
                                <Icon link size={'large'}  name='twitter' />
                            </div>
                            <div className='footer-icon-container'>
                                <Icon link size={'large'}  name='linkedin' />
                            </div>
                            <div className='footer-icon-container'>
                                <Icon link size={'large'}  name='facebook f' />
                            </div>
                            <div className='footer-icon-container'>
                                <Icon link size={'large'}  name='vk' />
                            </div>
                        </div>
                        <div className="footer-right-link-container">
                            <Dropdown text='Помощь' closeOnChange>
                                <Dropdown.Menu>
                                    <Dropdown.Item text='Помощь' description='Помощь' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <div className="footer">

                    </div>
                )}
            </div>
        )
    }
}

export default AppFooter;
