import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {ACCESS_TOKEN} from "../constants";


const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (localStorage.get(ACCESS_TOKEN).trim() !== "" && localStorage.get(ACCESS_TOKEN).trim().length !== 0) ? (
                <Component {...rest} {...props} authenticated />
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

export default PrivateRoute