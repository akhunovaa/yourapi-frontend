import React, {Component} from 'react';
import './Api.css';
import {Button, Divider, Dropdown, Form, Input, TextArea} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import Upload from "../../upload/Upload";
import {newApiUploadSend} from "../../util/APIUtils";
import Alert from "react-s-alert";

class ApiAddBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            api: {
                name: 'Sportspage Feeds',
                info: 'Результаты в реальном времени, расписание и коэффициенты ставок для лиг США',
                category: 'Новости'
            },
            apiName: '',
            description: '',
            category: 'Новости',
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
            hasErrorFiles: false
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.onClickReset = this.onClickReset.bind(this);
        this.uploadNewApi = this.uploadNewApi.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.setErrorFileState = this.setErrorFileState.bind(this);
    }

    onFilesAdded(files) {
        this.setState(prevState => ({
            files: files
        }));
    }

    setErrorFileState(state) {
        this.setState(prevState => ({
            hasErrorFiles: prevState ? prevState : state
        }));
    }

    hasExtension(fileName, exts) {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

    onClickReset() {
        this.setState({files: [], successfullUploaded: false, hasErrorFiles: false})
    }

    uploadNewApi(file) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = {...this.state.uploadProgress};
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    };
                    this.setState({uploadProgress: copy});
                }
            });

            req.upload.addEventListener("load", event => {
                const copy = {...this.state.uploadProgress};
                copy[file.name] = {state: "done", percentage: 100};
                this.setState({uploadProgress: copy});
                this.setState({uploaderResponse: req.response});
                resolve(req.response);
            });

            req.upload.addEventListener("error", event => {
                const copy = {...this.state.uploadProgress};
                copy[file.name] = {state: "error", percentage: 0};
                this.setState({uploadProgress: copy});
                reject(req.response);
            });

            const apiName = this.state.apiName;
            const description = this.state.description;
            const category = this.state.category;
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("name", apiName);
            formData.append("description", description);
            formData.append("category", category);
            if (apiName && apiName.length >= 3) {
                newApiUploadSend(req, formData);
            } else {
                Alert.warning("Ошибка в наименовании")
            }
        });
    }

    async uploadFiles() {
        this.setState({uploadProgress: {}, uploading: true});
        const promises = [];
        if (!this.state.hasErrorFiles) {
            this.state.files.forEach(file => {
                promises.push(this.uploadNewApi(file));
            });
        }

        try {
            await Promise.all(promises);
            this.setState({successfullUploaded: true, uploading: false});
            this.forceUpdate();
        } catch (e) {
            // Not Production ready! Do some error handling here instead...
            this.setState({successfullUploaded: true, uploading: false});
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleDropdownChange(e, {name, value}) {
        this.setState({[name]: value});
    }


    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleCheck(array, val) {
        return array.some(item => item === val);
    }


    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const apiCategoryOptions = [
            {
                name: 'Спорт',
                text: 'Спорт',
                value: 'Спорт'
            },
            {
                name: 'Новости',
                text: 'Новости',
                value: 'Новости'
            },
            {
                name: 'Данные',
                text: 'Данные',
                value: 'Данные'
            },
            {
                name: 'Финансы',
                text: 'Финансы',
                value: 'Финансы'
            },
            {
                name: 'Мобильные',
                text: 'Мобильные',
                value: 'Мобильные'
            },
            {
                name: 'Порно',
                text: 'Порно',
                value: 'Порно'
            },
            {
                name: 'Карты',
                text: 'Карты',
                value: 'Карты'
            },
            {
                name: 'Реклама',
                text: 'Реклама',
                value: 'Реклама'
            },
            {
                name: 'Социальные сети',
                text: 'Социальные сети',
                value: 'Социальные сети'
            },
            {
                name: 'Здравохранение',
                text: 'Здравохранение',
                value: 'Здравохранение'
            },
            {
                name: 'Web',
                text: 'Web',
                value: 'Web'
            },
            {
                name: 'Другое',
                text: 'Другое',
                value: 'Другое'
            }
        ];


        return (
            <div className='api-body-main'>
                <div className="api-add-container">
                    <div className="api-add-container-title">
                        <span>Добавить API</span>
                    </div>
                    <div className="api-add-container-inputs">
                        <div className="api-add-container-input api-add-container-input-top">
                            <label>Название (обязательно)</label>
                            <Input fluid onChange={this.handleInputChange}
                                   className="form-input" id="apiName"
                                   name="apiName" required placeholder='Название API'/>
                        </div>
                        <div className="api-add-container-input api-add-container-input-element">
                            <div className="api-add-container-input-textarea">
                                <label style={{paddingBottom: '6px'}}>Краткое описание</label>
                                <Form style={{paddingTop: '6px'}}>
                                    <TextArea onChange={this.handleInputChange}
                                              placeholder='Краткое описание создаваемого API'
                                              style={{minHeight: 64, maxHeight: 64, minWidth: 352}} id="description"
                                              name="description"/>
                                </Form>
                                <label className='helper-message'>70-80 символов</label>
                            </div>
                        </div>
                        <div className="api-add-container-input api-add-container-input-element">
                            <label style={{paddingBottom: '6px'}}>Категория</label>
                            <Dropdown onChange={this.handleDropdownChange} placeholder='Категория' fluid search
                                      selection id="category" name="category" noResultsMessage="Москва - лучший город"
                                      className="form-input" options={apiCategoryOptions}
                                      defaultValue={this.state.category}/>
                        </div>

                        <div className="api-add-container-input api-add-container-segment-element">
                            <Upload onFilesAdded={this.onFilesAdded} uploadFiles={this.uploadFiles}
                                    onClickReset={this.onClickReset} sendRequest={this.uploadNewApi}
                                    hasExtension={this.hasExtension}
                                    setErrorFileState={this.setErrorFileState} hasErrorFiles={this.state.hasErrorFiles}
                                    files={this.state.files} uploading={this.state.uploading}
                                    uploadProgress={this.state.uploadProgress}
                                    successfullUploaded={this.state.successfullUploaded}/>
                        </div>
                    </div>
                </div>
                <Divider style={{marginTop: '20px', marginBottom: 0}}/>
                <div className="api-info-buttons">
                    <div className='apply-button-container'>
                        <Button fluid className="apply-button" style={{width: 112, height: 32, background: '#2F80ED'}}
                                onClick={this.uploadFiles}><span
                            className='command-approve-buttons-text'>Добавить</span></Button>
                    </div>
                    <div className='cancel-button-container api-info-cancel-button'>
                        <Button onClick={this.onClickReset}
                                fluid className="cancel-button" style={{background: '#A5A5A5', width: 112, height: 32}}>
                            <span className='command-approve-buttons-text'>Отмена</span>
                        </Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(ApiAddBody);