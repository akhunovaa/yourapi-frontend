import React, {Component} from 'react';
import './Api.css';
import {Button, Divider, Dropdown, Form, Input, TextArea} from "semantic-ui-react";
import {withRouter} from "react-router-dom";

class ApiUpdateBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            api: {
                name: 'Sportspage Feeds',
                info: 'Результаты в реальном времени, расписание и коэффициенты ставок для лиг США',
                category: 'Новости'
            }
        };
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    render() {

        return (
            <div className='api-body-main'>
                <span>Редактировать API</span>
            </div>

        )
    }
}

export default withRouter(ApiUpdateBody);