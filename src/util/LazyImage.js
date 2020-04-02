import * as PropTypes from 'prop-types'
import { Visibility, Image, Loader } from 'semantic-ui-react'
import React, {Component} from 'react';

export default class LazyImage extends Component {

    static propTypes = {
        src: PropTypes.string.isRequired,
        size: PropTypes.string,
        alt: PropTypes.string,
        onLoad: PropTypes.func,
        circular: PropTypes.bool,
        verticalAlign: PropTypes.string,
    };

    static defaultProps = {
        size: `small`,
    };

    state = {
        show: false,
    };

    showImage = () => {
        this.setState({
            show: true,
        })
    };

    render() {
        const { size } = this.props;
        if (!this.state.show) {
            return (
                <Visibility as="span" onTopVisible={this.showImage}>
                    <Loader active inline="centered" size={size} />
                </Visibility>
            )
        }
        console.log(...this.props)
        return <Image {...this.props} />
    }
}