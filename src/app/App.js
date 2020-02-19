import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../common/NotFound';
import Home from '../home/Home';
import Profile from '../profile/Profile';
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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false,
            width: window.innerWidth
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });
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
        loadReCaptcha();
        this.loadCurrentlyLoggedInUser();
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {

        const { width } = this.state;
        const isMobile = width <= 500;

        if (this.state.loading) {
            return <LoadingIndicator/>
        }

            return (
                <div>
                    <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
                    <Switch>
                        {/*<Route exact path="/" render={(props) => <Home authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        <PrivateRoute exact path="/" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Home}/>
                        <Route exact path="/login"
                               render={(props) => <Login history={this.props.history} authenticated={this.state.authenticated} {...props} />}/>
                        <Route exact path="/signup"
                               render={(props) => <SignUp history={this.props.history} authenticated={this.state.authenticated} {...props} />}/>
                        {/*<Route exact path="/profile"*/}
                               {/*render={(props) => <Profile authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        {/*<Route exact path="/profile/administration"*/}
                               {/*render={(props) => <Administration authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        {/*<Route exact path="/profile/api"*/}
                               {/*render={(props) => <Api authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        {/*<Route exact path="/integrator"*/}
                               {/*render={(props) => <Integrators authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        {/*<Route exact path="/shop"*/}
                               {/*render={(props) => <Shop authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        {/*<Route exact path="/shop/category/:category?"*/}
                               {/*render={(props) => <ApiCategoryShop authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        {/*<Route exact path="/shop/category/:category?/api/:id?"*/}
                               {/*render={(props) => <ApiDetail authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}/>*/}
                        <PrivateRoute exact path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Profile}/>
                        <PrivateRoute exact path="/profile/administration" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Administration}/>
                        <PrivateRoute exact path="/profile/api" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Api}/>
                        <PrivateRoute exact path="/integrator" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Integrators}/>
                        <PrivateRoute exact path="/shop" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Shop}/>
                        <PrivateRoute exact path="/shop/category/:category?" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ApiCategoryShop}/>
                        <PrivateRoute exact path="/shop/category/:category?/api/:id?" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ApiDetail}/>
                        <Route component={NotFound}/>
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