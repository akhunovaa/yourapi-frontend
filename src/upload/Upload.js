import React, {Component} from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import check from '../img/ok.png';
import error from "../img/error.png";

class Upload extends Component {

    constructor(props) {
        super(props);
        this.renderErrorProgress = this.renderErrorProgress.bind(this);
        this.renderErrorState = this.renderErrorState.bind(this);
        this.renderEmptyFileState = this.renderEmptyFileState.bind(this);
    }

    renderProgress() {
        const uploadProgress = this.props.uploadProgress;
        if (this.props.uploading || this.props.successfullUploaded) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0}/>
                    <img
                        className="CheckIcon"
                        alt="Done"
                        src={check}
                        style={{
                            opacity: uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                    />
                </div>
            );
        }
    }

    renderErrorProgress() {
        return (
            <div className="ProgressWrapper">
                <div className="error-progressBar"/>
                <img
                    className="CheckIcon"
                    alt="File format error"
                    src={error}
                />
            </div>
        );
    }

    renderErrorState() {
        if (!this.props.hasError) {
            this.props.setErrorFileState(true)
        }
    }

    renderEmptyFileState() {
        if (!this.props.emptyFile) {
            this.props.setEmptyFileState(true)
        }
    }

    render() {
        const fileName = this.props.file ? this.props.file.name : '';

        if (!this.props.hasError && this.props.file) {
            return (
                <div className="Upload">
                    <div className='api-upload-container'>
                        <Dropzone onFileAdded={this.props.onFileAdded}
                                  disabled={this.props.uploading || this.props.successfullUploaded}/>
                    </div>
                    <div className='api-upload-container-inner-elements'>
                        <div className="Files">
                            <div key={fileName} className="Row">
                                <span className="Filename">{fileName}</span>
                                {this.renderProgress()}
                            </div>
                        </div>
                    </div>
                </div>)
        } else if (this.props.hasError) {
            return (
                <div className="Upload">
                    <div className='api-upload-container'>
                        <Dropzone onFileAdded={this.props.onFileAdded}
                                  disabled={this.props.uploading || this.props.successfullUploaded}/>
                    </div>
                    <div key={fileName} className="Row" onClick={this.props.onClickReset}>
                        <span className="not-valid-filename">Недопустимый формат файла ({fileName})</span>
                        <a href="https://swagger.io/docs/specification/about/" target="_blank">Спецификация файлов</a>
                        {this.renderErrorState()}
                        {this.renderErrorProgress()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Upload">
                    <div
                        className={this.props.emptyFile ? 'api-upload-container api-empty-upload-container' : 'api-upload-container'}>
                        <Dropzone onFileAdded={this.props.onFileAdded}
                                  disabled={this.props.uploading || this.props.successfullUploaded}/>
                    </div>
                </div>)
        }
    }
}

export default Upload;