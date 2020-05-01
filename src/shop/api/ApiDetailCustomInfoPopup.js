import React, {Component} from 'react';
import './ApiDetail.css';
import {List} from "semantic-ui-react";

class ApiDetailCustomInfoPopup extends Component {

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


    render() {

        const {description, info, image, name, host, category, link, updated, operations} = this.props;
        const {loading} = this.state;

        const styles = {
            methodElement: {
                color: '#219653',
                paddingRight: 12
            }
        };

        return (
            <div className='api-detail-info-popup'>
                <div className='api-detail-info-popup-description'>
                    {
                        operations ? operations.map((item, index) => {
                            return (
                                <List.List key={index + item.path} className='detail-methods-element-body-content'>
                                    <List.Content className='detail-methods-element-body'>
                                            <div className='detail-popup-methods-element' id={item.path}>
                                                <span id={item.path} style={styles.methodElement}>{item.method}</span><span id={item.path}>{item.path}</span>
                                            </div>
                                    </List.Content>
                                </List.List>
                                )
                        }) : undefined
                    }
                </div>
            </div>
        )
    }
}

export default ApiDetailCustomInfoPopup;