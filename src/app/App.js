import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
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
import ApiBookmark from '../shop/api/ApiBookmark';
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
            width: window.innerWidth,
            visible: false
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
        } else {
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
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("Вы удачно покинули сессию.");
    }

    handleSliderChange = () => {
        this.setState((prevState) => ({visible: !prevState.visible}));
    };

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

        const {width, loading, authenticated, currentUser, visible} = this.state;
        const {history} = this.props;
        const isMobile = width <= 700;

        if (loading) {
            return <LoadingIndicator/>
        }

        return (
            <div>

                <AppHeader authenticated={authenticated} onLogout={this.handleLogout}
                           handleSliderChange={this.handleSliderChange} visible={visible} currentUser={currentUser}/>
                <Switch>

                    <Route exact path="/" render={(props) => <Home authenticated={authenticated} visible={visible}
                                                                   handleSliderChange={this.handleSliderChange}
                                                                   currentUser={currentUser} {...props} />}/>


                    <Route exact path="/login" render={(props) => <Login isMobile={isMobile} history={history}
                                                                         authenticated={authenticated} {...props} />}/>
                    <Route exact path="/signup" render={(props) => <SignUp isMobile={isMobile} history={history}
                                                                           authenticated={authenticated} {...props} />}/>

                    <Route exact path="/help" render={(props) => <Help authenticated={authenticated} visible={visible}
                                                                       currentUser={currentUser} {...props} />}/>
                    <Route exact path="/help/account/:page?"
                           render={(props) => <HelpAccount authenticated={authenticated}
                                                           visible={visible} {...props} />}/>

                    <Route path="/help/profile/:page?" component={HelpProfile}/>
                    <Route path="/help/shop/:page?" authenticated={authenticated} currentUser={currentUser}
                           component={HelpShop}/>
                    <Route path="/help/faq/:page?" authenticated={authenticated} currentUser={currentUser}
                           component={HelpFaq}/>
                    <Route path="/help/integrator/:page?" authenticated={authenticated} currentUser={currentUser}
                           component={HelpIntegrator}/>
                    <Route exact path="/integrator" component={Integrators}/>

                    <PrivateRoute exact path="/profile" authenticated={authenticated} currentUser={currentUser}
                                  component={Profile} onLogout={this.handleLogout} loading={loading}/>
                    <PrivateRoute exact path="/profile/administration" authenticated={authenticated}
                                  currentUser={currentUser} component={Administration}/>
                    <PrivateRoute exact path="/profile/api" authenticated={authenticated} currentUser={currentUser}
                                  component={Api}/>

                    <Route exact path="/profile/:id?" render={(props) => <UserProfile authenticated={authenticated}
                                                                                      visible={visible} {...props} />}/>
                    <Route exact path="/shop"
                           render={(props) => <Shop authenticated={authenticated} currentUser={currentUser}
                                                    visible={visible} {...props} />}/>

                    <PrivateRoute exact path="/shop/bookmarks" authenticated={authenticated} currentUser={currentUser}
                                  component={ApiBookmark}/>

                    <Route exact path="/shop/category/:category?"
                           render={(props) => <ApiCategoryShop authenticated={authenticated} currentUser={currentUser}
                                                               visible={visible} {...props} />}/>
                    <Route exact path="/shop/category/:category?/api/:id?"
                           render={(props) => <ApiDetail handleSliderChange={this.handleSliderChange}
                                                         authenticated={authenticated} currentUser={currentUser}
                                                         visible={visible} {...props} />}/>

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