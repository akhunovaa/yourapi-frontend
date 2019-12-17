import React, {Component} from 'react';
import './Administration.css';
import {Button, Icon} from "semantic-ui-react";
import {loadUser} from "../../util/APIUtils";
import CommandsTreeSet from './CommandsTreeSet';
import CommandAdministration from './CommandAdministration';
import AdministrationBody from './AdministrationBody';
import queryString from "query-string";
import {withRouter} from "react-router";

class Administration extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {

            },
            company:{
               name:'',
               page:''
            },
            open: false,
            page: ''
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        let naming = params.company != null ? params.company : 'Волга';
        let page = params.page != null ? params.page : 'about';
        this.setState({
            company: {
                page: page,
                name: naming
            }
        });
        this._isMounted = true;
    }


    loadUser(handle) {
        this.setState({
            loading: true
        });
        let data = {
            "id": handle
        };
        loadUser(data)
            .then(response => {
                this.setState({
                    user: response.response,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
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
        console.log(value)
        this.setState({
            phone: value
        });
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {

        return (
            <div className="administration-main">
                <div className='left-side-administration-body'>
                    <div className='left-side-administration-body-header'>
                        <div className='left-side-administration-body-header-button'>
                            <Button icon fluid labelPosition='left' style={{background: '#F39847'}}> <Icon name='plus square'/><span className='command-approve-buttons-text command-create-button'>Создать команду</span></Button>
                        </div>
                    </div>
                    <div className='left-side-administration-body-main-container'>
                        <CommandsTreeSet {...this.props}/>
                    </div>
                </div>
                <div className='right-side-administration'>
                    <div className="administration-breadcrumb">
                        <CommandAdministration {...this.props}/>
                    </div>
                    <div className="administration-body">
                        <AdministrationBody {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Administration);