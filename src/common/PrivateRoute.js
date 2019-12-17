import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => ({
        authenticated : state.authenticated
    });

export default withRouter(connect(mapStateToProps, null, null, {pure: false})(PrivateRoute));
