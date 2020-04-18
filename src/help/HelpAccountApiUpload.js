import React, {Component} from 'react';
import './Help.css';

class HelpAccountApiUpload extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loading: false})
        }
        document.title  = 'YourAPI | Загрузка API';
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    viewData = (event) => {
        const target = event.target;
        const imgName = target.name;
        const host = window.location.origin.toString();
        const fullImageUrl = host + '/img/' + imgName;

        const leftPosition = (window.screen.width / 2) - ((640 / 2) + 10);
        const topPosition = (window.screen.height / 2) - ((400 / 2) + 50);
        const strWindowFeatures = "status=no, height=400, width=630,resizable=yes,left="
            + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
            + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
        window.open(fullImageUrl, 'Справка', strWindowFeatures);
    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const host = window.location.origin.toString();
        const {prepare, upload} = this.state;
        return (
            <div className='help-sub-page'>
                <div className='help-sub-page-left'>
                    <div className='help-sub-page-left-body'>
                        <div className='help-sub-paragraph'>
                            <a href={host + '/help/account/upload#prepare'}> <span
                                className={prepare ? 'paragraph-link-active' : 'paragraph-link'}
                                onClick={() => this.setState({
                                    prepare: true,
                                    upload: false
                                })}>Подготовка файла</span></a>
                        </div>
                        <div className='help-sub-paragraph'>
                            <a href={host + '/help/account/upload#upload'}> <span
                                className={upload ? 'paragraph-link-active' : 'paragraph-link'}
                                onClick={() => this.setState({upload: true, prepare: false})}>Загрузка</span></a>
                        </div>
                    </div>
                </div>
                <div className='help-sub-page-right'>
                    <div className='help-sub-page-right-body-parent'>
                        <div className='help-sub-page-right-body'>
                            <div className='help-sub-page-right-body-header'>
                                <span className='help-sub-page-right-body-header'>Загрузка API</span>
                            </div>

                            <div className='help-sub-page-right-body-header-text'>
                                Для работы с YourAPI необходим OpenAPI 3.0 файл, который содержит в себе дизайн
                                существующего API.
                                Для вашего удобства по ссылке развернули приложение с графическим интерфейсом, где
                                каждый
                                желающий может создать необходимый ему OpenAPI 3.0 файл.
                                По примеру, опишем минимальные требования для файла для работы с API, который при каждом
                                обращении будет присылать нам различные факты о наших пушистых друзьях.
                            </div>
                            <br/>
                            <div id='prepare'
                                 className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                1. Переходим по ссылке <a href='https://openapi.yourapi.ru'
                                                          target='_blank'>openapi.yourapi.ru</a> и заполняем все
                                необходимые
                                поля. Для примера я создам файл с заголовком «API для тестирования».
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_1.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_1.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>
                            <div
                                className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                2. Во вкладке Servers добавим внешний API сервер <a
                                href='https://cat-fact.herokuapp.com/'
                                target='_blank'>cat-fact.herokuapp.com</a>
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_2.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_2.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>
                            <div
                                className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                3. Далее переходим во вкладку «Main» где нам потребуется ввести различные пути для вновь
                                создаваемого API файла. Создадим пути <b>/facts</b> для получения
                                большого списка фактов и <b>/facts/random</b> и по необходимости можно добавить сюда
                                дополнительные параметры, к примеру список возвращаемых HTTP кодов.
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_3.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_3.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>
                            <div
                                className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                4. Сохраняем нажав на кнопку «Save» в правом верхнем углу и файл с минимальными данными
                                готов 🙂 По желанию можно скачать в форматах YAML или JSON.
                                Формат файла может быть любым и выбор зависит от вашего предпочтения в данным форматам.
                                Я же
                                выбираю JSON.
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_4.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_4.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>

                            <div
                                className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                5. Сохраняем файл у себя на жестком диске. Должен получится файл примерно такого же
                                формата
                                и соотвественно с одинаковым содержимым (если вы вводили данные такие же как у меня 🙂 )
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_5.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_5.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>

                            <div id='upload'
                                 className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                6. Этапы по созданию файла пройдены и все готово для создания API на нашем Marketplace,
                                где
                                он будет доступен для всех желающих. В личном кабинете профиля, необходимо перейти в Мои
                                API
                                и заполнить данные, которые будут доступны всем пользователям YourAPI.
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_6.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_6.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>

                            <div
                                className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                7. OpenAPI файл, который был сгенерирован выше, загружаем сюда путем перетаскивания
                                файла на
                                специально выделенную область серого цвета или же можно выбрать с компьютера нажав на
                                ссылку
                                Загрузить. Далее нажимаем кнопку Добавить. После удачной загрузки файла, переходим на
                                страницу редактирования загруженного API. При желании, на данной странице можно
                                загрузить
                                изображение.
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_7.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_7.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>

                            <div
                                className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                8. Теперь все готово и можно приступать к тестированию, вновь созданного проекта.
                            </div>
                            <div className='help-sub-page-right-body-header-image'>
                                <img src={host + '/img/image_8.png'} alt={'openapi.yourapi.ru screenshot'}
                                     name="image_8.png" border="0" align="center" width="630" height="400"
                                     onClick={this.viewData}/>
                            </div>

                            <div
                                className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                9. Ваш проект создан и теперь он доступен для пользователей. Можно поделиться с кем либо
                                ссылкой <a href='https://101-Interesnie-fakt.p.yourapi.ru'
                                           target='_blank'>101-Interesnie-fakt.p.yourapi.ru</a>
                            </div>

                            <div className='fake-footer-of-body'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HelpAccountApiUpload;