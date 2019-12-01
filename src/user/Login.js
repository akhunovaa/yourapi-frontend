import React, {Component} from 'react';
import './SignUp.css';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
// import {Redirect} from 'react-router-dom'
import {ReCaptcha} from 'react-recaptcha-google'
import {login, signup} from '../util/APIUtils';
import Alert from 'react-s-alert';
import { Link, Redirect } from 'react-router-dom'
import SignUp from "./SignUp";


class Login extends Component {
    state = {};
    render() {

        if (this.props.authenticated) {

        }
        return (

            <div className="frame">
                <div className="login-container">
                    <div className="login-content">
                        <h1 className="login-title">Авторизация на портале YourAPI.ru</h1>
                        <LoginForm {...this.props} />
                        <span className="signup-link">Нет аккаунта? <Link to="/signup">Зарегистрироваться!</Link></span>
                    </div>
                </div>
            </div>

        )
    }
}

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            captchaToken: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }

    onLoadRecaptcha() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        this.setState({
            captchaToken: recaptchaToken
        })
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

        const signUpRequest = Object.assign({}, this.state);
        if (signUpRequest.captchaToken != null) {
            signup(signUpRequest)
                .then(response => {
                    Alert.success("Вы успешно зарегистрировались! Пожалуйста авторизуйтесь заново.");
                    this.onLoadRecaptcha();
                    this.props.history.push("/");
                }).catch(error => {
                Alert.error((error && error.message) || 'Что-то пошло не так! Попробуйте заново.');
            });
        }
    }

    render() {
        return (
            <Grid className={"login-form"} textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column className="grid-column">
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image/> Авторизация
                    </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Login' name="login"
                                        onChange={this.handleInputChange} required/>
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail' name="email"
                                        onChange={this.handleInputChange} required/>
                            <Form.Input name="password"
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Пароль'
                                        type='password'
                                        required
                                        onChange={this.handleInputChange}
                            />
                            <ReCaptcha
                                ref={(el) => {
                                    this.captcha = el;
                                }}
                                size="normal"
                                data-theme="light"
                                render="explicit"
                                sitekey="6LeulZwUAAAAAA07OHdhKen90gZauyUDCBe8GDEn"
                                onloadCallback={this.onLoadRecaptcha}
                                verifyCallback={this.verifyCallback}
                                hl="ru"
                            />
                            <Button color='teal' fluid size='large'>
                                Авторизоваться
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Не зарегистрированы? <a href='/signup'>Пройти регистрацию!!</a>
                    </Message>
                    <Message>
                        Данный ресурс представлен в рамках Хакатона <b>«UrbanTech.Moscow».</b> <i>Задача №5.</i>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}


export default Login;