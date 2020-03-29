import React, { Component } from "react";
import "./Dropzone.css";
import {Icon} from "semantic-ui-react";


class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = { hightlight: false };
        this.fileInputRef = React.createRef();

        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFileAdded = this.onFileAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    openFileDialog() {
        this.fileInputRef.current.click();
    }

    onFileAdded(evt) {
        if (this.props.disabled) return;
        const file = evt.target.files[0];
        this.setState({file: file});
        if (this.props.onFileAdded) {
            this.props.onFileAdded(file);
        }
    }

    onDragOver(event) {
        event.preventDefault();
        this.setState({ hightlight: true });
    }

    onDragLeave(event) {
        this.setState({ hightlight: false });
    }

    onDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (this.props.onFileAdded) {
            this.props.onFileAdded(file);
        }
        this.setState({ hightlight: false });
    }

    render() {
        return (
            <div
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}` }
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: 'pointer'}}>
                <input
                    accept="application/x-yaml,application/json"
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    onChange={this.onFileAdded}
                />
                <Icon className='api-upload-icon' link name='cloud download' size='big'/>
                <span className='api-upload-text' >Перетащите сюда файл OpenAPI 3.0</span><br/>
                <span className='api-upload-text' style={{marginLeft: 36}} >или <a href='#' style={{color: '#2F80ED'}}>загрузите</a> с компьютера</span>
            </div>
        );
    }
}

export default Dropzone;