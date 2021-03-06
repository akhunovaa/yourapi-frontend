import React, {Component} from 'react';
import './Signup.css';
import {Link, Redirect} from 'react-router-dom'
import {Button, Checkbox, Divider, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";
import { signup } from "../util/APIUtils";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN, VK_AUTH_URL, YANDEX_AUTH_URL, OAUTH2_REDIRECT_URI, BATTLE_NET_AUTH_URL } from '../constants';
import Alert from "react-s-alert";
import { ReCaptcha } from 'react-recaptcha-google'
import {unregister} from "../registerServiceWorker";
import registerServiceWorker from "../registerServiceWorker";
import LoadingIndicator from '../common/LoadingIndicator';
import {Icon as Iconx} from "@iconify/react";
import battleNet from "@iconify/icons-fa-brands/battle-net";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousUrl: '',
            windowObjectReference: null,
            loading: true
        };
        this.openSignInWindow = this.openSignInWindow.bind(this);
    }

    componentDidMount() {

        if (this.captcha) {
            this.captcha.reset();
        }

        this.setState({loading: false});
    }

    receiveMessage = event => {
        window.location.reload();
    };

    openSignInWindow(event){
        event.preventDefault();
        const target = event.target;
        const inputId = target.id;
        unregister();
        let host = window.location.origin.toString();
        let redirectUri = host + OAUTH2_REDIRECT_URI;
        let authUrl;
        switch (inputId) {
            case "google":
                authUrl = host + GOOGLE_AUTH_URL + redirectUri;
                break;
            case "facebook":
                authUrl = host + FACEBOOK_AUTH_URL + redirectUri;
                break;
            case "vk":
                authUrl = host + VK_AUTH_URL + redirectUri;
                break;
            case "yandex":
                authUrl = host + YANDEX_AUTH_URL + redirectUri;
                break;
            case "battlenet":
                authUrl = host + BATTLE_NET_AUTH_URL + redirectUri;
                break;
        }
        let width = 600, height = 700;
        let leftPosition, topPosition;
        let windowObjectReference = this.state.windowObjectReference;
        let previousUrl = this.state.previousUrl;
        window.removeEventListener('message', this.receiveMessage);
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        const strWindowFeatures = "status=no, height=" + height + ",width=" + width + ",resizable=yes,left="
            + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
            + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";

        if (windowObjectReference === null || windowObjectReference.closed) {
            window.open(authUrl, '???????? ??????????????????????', strWindowFeatures);
        } else if (previousUrl !== authUrl) {
            windowObjectReference = window.open(authUrl, '???????? ??????????????????????', strWindowFeatures);
            windowObjectReference.focus();
        } else {
            windowObjectReference.focus();
        }

        window.addEventListener('message', event => this.receiveMessage(event), false);
        previousUrl = authUrl;
        this.setState({
            previousUrl: previousUrl
        });
        registerServiceWorker();
    };

    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: this.props.location}
                }}/>;
        }

        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        let host = window.location.origin.toString();
        let redirectUri = host + OAUTH2_REDIRECT_URI;
        const googleAuthUrl = host + GOOGLE_AUTH_URL + redirectUri;
        const facebookAuthUrl = host + FACEBOOK_AUTH_URL + redirectUri;
        const vkAuthUrl = host + VK_AUTH_URL + redirectUri;
        const yandexAuthUrl = host + YANDEX_AUTH_URL + redirectUri;
        const battlenetAuthUrl = host + BATTLE_NET_AUTH_URL + redirectUri;

        return (
            <div id="login-container">

                {this.props.isMobile ? <div/> :  <div id="login-container-left"/>}

                <div id="login-container-right">
                    <div id="login-container-right-header">
                        <Header as='h3' className={'login-right-header'}>YourAPI</Header>
                    </div>
                    <div className="signup-container-right-form">
                        <div className='navigate-links'>
                            <div className='login-nav-link-left-login'>
                                <Link to="/login"><b style={{color: '#4F4F4F'}}>????????</b></Link>
                            </div>
                            <div className='signup-nav-link-right-1'>
                                <Link to="/signup"><b style={{color: '#4F4F4F'}}>??????????????????????</b></Link>
                            </div>
                        </div>
                        <SignupForm2 {...this.props} />
                        <Divider style={{marginTop: 24,  marginBottom: 0}}/>
                    </div>
                    <div className="signup-container-right-footer">
                        <div className='footer-icon-group-label'>
                            <label style={{color: '#4F4F4F'}}>?????????? ?? ??????????????</label>
                        </div>

                        <div className='footer-icon-group'>
                            {this.props.isMobile ?  <a href={googleAuthUrl}><Icon style={{marginRight: 44, color: '#A5A5A5'}} link name='google' size={'large'}/></a>:  <Icon style={{marginRight: 44, color: '#A5A5A5'}} link id='google' name='google' size={'large'} onClick={this.openSignInWindow}/>}
                            {this.props.isMobile ?  <a href={facebookAuthUrl}><Icon style={{marginRight: 44, color: '#A5A5A5'}} link name='facebook' size={'large'}/></a>:  <Icon style={{marginRight: 44, color: '#A5A5A5'}} link id='facebook' name='facebook' size={'large'} onClick={this.openSignInWindow}/>}
                            {this.props.isMobile ?  <a href={vkAuthUrl}><Icon style={{marginRight: 44, color: '#A5A5A5'}} link name='vk' size={'large'}/></a> : <Icon style={{marginRight: 44, color: '#A5A5A5'}} link id='vk' name='vk' size={'large'} onClick={this.openSignInWindow}/>}
                            {this.props.isMobile ?  <a href={yandexAuthUrl}><Icon style={{marginRight: 44, color: '#A5A5A5'}} link name='yandex' size={'large'}/></a> : <Icon style={{marginRight: 44, color: '#A5A5A5'}} link id='yandex' name='yandex' size={'large'} onClick={this.openSignInWindow}/>}
                            {this.props.isMobile ?  <a href={battlenetAuthUrl}><Iconx className='battle-net-auth-icon' icon={battleNet} id='battlenet' name='battlenet'/></a> : <Iconx className='battle-net-auth-icon' icon={battleNet} id='battlenet' name='battlenet' onClick={this.openSignInWindow}/>}
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
            captchaToken: '',
            phone: '+78000000000',
            width: window.innerWidth
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


    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    verifyCallback(recaptchaToken) {
        this.setState({
            captchaToken : recaptchaToken
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
                    if (!response.success) {
                        this.onLoadRecaptcha();
                        Alert.warning(response.message);
                    } else {
                        Alert.success("???? ?????????????? ????????????????????????????????????!");
                        this.onLoadRecaptcha();
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.history.push("/");
                        window.location.reload();
                    }
                }).catch(error => {
                Alert.error((error && error.message) || '??????-???? ?????????? ???? ??????! ???????????????????? ????????????.');
            });
        }

    }

    render() {
        const { width } = this.state;
        const isWide = width >= 2200;
        return (
            <Grid className={isWide ? 'signup-wide-grid-form' : 'signup-grid-form'}>

                <Grid.Column widescreen={16} tablet={16} mobile={16} largeScreen={16} computer={16} stretched>
                    <Form size='tiny' onSubmit={this.handleSubmit}>
                        <Segment className='login-data-segment-form'>
                                <Form.Field>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>??????/??????????</label>
                                    <Input onChange={this.handleInputChange} className="form-login-input" id="login" name="login" required placeholder='??????/??????????'/>
                                </Form.Field>
                                <Form.Field>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>?????????????????????? ??????????</label>
                                    <Input onChange={this.handleInputChange} className="form-login-input" type="email" id="email" name="email" required placeholder='Email'/>
                                </Form.Field>
                                <Form.Field style={{}}>
                                    <label style={{float: 'left', color: '#A5A5A5'}}>????????????</label>
                                    <Input onChange={this.handleInputChange}
                                        icon={{ name: 'eye slash outline', link: true }}
                                        placeholder='????????????' id="password" name="password" required type='password'
                                    />
                                </Form.Field>
                                <label style={{float: 'left', color: '#A5A5A5', marginBottom: 6}}>?????????????? 6 ????????????????</label>
                            <ReCaptcha
                                ref={(el) => {this.captcha = el;}}
                                size="normal"
                                data-theme="light"
                                render="explicit"
                                sitekey="6LeulZwUAAAAAA07OHdhKen90gZauyUDCBe8GDEn"
                                onloadCallback={this.onLoadRecaptcha}
                                verifyCallback={this.verifyCallback}
                                hl="ru"
                                style={{width: '100%'}}
                            />
                                <Form.Field>
                                    <Checkbox style={{
                                        float: 'left',
                                        color: '#4F4F4F',
                                        paddingTop: '30px',
                                        paddingBottom: '16px'
                                    }} label='?????????????????? ????????'/>
                                </Form.Field>
                                <Button type='submit' className='submit-button' fluid
                                        size='large'>
                                    ?????????????? ?????????????? ?? ??????????
                                </Button>
                                <div className='license-agreement'>
                                    <label style={{float: 'left', color: '#A5A5A5', paddingTop: '8px', wordWrap: 'break-word'}}>???????????????? ??????????????, ???? ????????????????????</label>
                                    <div style={{float: 'left', paddingTop: '0px', color: '#2F80ED', wordWrap: 'break-word'}}>
                                             <a href="/agreement.html" target="_blank" rel="noopener noreferrer">???????????????????????????????? ???????????????????? </a><span style={{color: '#A5A5A5'}}>??</span>
                                             <a href="/privacy.html" target="_blank" rel="noopener noreferrer"> ???????????????? ????????????????????????????????????</a>
                                    </div>
                                </div>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }

}


export default SignUp;