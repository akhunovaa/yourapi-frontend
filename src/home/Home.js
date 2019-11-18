import React, {Component} from 'react';
import './Home.css';
class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false
            roleAdmin: true
        };

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
            <div className={"main"}>

            </div>
        )
    }
}

export default Home;