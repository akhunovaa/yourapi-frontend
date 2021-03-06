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
        this.handleCheck = this.handleCheck.bind(this);
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

    handleCheck(array, val) {
        return array.some(item => item === val);
    }


    render() {
        const naming  = this.props.naming;
        const page  = this.props.paging;
        let pageName;
        switch(naming) {
            case 'Урал':
                if (page === 'about') {
                    pageName = 'О компании';
                    break;
                }else{
                    pageName = 'Сотрудники';
                    break;
                }
            default:
                if (page === 'about') {
                    pageName = 'О команде';
                    break;
                }else{
                    pageName = 'Участники';
                    break;
                }
        }
        let linkToPage = '/profile/administration?company=' + naming;
        let linkToDeepPage = '/profile/administration?company=' + naming + '&page=' + page;
        return (
                <Breadcrumb>
                    <Breadcrumb.Section as={NavLink} to={'/'} link><span className='text-disabled-color'>Главная</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={'/profile'} link><span className='text-disabled-color'>Личный кабинет</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={'/profile/administration'} link><span className='text-disabled-color'>Администрирование</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={linkToPage} link><span className='text-disabled-color'>{naming}</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right arrow'/>
                    <Breadcrumb.Section as={NavLink} to={linkToDeepPage} link active><span className='text-disabled-color'>{pageName}</span></Breadcrumb.Section>
                </Breadcrumb>

        )
    }
}

export default withRouter(CommandAdministration);