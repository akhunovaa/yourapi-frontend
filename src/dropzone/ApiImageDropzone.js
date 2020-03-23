import React, {Component} from "react";
import "./Dropzone.css";
import error from "../img/error.png";
import {Image} from "semantic-ui-react";
import {apiProjectImageUpdate} from "../util/APIUtils";
import Alert from "react-s-alert";

class ApiImageDropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {hightlight: false};
        this.imageInputRef = React.createRef();

        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.renderErrorProgress = this.renderErrorProgress.bind(this);
        this.renderErrorState = this.renderErrorState.bind(this);
        this.onFileAdded = this.onFileAdded.bind(this);
        this.hasExtension = this.hasExtension.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.imageInputRef.current.click();
    }

    onFilesAdded(evt) {
        if (this.props.disabled) return;
        const file = evt.target.files[0];
        this.setState({imageFile: file});
        this.onFileAdded(file)
    }

    onDragOver(event) {
        event.preventDefault();
        if (this.props.disabed) return;
        this.setState({hightlight: true});
    }

    onDragLeave(event) {
        this.setState({hightlight: false});
    }

    onDrop(event) {
        event.preventDefault();
        if (this.props.disabed) return;
        const file = event.dataTransfer.files[0];
        this.onFileAdded(file)
        this.setState({hightlight: false});
    }

    onFileAdded(file) {
        this.handleImageUpload(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            })
        };
        reader.readAsDataURL(file);
        this.setState({
            imageUrl: reader.result
        });
    }

    handleImageUpload(imageFile) {
        const image = imageFile;
        const formData = new FormData();
        formData.append('file', image);
        formData.append('id', this.props.apiId);

        apiProjectImageUpdate(formData)
            .then(response => {
                if (response.error) {
                    Alert.warning(response.error + '. Необходимо заново авторизоваться');
                } else if (response.success === false) {
                    Alert.warning(response.message);
                } else {
                    Alert.success('Данные успешно сохранены');
                }
            }).catch(error => {
            Alert.error('Что-то пошло не так! Попробуйте заново.' || (error && error.message));
        });
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

    hasExtension(fileName, exts) {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

    render() {
        return (
            <div className="image-upload">
                <div className='api-image-upload-container'>
                    <div
                        className={`api-image-Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave}
                        onDrop={this.onDrop}
                        onClick={this.openFileDialog}
                        style={{cursor: this.props.disabled ? "default" : "pointer"}}>
                        <div className="api-project-avatar">
                            {
                                !this.hasExtension(this.state.imageFile, ['.jpg', '.jpeg', '.png']) && this.state.imageUrl ? (
                                    <Image src={this.state.imageUrl} size='medium' circular verticalAlign='top'
                                           alt={this.props.apiName}/>
                                ) : (
                                    <div className="api-text-avatar">
                                        <span>{this.props.apiName && this.props.apiName[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <input
                            accept="image/x-png,image/jpeg"
                            ref={this.imageInputRef}
                            className="FileInput"
                            type="file"
                            onChange={this.onFilesAdded}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ApiImageDropzone;