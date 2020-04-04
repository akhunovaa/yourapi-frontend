import React, {Component} from 'react';
import './Help.css';

class Help extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: false})
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    render() {

        return (
            <div className="help-main">
                <div className="help-header-picture">
                    <div className='header-text'>
                        <div className="header-slogan">
                            <span>Здесь можно узнать о том,</span><br/>
                            <span>как пользоваться нашим продуктом.</span><br/>
                            <br/>
                            <br/>
                        </div>
                        <div className="header-slogan">
                            <span>Сейчас мы находимся в стадии разработки,</span><br/>
                            <span>поэтому информация будет пополняться</span><br/>
                            <span>по мере реализации :)</span><br/>
                        </div>
                    </div>
                </div>
                <div className="help-body-container">
                    <div className="help-inner-body-container">
                        <div className="help-inner-left-container">
                            <span>Сейчас мы находимся в стадии разработки,</span><br/>
                            <span>поэтому информация будет пополняться</span><br/>
                            <span>по мере реализации :)</span><br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help;