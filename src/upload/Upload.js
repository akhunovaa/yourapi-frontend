import React, {Component} from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import check from '../img/ok.png';
import error from "../img/error.png";
import * as PropTypes from "prop-types";

class Upload extends Component {

    constructor(props) {
        super(props);
        this.renderErrorProgress = this.renderErrorProgress.bind(this);
        this.renderErrorState = this.renderErrorState.bind(this);
        this.renderEmptyFileState = this.renderEmptyFileState.bind(this);
    }

    renderProgress() {
        const { uploadProgress, uploading, successfullUploaded } = this.props;
        if (uploading || successfullUploaded) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0}/>
                    <img className="CheckIcon" alt="Done" src={check}
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
                <img className="CheckIcon" alt="File format error" src={error} />
            </div>
        );
    }

    renderErrorState() {
        const { hasError, setErrorFileState } = this.props;
        if (!hasError) {
            setErrorFileState(true)
        }
    }

    renderEmptyFileState() {
        const { emptyFile, setEmptyFileState } = this.props;
        if (!emptyFile) {
            setEmptyFileState(true)
        }
    }

    render() {
        const { file, hasError, onFileAdded, uploading, successfullUploaded, onClickReset, emptyFile, } = this.props;
        const fileName = file ? file.name : '';

        return (
            <div className="Upload">
                <div className={emptyFile ? 'api-upload-container api-empty-upload-container' : 'api-upload-container'}>
                    <Dropzone onFileAdded={onFileAdded} disabled={uploading || successfullUploaded}/>
                </div>
                {
                    (!hasError && file) ? (
                        <div className='api-upload-container-inner-elements'>
                            <div className="Files">
                                <div key={fileName} className="Row">
                                    <span className="Filename">{fileName}</span>
                                    {this.renderProgress()}
                                </div>
                            </div>
                        </div>
                    ) : (hasError) ? (
                        <div key={fileName} className="Row" onClick={onClickReset}>
                            <span className="not-valid-filename">Недопустимый формат файла ({fileName})</span>
                            <a href="https://swagger.io/docs/specification/about/" target="_blank">Спецификация файлов</a>
                            {this.renderErrorState()}
                            {this.renderErrorProgress()}
                        </div>
                    ) : ""
                }
            </div>
            )
    }
}

Upload.propTypes = {
    onFileAdded: PropTypes.func.isRequired,
    uploadFiles: PropTypes.func.isRequired,
    onClickReset: PropTypes.func.isRequired,
    setErrorFileState: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    file: PropTypes.any.isRequired, //todo probably need to remove
    uploading: PropTypes.bool.isRequired,
    setEmptyFileState: PropTypes.func.isRequired,
    uploadProgress: PropTypes.any.isRequired,
    emptyFile: PropTypes.bool.isRequired,
    successfullUploaded: PropTypes.bool.isRequired
};

export default Upload;