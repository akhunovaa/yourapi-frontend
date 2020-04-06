import React, {Component} from "react";
import "./Dropzone.css";
import {Icon} from "semantic-ui-react";
import * as PropTypes from "prop-types";


class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {isHightlighted: false};
        this.fileInputRef = React.createRef();
    }

    openFileDialog = () => {
        this.fileInputRef.current.click();
    };

    onFileAdded = (evt) => {
        const {disabled, onFileAdded} = this.props;

        if (disabled) return;
        const file = evt.target.files[0];
        this.setState({file: file});

        //todo for what do you add this if statement? (maybe remove it)
        if (onFileAdded) {
            onFileAdded(file);
        }
    };

    onDragOver = (event) => {
        event.preventDefault();
        this.setState({isHightlighted: true});
    };

    onDragLeave = (event) => {
        this.setState({isHightlighted: false});
    };

    onDrop = (event) => {
        const {onFileAdded} = this.props;
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        //todo for what do you add this if statement? (maybe remove it)
        if (onFileAdded) {
            onFileAdded(file);
        }
        this.setState({isHightlighted: false});
    };

    render() {
        const {isHightlighted} = this.state;

        const styles = {
            dropZoneDivBlock: {
                cursor: 'pointer'
            },
            dropZoneSpan: {
                marginLeft: 36
            },
            dropZoneLinkColor: {
                color: '#2F80ED'
            }
        };

        return (
            <div
                className={`Dropzone ${isHightlighted ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={styles.dropZoneDivBlock}>
                <input
                    accept="application/x-yaml,application/json"
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    onChange={this.onFileAdded}
                />
                <Icon className='api-upload-icon' link name='cloud download' size='big'/>
                <span className='api-upload-text'>Перетащите сюда файл OpenAPI 3.0</span><br/>
                <span className='api-upload-text' style={styles.dropZoneSpan}>или <a href='#' style={styles.dropZoneLinkColor}>загрузите</a> с компьютера</span>
            </div>
        );
    }
}

Dropzone.propTypes = {
    onFileAdded: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default Dropzone;