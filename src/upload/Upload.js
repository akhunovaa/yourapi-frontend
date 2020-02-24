import React, {Component} from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import checkCircle from '../img/baseline-check_circle_outline-24px.svg';
import error from '../img/error.png';

class Upload extends Component {

    constructor(props) {
        super(props);
    }

    renderProgress(file) {
        const uploadProgress = this.props.uploadProgress[file.name];
        if (this.props.uploading || this.props.successfullUploaded) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0}/>
                    <img
                        className="CheckIcon"
                        alt="Done"
                        src={checkCircle}
                        style={{
                            opacity:
                                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
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
        if (!this.props.hasErrorFiles) {
            this.props.setErrorFileState(true)
        }
    }

    render() {
        return (
            <div className="Upload">
                <div className='api-upload-container'>
                    <Dropzone onFilesAdded={this.props.onFilesAdded}
                              disabled={this.props.uploading || this.props.successfullUploaded}/>
                </div>
                <div className='api-upload-container-inner-elements'>
                    <div className="Files">
                        {this.props.files.map(file => {
                            if (this.props.hasExtension(file.name, ['.yaml', '.yml', '.json'])) {
                                return (
                                    <div key={file.name} className="Row">
                                        <span className="Filename">{file.name}</span>
                                        {this.renderProgress(file)}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={file.name} className="Row" onClick={this.props.onClickReset}>
                                        <span
                                            className="not-valid-filename">Недопустимый формат файла ({file.name})</span>
                                        <a href="https://swagger.io/docs/specification/about/" target="_blank">Спецификация
                                            файлов</a>
                                        {this.renderErrorState()}
                                        {this.renderErrorProgress()}
                                    </div>
                                );
                            }

                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;