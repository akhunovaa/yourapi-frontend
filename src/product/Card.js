import React, {Component} from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import {ReCaptcha} from 'react-recaptcha-google'
import {login, signup} from '../util/APIUtils';
import Alert from 'react-s-alert';
import {Link, Redirect} from 'react-router-dom'
import GridColumn from "semantic-ui-react/dist/commonjs/collections/Grid/GridColumn";


class Card extends Component {
    state = {}

    render() {
        // if (!this.props.authenticated) {

        return (
            <div className="frame">
                <div className="card">
                    <div className="autor-team-logo"></div>
                    <div className="rating">
                        <div className="star-solid-out">
                            <div className="star-solid-in">
                                <div className="text-default-out">
                                    <span className="text-default-in">4,9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="card-title">
                        <span className="card-title-name">
                            API-FOOTBALL
                        </span>
                    </h4>
                    <GridColumn classname = ""></GridColumn>
                </div>
            </div>
        )
    }

    // return ()
    // }


}

export default Card;
