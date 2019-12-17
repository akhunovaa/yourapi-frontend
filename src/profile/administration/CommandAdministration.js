import React, {Component} from 'react';
import './Administration.css';
import {Breadcrumb} from "semantic-ui-react";
import {NavLink, withRouter} from "react-router-dom";
import queryString from 'query-string';

class CommandAdministration extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
           page: ''
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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


    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        let params = queryString.parse(this.props.location.search);
        let company = params.company ? params.company : 'Волга';
        let linkToPage = '/profile/administration?company=' + company;
        return (
                <Breadcrumb>
                    <Breadcrumb.Section as={NavLink} to={'/'} link><span className='text-disabled-color'>Главная</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={'/profile'} link><span className='text-disabled-color'>Личный кабинет</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={'/profile/administration'} link><span className='text-disabled-color'>Администрирование</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={linkToPage} link><span className='text-disabled-color'>{company}</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right arrow'/>
                    <Breadcrumb.Section active><span className='text-disabled-color'>О Команде</span></Breadcrumb.Section>
                </Breadcrumb>

        )
    }
}

export default withRouter(CommandAdministration);