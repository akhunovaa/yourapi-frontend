import React, {Component} from 'react';
import './AppFooter.css';
import {NavLink} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import * as PropTypes from 'prop-types'
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

class AppFooter extends Component {
    render() {
        const {authenticated} = this.props;
        const social = ["twitter", "linkedin", "facebook", "vk"];

        const styles = {
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
                            <a href='/help' rel="noopener noreferrer">
                                <span style={styles.spanOfContainer}>Справка</span>
                            </a>
                        </div>
                        <div className='footer-icons-group'>
                            {
                                social.map((item, index) => {
                                    return (<div key={index + item} className='footer-icon-container'>
                                        <Icon link size={'large'} name={item}/>
                                    </div>)
                                })
                            }
                        </div>
                        <div className="footer-link-container">
                            <a href={"mailto:support@yourapi.ru"} rel="noopener noreferrer">
                                <span style={styles.spanOfContainer}>Служба поддержки</span>
                            </a>
                        </div>
                        <ScrollUpButton EasingType="easeOutCubic" style={styles.ScrollUpButton}/>
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
