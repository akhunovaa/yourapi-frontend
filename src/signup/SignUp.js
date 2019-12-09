import React, {Component} from 'react';
import './Signup.css';
import {Link, Redirect} from 'react-router-dom'
import {Button, Checkbox, Divider, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";
import { signup } from "../util/APIUtils";
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
                        <Header as='h3' className={'login-right-header'}>YourAPI</Header>
                    </div>
                    <div id="signup-container-right-form">
                        <div className='navigate-links'>
                            <div className='login-nav-link-left-login'>
                                <Link to="/login"><b style={{color: '#4F4F4F'}}>Вход</b></Link>
                            </div>
                            <div className='signup-nav-link-right-1'>
                                <Link to="/signup"><b style={{color: '#4F4F4F'}}>Регистрация</b></Link>
                            </div>
                        </div>
                        <SignupForm2 {...this.props} />
                        <Divider style={{marginTop: 24,  marginBottom: 0}}/>
                    </div>
                    <div className="signup-container-right-footer">
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

class SignupForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            patrName: '',
            login: '',
            email: '',
            password: '',
            phone: '+78000000000'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

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
            signup(signUpRequest)
                .then(response => {
                    if (!response.success){
                        Alert.warning(response.message);
                    }else {
                        Alert.success("Вы успешно зарегистрировались!");
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.history.push("/");
                        window.location.reload();
                    }
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
                                    <label style={{float: 'left', color: '#A5A5A5'}} for="login">Имя/Логин</label>
                                    <input onChange={this.handleInputChange} className="form-login-input" id="login" name="login" required placeholder='Имя/Логин'/>
                                </Form.Field>
                                <Form.Field>
                                    <label style={{float: 'left', color: '#A5A5A5'}} for="email">Электронная почта</label>
                                    <input onChange={this.handleInputChange} className="form-login-input" type="email" id="email" name="email" required placeholder='Email'/>
                                </Form.Field>
                                <Form.Field style={{}}>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>Пароль</label>
                                    <Input onChange={this.handleInputChange}
                                        icon={{ name: 'eye slash outline', link: true }}
                                        iconPosition='right'
                                        placeholder='Пароль' id="password" name="password" required type='password'
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
                                <Button type='submit' className='submit-button' fluid
                                        size='large' onClick={this.handleSubmit}>
                                    Создать аккаунт и войти
                                </Button>
                                <div className='license-agreement'>
                                    <label style={{float: 'left', color: '#A5A5A5', paddingTop: '8px'}}>Создавая аккаунт, вы принимаете</label>
                                    <Link
                                        style={{float: 'left', paddingTop: '0px', color: '#2F80ED'}}
                                        to="#">пользовательские соглашения и</Link>
                                    <Link style={{float: 'left', paddingTop: '0px', paddingBottom: '12px', color: '#2F80ED'}} to="#">политику конфиденциальности</Link>
                                </div>
                            </Form>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }

}


export default SignUp;