import React, {Component} from "react";
import "./Dropzone.css";
import error from "../img/error.png";
import {Image} from "semantic-ui-react";
import {apiProjectImageUpdate} from "../util/APIUtils";
import Alert from "react-s-alert";
import * as PropTypes from "prop-types";

class ApiImageDropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHightlighted: false,
            imageUrl: '',
            locallyUploaded: false
        };
        this.imageInputRef = React.createRef();

    }

    componentDidMount() {
        const {apiImage} = this.props;
        this.setState({imageUrl: apiImage});
    }

    openFileDialog = () => {
        if (this.props.disabled) return;
        this.imageInputRef.current.click();
    }

    onFilesAdded = (evt) => {
        if (this.props.disabled) return;
        const file = evt.target.files[0];
        this.setState({imageFile: file});
        this.onFileAdded(file)
    }

    onDragOver= (event) => {
        event.preventDefault();
        this.setState({isHightlighted: true});
    }

    onDragLeave = (event) => {
        this.setState({isHightlighted: false});
    }

    onDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        this.onFileAdded(file);
        this.setState({isHightlighted: false});
    }

    onFileAdded = (file) => {
        const imageFile = file;
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            })
        };
        reader.readAsDataURL(file);
        this.setState({
            imageUrl: reader.result,
            locallyUploaded: true
        });
        this.handleImageUpload(imageFile);
    }

    handleImageUpload = (imageFile) => {
        const {apiId} = this.props;

        const image = imageFile;
        const formData = new FormData();
        formData.append('file', image);
        formData.append('id', apiId);

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


    renderErrorProgress = () => {
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

    renderErrorState = () => {
        const {hasErrorFiles, setErrorFileState} = this.props;
        if (!hasErrorFiles) {
            setErrorFileState(true)
        }
    }

    hasExtension= (fileName, exts) => {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }


    render() {
        const {locallyUploaded, imageUrl, editable, isHightlighted} = this.state;
        const {disabled, apiName} = this.props;

        const host = window.location.origin.toString();
        const imageFullUrl = locallyUploaded ? imageUrl : host + "/api-data/image/" + imageUrl + "/73/73";

        return (
            <div className="image-upload">
                <div className='api-image-upload-container'>
                    <div
                        className={`api-image-Dropzone ${isHightlighted ? "Highlight" : ""}`}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave}
                        onDrop={this.onDrop}
                        onClick={this.openFileDialog}
                        style={{cursor: disabled ? "no-drop " : "pointer"}}>
                        <div className="api-project-avatar">
                            {
                                imageUrl ? (
                                    <Image src={imageFullUrl} size='medium' circular verticalAlign='top' alt={apiName}/>
                                ) : (
                                    <div className="api-text-avatar">
                                        <span>{apiName && apiName[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <input disabled={editable}
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

//todo there are a lot of props that is set in parent, probably need remove some of them
ApiImageDropzone.propTypes = {
    onFilesAdded: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClickReset: PropTypes.func.isRequired,
    hasExtension: PropTypes.bool.isRequired,
    file: PropTypes.any.isRequired,
    uploading: PropTypes.any.isRequired,
    uploadProgress: PropTypes.any.isRequired,
    successfullUploaded: PropTypes.any.isRequired,
    setErrorFileState: PropTypes.any.isRequired,
    apiName: PropTypes.any.isRequired,
    apiId: PropTypes.any.isRequired,
    apiImage: PropTypes.any.isRequired
};

export default ApiImageDropzone;