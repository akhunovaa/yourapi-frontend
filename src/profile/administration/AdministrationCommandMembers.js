import React, {Component} from 'react';
import './Administration.css';
import {Button, Divider, Icon, Image} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import volgaImage from '../../img/volga.png';
import uralImage from '../../img/ural.png';
import queryString from "query-string";

class AdministrationCommandMembers extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            command: {
                imageUrl: '',
                name: '',
                page: ''
            },
            commandName: 'Волга',
            company_name: '',
            info: '',
            city: '',
            site: '',
            phone: '',
            email: ''
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
        const { naming } = this.props.naming;
        let imageUrl;
        switch (naming) {
            case 'Волга':
                imageUrl = volgaImage;
                break;
            default:
                imageUrl = uralImage;
        }
        return (
            <div className='administration-body-main'>
                <div className="command-avatar-container">
                    <div className="command-avatar">
                        {
                            imageUrl ? (
                                <Image src={imageUrl} verticalAlign='middle' className='command-avatar-center'
                                       alt={naming}/>
                            ) : (
                                <div className="text-avatar">
                                    <span>{naming && naming[0]}</span>
                                </div>
                            )
                        }
                        <div className="command-avatar-footer">
                            <Icon link name='photo' size={'large'} color={'grey'}/>
                        </div>
                    </div>
                    <div className="command-name-container">
                        <span style={{paddingRight: '8px', height: 28}}>{naming}</span>
                        <span className='command-label'>Команда</span>
                    </div>
                    <div className="command-custom-icon-container">
                        <Icon link name='cog' size={'large'} color={'grey'}/>
                    </div>
                </div>
                <div className="command-info-container">
                    <div className="command-info-container-name">
                        <span>Участники</span>
                    </div>
                    <div className="command-info-container-name-inputs">
                    </div>
                    <Divider style={{marginTop: '40px', marginBottom: 0}}/>
                    <div className="command-info-buttons">
                        <div className='apply-button-container'>
                            <Button fluid className="apply-button" style={{width: 165, height: 32}}><span
                                className='command-approve-buttons-text'>Сохранить</span></Button>
                        </div>
                        <div className='cancel-button-container'>
                            <Button fluid className="cancel-button" style={{width: 165, height: 32}}><span
                                className='command-approve-buttons-text'>Отмена</span></Button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(AdministrationCommandMembers)