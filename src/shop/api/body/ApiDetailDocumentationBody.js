import React, {Component} from 'react';
import './ApiDetailBody.css';
import {withRouter} from "react-router";

class ApiDetailDocumentationBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const {category} = this.props.match.params;
        this.state = {};
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            const {pageTitle} = this.props;
            document.title = pageTitle;
        }
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
        return (
            <div>
                <div className='detail-documentation-body'>
                    <h1>Документация</h1>
                </div>
            </div>

        )
    }
}

export default withRouter(ApiDetailDocumentationBody);
