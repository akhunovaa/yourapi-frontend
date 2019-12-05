import React, {Component} from 'react';
import './Home.css';
import {Grid, Segment, Divider, Form, Button} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false
            roleAdmin: true
        };

        if(this.props.currentUser){
            this.state = {
                name: this.props.currentUser.name,
                imageUrl: this.props.currentUser.imageUrl,
                email: this.props.currentUser.email,
                surname: this.props.currentUser.surname,
                patrName: this.props.currentUser.patrName,
                phone: this.props.currentUser.phone,
                note: this.props.currentUser.note,
            };
        }

        this.reload = this.reload.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload (){
        window.location.reload();
    };

    render() {
        return (
            <div className="main">
                <div className="header-picture">
                    <div className='header-text'>
                        <div className="header-text-main">
                            <NavLink to="/"><b style={{color: '#F2F2F2'}}>YourAPI</b></NavLink>
                        </div>
                        <div className="header-slogan">
                            <label>Небольшой рекламный</label><br />
                            <label>слоган. Может в две строчки</label>
                        </div>
                        <div className="header-buttons">
                            <div className="header-api-create-button">
                                <Button style={{background: '#F39847', color: 'white'}}
                                        size='large'>
                                    Разместить API
                                </Button>
                            </div>
                            <div className="header-company-create-button">
                                <Button style={{background: '#FFFFFF', color: '#4F4F4F'}}
                                        size='large'>
                                    Создать компанию
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;