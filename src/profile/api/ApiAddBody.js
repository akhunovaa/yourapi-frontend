import React, {Component} from 'react';
import './Api.css';
import {Button, Divider, Dropdown, Form, Icon, Image, Input, TextArea} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import volgaImage from '../../img/volga.png';
import uralImage from '../../img/ural.png';
import queryString from "query-string";

class ApiAddBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
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

    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleCheck(array, val) {
        return array.some(item => item === val);
    }


    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const page = this.props.paging;

        return (
              <div className='api-body-main'>



                  <Divider style={{marginTop: '20px',  marginBottom: 0}}/>
                  <div className="api-info-buttons">
                      <div className='apply-button-container'>
                          <Button fluid className="apply-button" style={{width: 165, height:32}}><span className='command-approve-buttons-text'>Сохранить</span></Button>
                      </div>
                      <div className='cancel-button-container'>
                          <Button fluid className="cancel-button"  style={{width: 165, height:32}}><span className='command-approve-buttons-text'>Отмена</span></Button>
                      </div>
                  </div>
              </div>

        )
    }
}
export default withRouter(ApiAddBody);