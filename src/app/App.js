import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import NotFound from '../common/NotFound';
import Home from '../home/Home';
import Help from '../help/Help';
import HelpProfile from '../help/HelpProfile';
import HelpAccount from '../help/HelpAccount';
import HelpShop from '../help/HelpShop';
import HelpFaq from '../help/HelpFaq';
import HelpIntegrator from '../help/HelpIntegrator';
import Profile from '../profile/Profile';
import UserProfile from '../profile/UserProfile';
import SignUp from '../signup/SignUp';
import Login from '../login/Login';
import Administration from '../profile/administration/Administration';
import Api from '../profile/api/Api';
import Integrators from '../integrators/Integrators';
import Shop from '../shop/Shop';
import ApiCategoryShop from '../shop/api/ApiCategoryShop';
import ApiDetail from '../shop/api/ApiDetail';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import AppHeader from '../common/AppHeader';
import AppFooter from '../common/AppFooter';
import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN} from '../constants';
import {loadReCaptcha} from 'react-recaptcha-google'
import OAuth2RedirectHandler from '../login/oauth2/OAuth2RedirectHandler';

class App extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,
            width: window.innerWidth
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        if (localStorage !== undefined && !localStorage.getItem(ACCESS_TOKEN)) {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            });
            return <Redirect
                to={{
                    pathname: "/login",
                    state: {from: this.props.location}
                }}/>;
        }
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response.response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("Вы удачно покинули сессию.");
    }

    componentDidMount() {
        this._isMounted = true;
        loadReCaptcha();
        this.loadCurrentlyLoggedInUser();
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };

    render() {

        const {width} = this.state;
        const isMobile = width <= 700;

        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        return (
            <div>
                <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} currentUser={this.state.currentUser}/>
                <Switch>
                    <PrivateRoute exact path="/" authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser} component={Home}/>
                    <Route exact path="/login"
                           render={(props) => <Login isMobile={isMobile} history={this.props.history}
                                                     authenticated={this.state.authenticated} {...props} />}/>
                    <Route exact path="/signup"
                           render={(props) => <SignUp isMobile={isMobile} history={this.props.history}
                                                      authenticated={this.state.authenticated} {...props} />}/>

                    <PrivateRoute exact path="/help" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Help}/>
                    <PrivateRoute path="/help/account/:page?" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={HelpAccount}/>
                    <PrivateRoute path="/help/profile/:page?" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={HelpProfile}/>
                    <PrivateRoute path="/help/shop/:page?" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={HelpShop}/>
                    <PrivateRoute path="/help/faq/:page?" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={HelpFaq}/>
                    <PrivateRoute path="/help/integrator/:page?" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={HelpIntegrator}/>

                    <PrivateRoute exact path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Profile} onLogout={this.handleLogout}/>
                    <PrivateRoute exact path="/profile/:id?" authenticated={this.state.authenticated} component={UserProfile} onLogout={this.handleLogout}/>

                    <PrivateRoute exact path="/profile/administration" authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser} component={Administration}/>
                    <PrivateRoute exact path="/profile/api" authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser} component={Api}/>
                    <PrivateRoute exact path="/integrator" authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser} component={Integrators}/>
                    <PrivateRoute exact path="/shop" authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser} component={Shop}/>
                    <PrivateRoute exact path="/shop/category/:category?" authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser} component={ApiCategoryShop}/>
                    <PrivateRoute exact path="/shop/category/:category?/api/:id?"
                                  authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                  component={ApiDetail}/>
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                    <Route path='*' exact={true} component={NotFound}/>
                </Switch>
                <AppFooter authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
                <Alert stack={{limit: 3}}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}

export default App;