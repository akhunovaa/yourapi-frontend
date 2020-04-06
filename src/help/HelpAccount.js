import React, {Component} from 'react';
import './Help.css';
import HelpInnerLinksSet from "./HelpInnerLinksSet";
import HelpAccountApiUpload from "./HelpAccountApiUpload";

class HelpAccount extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true
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

    renderBody = (page) => {

        switch (page) {
            case 'upload':
                return <HelpAccountApiUpload {...this.props}/>;
            default:
                return  <HelpAccountApiUpload {...this.props}/>;

        }

    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {

        const {page} = this.props.match.params;

        return (
            <div className='help-page-main'>
                <div className='left-side-help-body'>
                    <HelpInnerLinksSet {...this.props}/>
                </div>
                <div className='right-side-help-body'>
                    {this.renderBody(page)}
                </div>
            </div>
        )
    }
}

export default HelpAccount;