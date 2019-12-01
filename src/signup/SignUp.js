import React, {Component} from 'react';
import './Signup.css';
import {Link, Redirect} from 'react-router-dom'
import {Button, Checkbox, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";
import {login} from "../util/APIUtils";
import {ACCESS_TOKEN} from "../constants";
import Alert from "react-s-alert";

class SignUp extends Component {

    state = {};

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
                        <Header as='h3' color='blue' className={'login-right-header'}>YourAPI</Header>
                    </div>
                    <div id="login-container-right-form">
                        <div className='navigate-links'>
                            <div className='login-nav-link-left-1'>
                                <Link to="/login"><b style={{color: '#4F4F4F'}}>Вход</b></Link>
                            </div>
                            <div className='signup-nav-link-right-1'>
                                <Link to="/signup"><b style={{color: '#4F4F4F'}}>Регистрация</b></Link>
                            </div>
                        </div>
                        <SignupForm2/>
                    </div>
                    <div id="login-container-right-footer">
                        <div className='footer-icon-group-label'>
                            <label style={{color: '#4F4F4F'}}>Войти с помощью</label>
                        </div>

                        <div className='footer-icon-group'>
                            <Icon link name='google' size={'large'} color={'grey'} />
                            <Icon link name='facebook' size={'large'} color={'grey'}/>
                            <Icon link name='vk' size={'large'} color={'grey'} />
                            <Icon link name='yandex' size={'large'} color={'grey'} />
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}

class SignupForm2 extends Component {
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
            <Grid style={{paddingLeft: '80px', paddingRight: '80px'}} textAlign='center'>
                <Grid.Column>
                    <Form size='tiny' onSubmit={this.handleSubmit}>
                        <Segment className='login-data-segment-form'>
                            <Form>
                                <Form.Field>
                                    <label style={{float: 'left', color: '#A5A5A5'}} for="login">Имя</label>
                                    <input className="form-login-input" id="login" required placeholder='Имя'/>
                                </Form.Field>
                                <Form.Field>
                                    <label style={{float: 'left', color: '#A5A5A5'}} for="email">Электронная почта</label>
                                    <input className="form-login-input" id="login" required placeholder='Имя'/>
                                </Form.Field>
                                <Form.Field style={{}}>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>Пароль</label>
                                    <Input
                                        icon={{ name: 'eye slash outline', link: true }}
                                        iconPosition='right'
                                        placeholder='Пароль' id="password" required type='password'
                                    />
                                </Form.Field>
                                <label style={{float: 'left', color: '#A5A5A5'}}>Минимум 6 символов</label>
                                <Form.Field>
                                    <Checkbox style={{
                                        float: 'left',
                                        color: '#4F4F4F',
                                        paddingTop: '24px',
                                        paddingBottom: '16px'
                                    }} label='Запомнить меня'/>
                                </Form.Field>
                                <Button type='submit' style={{background: '#2F80ED', color: 'white'}} fluid
                                        size='large'>
                                    Создать аккаунт и войти
                                </Button>
                                <label style={{float: 'left', color: '#A5A5A5', paddingTop: '8px'}}>Создавая аккаунт, вы принимаете</label>
                                <Link
                                    style={{float: 'left', paddingTop: '0px', color: '#2F80ED'}}
                                    to="#">пользовательские соглашения </Link>
                                <Link style={{float: 'left', paddingTop: '0px', paddingBottom: '12px', color: '#2F80ED'}} to="#">и политику конфиденциальности</Link>
                            </Form>

                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }

}


export default SignUp;