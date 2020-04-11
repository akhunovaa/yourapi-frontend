import React, {Component} from 'react';
import './AppFooter.css';
import {NavLink} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import * as PropTypes from 'prop-types'
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

class AppFooter extends Component {
    render() {

        const social = [
            {
                name: "telegram",
                link: "https://t.me/yourapi_ru"
            }, {
                name: "twitter",
                link: "https://twitter.com/yourapi_ru"
            }, {
                name: "facebook",
                link: "https://facebook.com/yourapi"
            }, {
                name: "vk",
                link: "https://vk.com/yourapi_ru"
            }
        ];

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
            <div className="footer-authenticated">
                <div className='left-footer-elements'>
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
                            <span style={styles.spanOfContainer} className='blue-hover'>Справка</span>
                        </a>
                    </div>
                </div>
                <div className='right-footer-icons-group'>
                    <div className='footer-icon-container'>
                        {
                            social.map((item, index) => {
                                return (
                                    <a key={index + item.name} href={item.link} target='_blank' className='footer-icon-container blue-hover'>
                                        <Icon link size={'large'} name={item.name}/>
                                    </a>)
                            })
                        }
                    </div>

                    <div className="footer-link-container">
                        <a href={"mailto:support@yourapi.ru"} rel="noopener noreferrer">
                            <span style={styles.spanOfContainer}>Служба поддержки</span>
                        </a>
                    </div>
                </div>

                <ScrollUpButton EasingType="easeOutCubic" style={styles.ScrollUpButton}/>
            </div>
        )
    }
}

AppFooter.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default AppFooter;
