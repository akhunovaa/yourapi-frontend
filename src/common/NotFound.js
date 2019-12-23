import React, { Component } from 'react';
import './NotFound.css';
import {Button, Icon} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

class NotFound extends Component {

    render() {
        return (
                    <div className="page-not-found">
                        <h1 className="page-not-found-title-2">
                            404
                        </h1>
                        <h1 className="page-not-found-title">
                            404
                        </h1>
                        <div className="page-not-found-desc">
                         <p>Страница
                        </p>не найдена
                        </div>
                        <div className='page-not-found-go-back-btn'>
                            <NavLink to="/"><Button style={{background: '#F39847'}}><span className='go-back-404-text-button'>Вернуться назад</span></Button></NavLink>
                        </div>
                    </div>
        );
    }
}
export default NotFound;