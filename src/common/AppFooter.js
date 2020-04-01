import React, {Component} from 'react';
import './AppFooter.css';
import {NavLink} from "react-router-dom";
import {Icon, Dropdown} from "semantic-ui-react";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import PropTypes from 'prop-types';

class AppFooter extends Component {
    render() {
        const {authenticated} = this.props;
        var social = ["twitter", "linkedin", "facebook", "vk"];

        var styles = {
            spanOfContainer: {
                color: '#F2F2F2'
            },
            ScrollUpButton: {
                bottom: 50,
                backgroundColor: 'none',
                border: 'none'
            }
        };

        return (
            <div>
                {authenticated ? (
                    <div className="footer-authenticated">
                        <div className='footer-left-logo'>
                            <NavLink to="/"><span style={styles.spanOfContainer}>© 2019-2020 YourAPI</span></NavLink>
                        </div>

                        <div className="footer-link-container">
                            <a href="/privacy.html" target="_blank" rel="noopener noreferrer">
                                <span style={styles.spanOfContainer}>Политика конфиденциальности</span>
                            </a>
                        </div>
                        <div className="footer-link-container">
                            <a href="/agreement.html" target="_blank" rel="noopener noreferrer">
                                <span style={styles.spanOfContainer}>Пользовательское соглашение</span>
                            </a>
                        </div>
                        <div className="footer-link-container">
                            <a href={"mailto:support@yourapi.ru"} rel="noopener noreferrer">
                                <span style={styles.spanOfContainer}>Служба поддержки</span>
                            </a>
                        </div>
                        <div className='footer-icons-group'>
                            {
                                social.map((item) => {
                                    return (<div className='footer-icon-container'>
                                        <Icon link size={'large'} name={item}/>
                                    </div>)
                                })
                            }
                        </div>
                        <div className="footer-right-link-container">
                            <Dropdown text='Помощь' closeOnChange>
                                <Dropdown.Menu>
                                    <Dropdown.Item text='Помощь' description='Помощь'/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <ScrollUpButton style={styles.ScrollUpButton} EasingType="easeOutCubic"/>
                    </div>
                ) : (
                    <div className="footer"/>
                )}
            </div>
        )
    }
}

AppFooter.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default AppFooter;
