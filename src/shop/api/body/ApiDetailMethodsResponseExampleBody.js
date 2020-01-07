import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Form, TextArea} from "semantic-ui-react";

class ApiDetailMethodsResponseExampleBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            example: '{\"api\": {\"results\": 1, \"predictions\":[1, 2, 3]}}'
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
        return (
            <div className="detail-methods-example-code-fragment-container">
                <div className='detail-methods-example-code-fragment-textarea-container'>
                    <Form style={{paddingTop: '8px'}}>
                            <TextArea className='detail-methods-example-code-fragment-textarea'
                                      onChange={this.handleInputChange} placeholder=''
                                      style={{minHeight: 342, maxHeight: 342, minWidth: 298}} id="example"
                                      name="example" defaultValue={this.state.example}/>
                    </Form>
                </div>
                <div className='detail-methods-code-fragment-textarea-inner-response-code'>
                    <span>200</span>
                </div>
            </div>
        )
    }
}

export default ApiDetailMethodsResponseExampleBody;