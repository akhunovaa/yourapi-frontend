import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './ApiDetailBody.css';
import {Form, Icon, TextArea} from "semantic-ui-react";

class ApiDetailMethodsSchemeBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            schema: '{\n' +
                '  "$schema": "http://json-schema.org/draft-04/schema#",\n' +
                '  "type": "object",\n' +
                '  "properties": {\n' +
                '    "api": {\n' +
                '      "type": "object",\n' +
                '      "properties": {\n' +
                '        "results": {\n' +
                '          "type": "integer"\n' +
                '        },\n' +
                '        "predictions": {\n' +
                '          "type": "array",\n' +
                '          "items": [\n' +
                '            {\n' +
                '              "type": "integer"\n' +
                '            },\n' +
                '            {\n' +
                '              "type": "integer"\n' +
                '            },\n' +
                '            {\n' +
                '              "type": "integer"\n' +
                '            }\n' +
                '          ]\n' +
                '        }\n' +
                '      },\n' +
                '      "required": [\n' +
                '        "results",\n' +
                '        "predictions"\n' +
                '      ]\n' +
                '    }\n' +
                '  },\n' +
                '  "required": [\n' +
                '    "api"\n' +
                '  ]\n' +
                '}'
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
                                      name="example" defaultValue={this.state.schema}/>
                    </Form>
                </div>
                <div className='detail-methods-code-fragment-textarea-inner-response-code'>
                    <span>200</span>
                </div>
            </div>
        )
    }
}

export default ApiDetailMethodsSchemeBody;