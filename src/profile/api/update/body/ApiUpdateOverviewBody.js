import React, {Component} from 'react';
import './ApiDetailsBody.css';
import {Button, Dropdown, Form, Image, Input, TextArea} from "semantic-ui-react";
import ApiImageDropzone from "../../../../dropzone/ApiImageDropzone";

class ApiUpdateOverviewBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            description: 'Описание',
            category: 'Финансы',
            terms: 'Особые условия',
            formUpdateDisabled: false,
            apiProjectImageUrl: '',
            loading: false,
            api: this.props.apiProject
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.onClickReset = this.onClickReset.bind(this);
        this.iterateApiProjectList = this.iterateApiProjectList.bind(this);
        this.handleNamingCheck = this.handleNamingCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.iterateApiProjectList(this.props.projects, this.props.naming);
        this.setState({loading: false});
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

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };

    onClickReset() {
       this.reload();
    }

    handleNamingCheck(array, val) {
        return array.some(item => item.name === val);
    }

    iterateApiProjectList(array, val) {
        for (const arrayElement of array) {
            if(arrayElement.name === val){
                this.setState({
                    id: arrayElement.id,
                    name: arrayElement.fullName,
                    category: arrayElement.category,
                    description: arrayElement.description
                });
                return arrayElement;
            }
        }
    }

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
            <div className='detail-overview-body'>
                <h1 className="title"><span>Описание API</span></h1>
                <form>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left'}}>Наименование API</label>
                        <Input onChange={this.handleInputChange} value={this.state.name}
                               className="form-input" id="apiName" disabled
                               name="name" required placeholder='Наименование API'/>
                    </div>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Описание</label>
                        <Form>
                                        <TextArea className='detail-overview-api-name-textarea'
                                                  onChange={this.handleInputChange} placeholder='Расскажите о своем API'
                                                  id="description" disabled={this.state.formUpdateDisabled}
                                                  name="description" value={this.state.description}/>
                        </Form>
                    </div>

                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Загрузка изображения (JPEG/PNG 500x500)</label>
                        <ApiImageDropzone onFilesAdded={this.onFilesAdded} uploadFiles={this.uploadFiles}
                                onClickReset={this.onClickReset} sendRequest={this.uploadNewImage}
                                hasExtension={this.hasExtension}
                                file={this.state.file} uploading={this.state.uploading}
                                uploadProgress={this.state.uploadProgress}
                                successfullUploaded={this.state.successfullUploaded} setErrorFileState={this.setErrorFileState} apiName={this.state.name}/>

                    </div>

                    <div className="api-add-container-input api-add-container-input-element">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Категория</label>
                        <Dropdown onChange={this.handleDropdownChange} placeholder='Категория' fluid search
                                  selection id="category" name="category" noResultsMessage="Москва - лучший город"
                                  className="form-input" options={apiCategoryOptions}
                                  disabled={this.state.formUpdateDisabled}
                                  value={this.state.category}/>
                    </div>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Условия использования</label>
                        <Form>
                                        <TextArea className='detail-overview-api-name-textarea'
                                                  onChange={this.handleInputChange}
                                                  placeholder='Опишите условия по использованию'
                                                  id="terms" disabled={this.state.formUpdateDisabled}
                                                  name="terms" value={this.state.terms}/>
                        </Form>
                    </div>

                    <div className="api-update-buttons">
                        <div className='apply-button-container'>
                            <Button fluid className="apply-button"
                                    style={{width: 112, height: 32, background: '#2F80ED'}}><span
                                className='command-approve-buttons-text'>Сохранить</span></Button>
                        </div>
                        <div className='cancel-button-container api-info-cancel-button'>
                            <Button fluid className="cancel-button"
                                    style={{background: '#A5A5A5', width: 112, height: 32}}>
                                <span className='command-approve-buttons-text'>Отмена</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default ApiUpdateOverviewBody;
