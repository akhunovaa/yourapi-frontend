import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './ApiDetailMethodsHeader.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Icon} from "semantic-ui-react";

class ApiDetailMethodsResponseExampleHeader extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
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
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };


    render() {
        const link = this.props.link;
        return (
            <div className='code-header-links-font response-header-display-rule'>
                <div className='code-header-links-methods code-header-links-font active-header-container'>
                    <NavLink to={link + "&code=example"} className='active-header-link blue-hover'>Пример ответа</NavLink>
                </div>
                <div className='code-header-links-methods code-header-links-font'>
                    <NavLink to={link + "&code=scheme"} className='inactive-header-link blue-hover'>Схема</NavLink>
                </div>
                <div className='response-header-icons-links-methods code-header-links-font'>
                    <CopyToClipboard text={this.props.text} onCopy={this.props.onCopy}>
                        {this.props.copied ? <Icon className='response-paste fadeInLeft animated3' name='paste' size='large'/> : <Icon className='response-copy blue-hover' name='copy outline' link size='large'/>}
                    </CopyToClipboard>
                </div>
            </div>
        )
    }
}

export default ApiDetailMethodsResponseExampleHeader;