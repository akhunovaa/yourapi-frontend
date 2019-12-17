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
        const namingArray = ['Волга', 'Урал'];
        const pagingArray = ['about', 'members'];
        const params = queryString.parse(this.props.location.search);
        let naming = (params.company !== 'undefined' && this.handleCheck(namingArray, params.company)) ? params.company : 'Волга';
        let paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'about';
        let company = params.company ? params.company : 'Волга';
        let linkToPage = '/profile/administration?company=' + naming;
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
                    <Breadcrumb.Section active><span className='text-disabled-color'>О Команде</span></Breadcrumb.Section>
                </Breadcrumb>

        )
    }
}

export default withRouter(CommandAdministration);