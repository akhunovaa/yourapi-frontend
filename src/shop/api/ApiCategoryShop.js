import React, {Component} from 'react';
import './ApiCategoryShop.css';
import {NavLink, Redirect} from "react-router-dom";
import {Breadcrumb} from "semantic-ui-react";


class ApiCategoryShop extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const {category} = this.props.match.params;
        this.state = {
            categoryName: category,
            permittedCategory: ['data', 'finance', 'mobile', 'map', 'adv', 'social', 'health', 'sport', 'web', 'other']
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

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        if (!this.handleCheck(this.state.permittedCategory, this.state.categoryName)) {
            return <Redirect
                to={{
                    pathname: "/shop/category/data",
                    state: {from: this.props.location}
                }}/>;
        }
        const link = '/shop/category/' + this.state.categoryName;
         let categoryValue;
         switch (this.state.categoryName) {
             case 'data':
                 categoryValue = 'Данные';
                 break;
             case 'finance':
                 categoryValue = 'Финансы';
                 break;
             case 'mobile':
                 categoryValue = 'Мобильные';
                 break;
             case 'map':
                 categoryValue = 'Карты';
                 break;
             case 'adv':
                 categoryValue = 'Реклама';
                 break;
             case 'social':
                 categoryValue = 'Социальные сети';
                 break;
             case 'health':
                 categoryValue = 'Здравохранение';
                 break;
             case 'sport':
                 categoryValue = 'Спорт';
                 break;
             case 'web':
                 categoryValue = 'Web';
                 break;
             case 'other':
                 categoryValue = 'Другое';
                 break;
             default:
                 categoryValue = 'Данные';
         }
        return (
            <div className="api-shop-main">
                <div className="api-shop-container-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Section as={NavLink} to={'/'} link><span
                            className='text-disabled-color'>Главная</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                            className='text-disabled-color'>Магазин</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={link} link><span
                            className='text-disabled-color'>{categoryValue}</span></Breadcrumb.Section>
                    </Breadcrumb>
                </div>
            </div>
        )
    }
}

export default ApiCategoryShop;