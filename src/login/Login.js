import React, {Component} from 'react';
import './Login.css';
import Alert from 'react-s-alert';
import {Button, Checkbox, Divider, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";
import {login} from "../util/APIUtils";
import {ACCESS_TOKEN} from "../constants";
import {Link, Redirect} from "react-router-dom";

class Login extends Component {

    state = {};

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {

        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: this.props.location}
                }}/>;
        }

        return (
            <div id="login-container">

                <div id="login-container-left">

                </div>
                <div id="login-container-right">
                    <div id="login-container-right-header">
                        <Header as='h3' className={'login-right-header'}>YourAPI</Header>
                    </div>
                    <div id="login-container-right-form">
                        <div className='navigate-links'>
                            <div className='login-nav-link-left'>
                                <Link to="/login"><b style={{color: '#4F4F4F'}}>Вход</b></Link>
                            </div>
                            <div className='signup-nav-link-right-login'>
                                <Link to="/signup"><b style={{color: '#4F4F4F'}}>Регистрация</b></Link>
                            </div>
                        </div>
                        <LoginForm2 {...this.props} />
                    </div>
                    <Divider style={{marginTop: 0,  marginBottom: 0}}/>
                    <div id="login-container-right-footer">
                            <div className='footer-icon-group-label'>
                                <label style={{color: '#4F4F4F'}}>Войти с помощью</label>
                            </div>

                            <div className='footer-icon-group'>
                                <Icon style={{marginRight: 44, color: '#A5A5A5'}} link name='google' size={'large'} />
                                <Icon style={{marginRight: 44, color: '#A5A5A5'}}  link name='facebook' size={'large'} />
                                <Icon style={{marginRight: 44, color: '#A5A5A5'}} link name='vk' size={'large'} />
                                <Icon style={{color: '#A5A5A5'}} link name='yandex' size={'large'} />
                            </div>
                        </div>
                </div>

            </div>
        )
    }
}

class LoginForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
            .then(response => {
                if (!response.success){
                    Alert.warning(response.message);
                }else {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    Alert.success("Вы авторизовались в системе!");
                    window.location.reload();
                }
            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так! Попробуйте заново.');
        });
    }

    render() {
        return (
            <Grid style={{paddingLeft: '80px', paddingRight: '80px'}} textAlign='center'>
                <Grid.Column className="grid-column">
                    <Form size='tiny' onSubmit={this.handleSubmit}>
                        <Segment className='login-data-segment-form'>
                                <Form.Field>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>Логин/Email</label>
                                    <input onChange={this.handleInputChange} className="form-login-input" id="login" name="login" required placeholder='Логин/Email'/>
                                </Form.Field>
                                <Form.Field style={{}}>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>Пароль</label>
                                    <Input onChange={this.handleInputChange}
                                        icon={{ name: 'eye slash outline', link: true, iconPosition: 'right' }}
                                        placeholder='Пароль' id="password" name="password" required type='password'
                                    />
                                </Form.Field>
                                <Link
                                    style={{float: 'left', paddingTop: '0px', paddingBottom: '12px', color: '#2F80ED'}}
                                    to="#">Забыли пароль?</Link>
                                <Form.Field>
                                    <Checkbox style={{
                                        float: 'left',
                                        color: '#4F4F4F',
                                        paddingTop: '12px',
                                        paddingBottom: '16px'
                                    }} label='Запомнить меня'/>
                                </Form.Field>
                                <Button type='submit' className='submit-button' fluid
                                        size='large' onClick={this.handleSubmit}>
                                    Войти
                                </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }

}

export default Login;