import React, {Component} from 'react';
import './Home.css';
import Alert from 'react-s-alert';
import { Redirect } from 'react-router-dom'
import {Button, Header, Image, Message, Segment, Grid, Form} from "semantic-ui-react";
import {login} from "../util/APIUtils";
import {ACCESS_TOKEN} from "../constants";

class Login extends Component {

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
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

    state = {};

    render() {

        if(this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }}/>;
        }

        return (
            <div className={"main"}>
                <div className={"inner-main"}>
                    <div className={"login-left"}>

                    </div>
                    <div className={"login-right"}>
                        <div className={"inner-header"}>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-item">
                                    <input type="text" name="login"
                                           className="form-control" placeholder="Логин"
                                           value={this.state.login} onChange={this.handleInputChange} required/>
                                </div>
                                <div className="form-item">
                                    <input type="password" name="password"
                                           className="form-control" placeholder="Пароль"
                                           value={this.state.password} onChange={this.handleInputChange} required/>
                                </div>
                                <div className="form-item">
                                    <button type="submit" className="btn confirm-button btn-primary">Авторизоваться</button>
                                </div>
                            </form>
                        </div>
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
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                Alert.success("Вы авторизовались в системе!");
                this.props.history.push("/");
                window.location.reload();
            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так! Попробуйте заново.');
        });
    }

    render() {
        return (
            <Grid className={"login-form"} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column className="grid-column">
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image/> Добро пожаловать
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input  name="login" fluid icon='user' iconPosition='left' placeholder='Login' onChange={this.handleInputChange} required/>
                            <Form.Input
                                name="password"
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password' onChange={this.handleInputChange} required
                            />

                            <Button color='teal' fluid size='large'>
                                Войти
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Нет аккаунта? <a href='/signup'>Зарегистрироваться!</a>
                    </Message>
                    <Message>
                        Данный ресурс представлен в рамках Хакатона <b>«Лучший по профессии».</b> <i>Задача №10.</i>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;