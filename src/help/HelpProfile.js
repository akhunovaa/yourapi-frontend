import React, {Component} from 'react';
import './Help.css';
import HelpInnerLinksSet from './HelpInnerLinksSet';

class HelpProfile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    render() {

        const {page} = this.props.match.params;

        return (
            <div className='help-page-main'>
                <div className='left-side-help-body'>
                    <HelpInnerLinksSet {...this.props}/>
                </div>
                <div className='right-side-help-body'>
                    <h1>Profile</h1>
                    <h2>{page}</h2>
                </div>
            </div>
        )
    }
}

export default HelpProfile;