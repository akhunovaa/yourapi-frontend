import React, {Component} from 'react';
import './Login.css';
import Alert from 'react-s-alert';
import {Button, Checkbox, Divider, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";
import {login} from "../util/APIUtils";
import {Link, Redirect} from "react-router-dom";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN } from '../constants';
import { OAuth2PopupFlow } from 'oauth2-popup-flow';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousUrl: '',
            windowObjectReference: null

        };
        this.openSignInWindow = this.openSignInWindow.bind(this);
    }

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

    receiveMessage = event => {
        // Do we trust the sender of this message? (might be
        // different from what we originally opened, for example).
        if (event.origin !== "https://yourapi.ru") {
            return;
        }
        const { data } = event;
        // if we trust the sender and the source is our popup
        if (data.source === 'lma-login-redirect') {
            // get the URL params and redirect to our server to use Passport to auth/login
            const { payload } = data;
            const redirectUrl = `https://yourapi.ru/oauth2/redirect`;
            window.location.pathname = redirectUrl;
        }
    };

    openSignInWindow(event){
        event.preventDefault()
        let url = 'https://yourapi.ru/auth/oauth2/authorize/google?redirect_uri=https://yourapi.ru/oauth2/redirect';
        let width = 600, height = 700;
        let leftPosition, topPosition;
        let windowObjectReference = this.state.windowObjectReference;
        let previousUrl = this.state.previousUrl;
        // remove any existing event listeners
        window.removeEventListener('message', this.receiveMessage);
        //Allow for borders.
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        //Allow for title and status bars.
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        // window features
        // const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=300, left=600';
        const strWindowFeatures = "status=no, height=" + height + ",width=" + width + ",resizable=yes,left="
            + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
            + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";

        if (windowObjectReference === null || windowObjectReference.closed) {
            /* if the pointer to the window object in memory does not exist
             or if such pointer exists but the window was closed */
            windowObjectReference = window.open(url, 'Окно авторизации', strWindowFeatures);
        } else if (previousUrl !== url) {
            /* if the resource to load is different,
             then we load it in the already opened secondary window and then
             we bring such window back on top/in front of its parent window. */
            windowObjectReference = window.open(url, 'Окно авторизации', strWindowFeatures);
            windowObjectReference.focus();
        } else {
            /* else the window reference must exist and the window
             is not closed; therefore, we can bring it back on top of any other
             window with the focus() method. There would be no need to re-create
             the window or to reload the referenced resource. */
            windowObjectReference.focus();
        }

        // add the listener for receiving a message from the popup
        window.addEventListener('message', event => this.receiveMessage(event), false);
        // assign the previous URL
        previousUrl = url;
    };

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
                    <div className="login-container-right-form">
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
                    <div className="login-container-right-footer">
                            <div className='footer-icon-group-label'>
                                <label style={{color: '#4F4F4F'}}>Войти с помощью</label>
                            </div>

                            <div className='footer-icon-group'>
                                <a href="https://yourapi.ru/auth/oauth2/authorize/google?redirect_uri=https://yourapi.ru/oauth2/redirect" onClick={this.openSignInWindow}><Icon style={{marginRight: 44, color: '#A5A5A5'}} link name='google' size={'large'}/></a>
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
            <div className='login-form'>
                <Grid style={{paddingLeft: '80px', paddingRight: '80px'}}>
                    <Grid.Column widescreen={16} tablet={16} mobile={16} largeScreen={16} computer={16} stretched>
                        <Form size='tiny' onSubmit={this.handleSubmit}>
                            <Segment className='login-data-segment-form'>
                                <Form.Field>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>Логин/Email</label>
                                    <Input onChange={this.handleInputChange} className="form-login-input" id="login" name="login" required placeholder='Логин/Email'/>
                                </Form.Field>
                                <Form.Field style={{}}>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>Пароль</label>
                                    <Input onChange={this.handleInputChange}
                                           icon={{ name: 'eye slash outline', link: true}}
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
                                        size='large'>
                                    Войти
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }

}

export default Login;