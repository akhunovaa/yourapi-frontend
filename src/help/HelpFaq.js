import React, {Component} from 'react';
import './Help.css';
import HelpInnerLinksSet from './HelpInnerLinksSet';
import {Helmet} from "react-helmet";
import {Menu, Segment, Sidebar} from "semantic-ui-react";
import AuthContainerWrapper from "../home/AuthContainerWrapper";

class HelpFaq extends Component {

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

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    viewData = (event) => {
        const target = event.target;
        const imgName = target.name;

        //const host = window.location.origin.toString();
        const host = "https://yourapi.ru";
        const fullImageUrl = host + '/img/help/' + imgName;

        const leftPosition = (window.screen.width / 2) - ((1000 / 2) + 10);
        const topPosition = (window.screen.height / 2) - ((1000 / 2) + 50);
        const strWindowFeatures = "status=no, height=1000, width=1000,resizable=yes,left="
            + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
            + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
        window.open(fullImageUrl, 'Справка', strWindowFeatures);
    };

    render() {

        //const host = window.location.origin.toString();
        const host = "https://yourapi.ru";
        const {one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen} = this.state;
        const {visible, authenticated} = this.props;
        const seo = {
            title: "YourAPI | F.A.Q.",
            type: "website",
            siteName: 'yourapi.ru',
            description: "F.A.Q. | Часто задаваемые вопросы | YourAPI",
            url: "https://yourapi.ru/help/faq",
            image: "https://yourapi.ru/img/help/security.jpg",
            site: "@yourapi_ru",
            domain: "yourapi.ru",
            card: "summary"
        };

        return (
            <div>
                <Helmet
                    title={seo.title}
                    defer
                    meta={[
                        {name: "description", property: "og:description", content: seo.description},
                        {property: "og:title", content: seo.title},
                        {property: "og:description", content: seo.description},
                        {property: "og:type", content: seo.type},
                        {property: "og:site_name", content: seo.siteName},
                        {property: "og:url", content: seo.url},
                        {property: "og:image", content: seo.image},
                        {property: "twitter:image", content: seo.image},
                        {property: "twitter:image:alt", content: seo.description},
                        {property: "twitter:title", content: seo.title},
                        {property: "twitter:description", content: seo.description},
                        {property: "twitter:site", content: seo.site},
                        {property: "twitter:domain", content: seo.domain},
                        {property: "twitter:card", content: seo.card}
                    ]}
                />
                <Sidebar.Pushable as={Segment} className='login-sidebar-pushable'>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='right'
                        vertical
                        visible={visible}
                        className='login-slider-pushable'>
                        {authenticated ? (<div/>) : (<AuthContainerWrapper authenticated={authenticated} {...this.props}/>)}
                    </Sidebar>
                    <Sidebar.Pusher dimmed={visible}>
                        <Segment className='login-sidebar-pushable'>
                            <div className='help-page-main'>
                                <div className='left-side-help-body'>
                                    <HelpInnerLinksSet active={true} {...this.props} />
                                </div>
                                <div className='right-side-help-body'>
                                    <div className='help-sub-page'>
                                        <div className='help-sub-page-left'>
                                            <div className='help-sub-page-left-body'>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#1.'}> <span
                                                        className={one ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: true,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>1. Что такое API?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#2.'}> <span
                                                        className={two ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: true,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>2. Чем хорош API и где его используют?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#3.'}> <span
                                                        className={three ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: true,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>3. API - набор функций</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#4.'}> <span
                                                        className={four ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: true,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>4. Как вызывают API?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#5.'}> <span
                                                        className={five ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: true,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>5. Зачем нужно API?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#6.'}> <span
                                                        className={six ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: true,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>6. Что умеет YourAPI?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#example'}> <span
                                                        className={seven ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: true,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>Пример, для полноты понимания</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#7.'}> <span
                                                        className={eight ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: true,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>7. Что нового? И открытая Бета</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#8.'}> <span
                                                        className={nine ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: true,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>8. Что такое HTTP?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#9.'}> <span
                                                        className={ten ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: true,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>9. Как отправить HTTP-запрос?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#10.'}> <span
                                                        className={eleven ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: true,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>10. Как прочитать отчет HTTP-запроса?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#11.'}> <span
                                                        className={twelve ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: true,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>11. Безопасность HTTP-запроса</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#12.'}> <span
                                                        className={thirteen ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: true,
                                                            fourteen: false,
                                                            fifteen: false
                                                        })}>12. Что такое HTTPS?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#13.'}> <span
                                                        className={fourteen ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: true,
                                                            fifteen: false
                                                        })}>13. В каких случаях необходим сертификат HTTPS?</span></a>
                                                </div>
                                                <div className='help-sub-paragraph'>
                                                    <a href={host + '/help/faq#14.'}> <span
                                                        className={fifteen ? 'paragraph-link-active' : 'paragraph-link'}
                                                        onClick={() => this.setState({
                                                            one: false,
                                                            two: false,
                                                            three: false,
                                                            four: false,
                                                            five: false,
                                                            six: false,
                                                            seven: false,
                                                            eight: false,
                                                            nine: false,
                                                            ten: false,
                                                            eleven: false,
                                                            twelve: false,
                                                            thirteen: false,
                                                            fourteen: false,
                                                            fifteen: true
                                                        })}>14. Что нужно для перехода сайта на HTTPS?</span></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='help-sub-page-right'>
                                            <div className='help-sub-page-right-body-parent'>
                                                <div className='help-sub-page-right-body'>
                                                    <div className='help-sub-page-right-body-header'>
                                                        <span className='help-sub-page-right-body-header'>F.A.Q.</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        В данном посте постарались собрать ответы на часто задаваемые вами
                                                        вопросы:
                                                    </div>
                                                    <div id='1.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                        <span className='help-paragraph'>1. Что такое API?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        API (Application programming interface) — это контракт, который
                                                        предоставляет программа. «Ко мне можно обращаться так и так, я
                                                        обязуюсь делать то и это».
                                                    </div>

                                                    <div id='2.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                        <span className='help-paragraph'>2. Чем хорош API и где его используют?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Используют для обработки функций на стороне сервера. К примеру, я
                                                        хочу узнать погоду на Камчатке и делаю запрос на API сервис
                                                        метео-станции Камчатки. На их сервера. Сервер обрабатывает всю
                                                        информацию (собирает погоду с окружающей местности) и высылает
                                                        клиенту.
                                                    </div>

                                                    <div id='3.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                        <span className='help-paragraph'>3. API - набор функций</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Набор функций на удаленном сервере, которые необходимо вызвать.
                                                        Вызываем функцию - функция начинает работать - клиент получает
                                                        информацию (результат выполненной функции)
                                                    </div>

                                                    <div id='4.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                        <span className='help-paragraph'>4. Как вызывают API?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        API вызываются посредством HTTP запросов (GET, POST ... методы) HTTP
                                                        - символьно-ориентированный клиент-серверный протокол прикладного
                                                        уровня без сохранения состояния, используемый сервисом World Wide
                                                        Web.
                                                    </div>

                                                    <div id='5.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                        <span className='help-paragraph'>5. Зачем нужно API?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        На примере банка, это дает возможность выполнять и обрабатывать
                                                        различные платежи в автоматическом режиме. К примеру можно
                                                        заполучить баланс своей карты, посредством выполнения запроса на API
                                                        сервер своего банка. Или отправить деньги куда-либо.
                                                    </div>

                                                    <div id='6.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                        <span className='help-paragraph'>6. Что умеет YourAPI?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Мы являемся Marketplace'ом (рынком), где могут выставлять свои
                                                        товары (API) все желающие разработчики API. Например, я разработал
                                                        API сервис для генерации случайных картинок и хочу зарабатывать на
                                                        этом. Регистрируюсь на сайте, выставляю свое API и за каждый HTTP
                                                        запрос получаю деньги. Пользователь получают сгенерированные
                                                        картинки на моем сервисе - я получаю деньги.

                                                        Проект представляет собой Marketplace IT решений, где каждый
                                                        разработчик сможет зарабатывать на разработанном своем API
                                                        (https://ru.wikipedia.org/wiki/API) сервисе за определенную награду.
                                                    </div>

                                                    <div id='example'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>Пример, для полноты понимания</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Владелец частной метеостанции, имея в наличии неплохой арсенал по
                                                        прогнозу погоды, задумывает зарабатывать на этом, предоставляя
                                                        каждому желающему детальную сводку о погоде в определенном регионе.
                                                        Разработав API (https://ru.wikipedia.org/wiki/API) сервис, где на
                                                        каждый запрос он возвращает данные по погоде и выставляет данный API
                                                        сервис на наш Marketplace. Указывает цену, придумывает описание,
                                                        которое доступно каждому пользователю. К примеру, 1000 запросов
                                                        бесплатно, а сверх лимита - 20 копеек за каждый последующий. При 10
                                                        тысячах запросов в месяц, новостной портал заплатит 1800 рублей
                                                        владельцу метеостанции, из которых 10 процентов забирает наш
                                                        Marketplace (180 рублей). После этого, пролистывая наш Marketplace
                                                        некий новостной портал, назовем его "Заполярье.ру" (название сайта
                                                        вымышленное), новостной портал - увидев данное предложение
                                                        заинтересовывается в нем и планирует выставить у себя на портале
                                                        изображение или сводку с подробной погодой для каждого посетителя
                                                        своего сайта-портала. Для того чтобы показать подробную погоду
                                                        своему пользователю, он готов пользоваться данным сервисом по погоде
                                                        и платить по 20 копеек владельцу метеостанции за каждый запрос сверх
                                                        лимита в 1000 единиц .

                                                        Весь биллинг, нагрузку и привлечение аудитории берет на себя
                                                        Marketplace и поэтому владельцу метеостанции выгодно продавать
                                                        сводку о погоде через Marketplace.
                                                    </div>

                                                    <div id='7.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>7. Что нового? И открытая Бета.</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Теперь вы можете поделится во всех социальных сетях нашими
                                                        проектами.

                                                        В III квартале 2020 г. выходим на стадию Бета-тестирования и проект
                                                        планируется быть бесплатным для доступа и использования, в целях
                                                        анализа нагрузки и выявления критических багов. Уже сейчас были
                                                        использованы современные технологии и языки программирования,
                                                        которые не уступают, а даже превосходят технологии используемые в
                                                        трех самых крупных банков страны.
                                                    </div>

                                                    <div id='8.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                        <span className='help-paragraph'>8. Что такое HTTP?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-image'>
                                                        <img src={host + '/img/help/http_protocol.jpg'}
                                                             alt={'8. Что такое HTTP?'}
                                                             name="http_protocol.jpg" border="0" align="center" width="630"
                                                             height="600" onClick={this.viewData}/>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        HTTP — широко распространённый протокол передачи данных, изначально
                                                        предназначенный для передачи гипертекстовых документов (то есть
                                                        документов, которые могут содержать ссылки, позволяющие организовать
                                                        переход к другим документам).

                                                        Аббревиатура HTTP расшифровывается как HyperText Transfer Protocol,
                                                        «протокол передачи гипертекста». В соответствии со спецификацией
                                                        OSI, HTTP является протоколом прикладного (верхнего, 7-го) уровня.
                                                        Актуальная на данный момент версия протокола, HTTP 1.1, описана в
                                                        спецификации RFC 2616.

                                                        Также HTTP часто используется как протокол передачи информации для
                                                        других протоколов прикладного уровня, таких как SOAP, XML-RPC и
                                                        WebDAV. В таком случае говорят, что протокол HTTP используется как
                                                        «транспорт».

                                                        API многих программных продуктов также подразумевает использование
                                                        HTTP для передачи данных — сами данные при этом могут иметь любой
                                                        формат, например, XML или JSON.

                                                        Как правило, передача данных по протоколу HTTP осуществляется через
                                                        TCP/IP-соединения. Серверное программное обеспечение при этом обычно
                                                        использует TCP-порт 80 (и, если порт не указан явно, то обычно
                                                        клиентское программное обеспечение по умолчанию использует именно
                                                        80-й порт для открываемых HTTP-соединений), хотя может использовать
                                                        и любой другой.
                                                    </div>

                                                    <div id='9.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>9. Как отправить HTTP-запрос?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Для того, чтобы сформировать HTTP-запрос, необходимо составить
                                                        стартовую строку, а также задать по крайней мере один заголовок —
                                                        это заголовок Host, который является обязательным, и должен
                                                        присутствовать в каждом запросе. Дело в том, что преобразование
                                                        доменного имени в IP-адрес осуществляется на стороне клиента, и,
                                                        соответственно, когда вы открываете TCP-соединение, то удалённый
                                                        сервер не обладает никакой информацией о том, какой именно адрес
                                                        использовался для соединения. Однако фактически сетевое соединение
                                                        во всех случаях открывается с узлом 212.24.43.44, и даже если
                                                        первоначально при открытии соединения был задан не этот IP-адрес, а
                                                        какое-либо доменное имя, то сервер об этом никак не информируется —
                                                        и именно поэтому этот адрес необходимо передать в заголовке Host.

                                                        Метод (в англоязычной тематической литературе используется слово
                                                        method, а также иногда слово verb — «глагол») представляет собой
                                                        последовательность из любых символов, кроме управляющих и
                                                        разделителей, и определяет операцию, которую нужно осуществить с
                                                        указанным ресурсом. Спецификация HTTP 1.1 не ограничивает количество
                                                        разных методов, которые могут быть использованы, однако в целях
                                                        соответствия общим стандартам и сохранения совместимости с
                                                        максимально широким спектром программного обеспечения как правило
                                                        используются лишь некоторые, наиболее стандартные методы, смысл
                                                        которых однозначно раскрыт в спецификации протокола.

                                                        URI (Uniform Resource Identifier, унифицированный идентификатор
                                                        ресурса) — путь до конкретного ресурса (например, документа), над
                                                        которым необходимо осуществить операцию (например, в случае
                                                        использования метода GET подразумевается получение ресурса).
                                                        Некоторые запросы могут не относиться к какому-либо ресурсу, в этом
                                                        случае вместо URI в стартовую строку может быть добавлена звёздочка
                                                        (астериск, символ «*»). Например, это может быть запрос, который
                                                        относится к самому веб-серверу, а не какому-либо конкретному
                                                        ресурсу.
                                                    </div>

                                                    <div id='10.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>10. Как прочитать отчет HTTP-запроса?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Версия протокола здесь задаётся так же, как в запросе.

                                                        Код состояния (Status Code) — три цифры (первая из которых указывает
                                                        на класс состояния), которые определяют результат совершения
                                                        запроса. Например, в случае, если был использован метод GET, и
                                                        сервер предоставляет ресурс с указанным идентификатором, то такое
                                                        состояние задаётся с помощью кода 200. Если сервер сообщает о том,
                                                        что такого ресурса не существует — 404. Если сервер сообщает о том,
                                                        что не может предоставить доступ к данному ресурсу по причине
                                                        отсутствия необходимых привилегий у клиента, то используется код
                                                        403. Спецификация HTTP 1.1 определяет 40 различных кодов HTTP, а
                                                        также допускается расширение протокола и использование
                                                        дополнительных кодов состояний.

                                                        Пояснение к коду состояния (Reason Phrase) — текстовое (но не
                                                        включающее символы CR и LF) пояснение к коду ответа, предназначено
                                                        для упрощения чтения ответа человеком. Пояснение может не
                                                        учитываться клиентским программным обеспечением, а также может
                                                        отличаться от стандартного в некоторых реализациях серверного ПО.
                                                    </div>

                                                    <div id='11.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>11. Безопасность HTTP-запроса</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-image'>
                                                        <img src={host + '/img/help/security.jpg'}
                                                             alt={'11. Безопасность HTTP-запроса'}
                                                             name="security.jpg" border="0" align="center" width="630"
                                                             height="600" onClick={this.viewData}/>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Сам по себе протокол HTTP не предполагает использование шифрования
                                                        для передачи информации. Тем не менее, для HTTP есть
                                                        распространённое расширение, которое реализует упаковку передаваемых
                                                        данных в криптографический протокол SSL или TLS.

                                                        Название этого расширения — HTTPS (HyperText Transfer Protocol
                                                        Secure). Для HTTPS-соединений обычно используется TCP-порт 443.
                                                        HTTPS широко используется для защиты информации от перехвата, а
                                                        также, как правило, обеспечивает защиту от атак вида
                                                        man-in-the-middle — в том случае, если сертификат проверяется на
                                                        клиенте, и при этом приватный ключ сертификата не был
                                                        скомпрометирован, пользователь не подтверждал использование
                                                        неподписанного сертификата, и на компьютере пользователя не были
                                                        внедрены сертификаты центра сертификации злоумышленника.

                                                        На данный момент HTTPS поддерживается всеми популярными
                                                        веб-браузерами.

                                                        REST - (Representational state transfer) – это стиль архитектуры
                                                        программного обеспечения для распределенных систем
                                                    </div>

                                                    <div id='12.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>12. Что такое HTTPS?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        HTTPS (Hypertext Transport Protocol Secure) – это протокол, который
                                                        обеспечивает конфиденциальность обмена данными между сайтом и
                                                        пользовательским устройством. Безопасность информации обеспечивается
                                                        за счет использования криптографических протоколов SSL/TLS, имеющих
                                                        3 уровня защиты:

                                                        шифрование данных. Позволяет избежать их перехвата.

                                                        сохранность данных. Любое изменение данных фиксируется.

                                                        аутентификация. Защищает от перенаправления пользователя.
                                                    </div>

                                                    <div id='13.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>13. В каких случаях необходим сертификат HTTPS?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-image'>
                                                        <img src={host + '/img/help/tls_request.jpg'}
                                                             alt={'13. В каких случаях необходим сертификат HTTPS?'}
                                                             name="tls_request.jpg" border="0" align="center" width="630"
                                                             height="600" onClick={this.viewData}/>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Обязательное использование защищенного протокола передачи данных
                                                        требует вся информация, касающаяся проведения платежей в интернете:
                                                        оплата товаров в интернет-магазинах любым способом (индивидуальная
                                                        платежная карта, онлайн системы платежей и пр.), оплата услуг через
                                                        интернет-банкинг, совершение платежей в онлайн сервисах (казино,
                                                        online-курсы и т.п.) и многое другое.

                                                        Использовать протокол HTTPS рекомендуется также на сайтах, которые
                                                        для доступа к определенному контенту запрашивают личные данные
                                                        пользователей, например, номер паспорта – такие данные необходимо
                                                        защищать от перехвата злоумышленниками.

                                                        Если на вашем сайте используется что-либо похожее, то вам стоит
                                                        серьезно задуматься над переходом на HTTPS. Поэтому далее мы
                                                        рассмотрим, что для этого необходимо.
                                                    </div>

                                                    <div id='14.'
                                                         className='help-sub-page-right-body-header-text help-sub-page-right-body-header-next-text'>
                                                    <span
                                                        className='help-paragraph'>14. Что нужно для перехода сайта на HTTPS?</span>
                                                    </div>
                                                    <div className='help-sub-page-right-body-header-text'>
                                                        Работа протокола HTTPS основана на том, что компьютер пользователя и
                                                        сервер выбирают общий секретный ключ, с помощью которого и
                                                        происходит шифрование передаваемой информации. Это ключ уникальный и
                                                        генерируется для каждого сеанса. Считается, что его подделать
                                                        невозможно, так как в нем содержится более 100 символов. Во
                                                        избежание перехвата данных третьим лицом используется цифровой
                                                        сертификат – это электронный документ, который идентифицирует
                                                        сервер. Каждый владелец сайта (сервера) для установки защищенного
                                                        соединения с пользователем должен иметь такой сертификат.

                                                        В этом электронном документе указываются данные владельца и подпись.
                                                        С помощью сертификата вы подтверждаете, что:

                                                        Лицо, которому он выдан, действительно существует,

                                                        Оно является владельцем сервера (сайта), который указан в
                                                        сертификате.

                                                        Первое, что делает браузер при установке соединения по протоколу
                                                        HTTPS, это проверку подлинности сертификата, и только в случае
                                                        успешного ответа начинается обмен данными.

                                                        Сертификатов существует несколько видов в зависимости от:

                                                        того, какой уровень безопасности вам необходим,
                                                        количества доменных имен и поддоменов,
                                                        количества владельцев.
                                                        Но это уже тема отдельной статьи. Выдают их специализированные
                                                        центры сертификации на возмездной основе и на определенный период,
                                                        поэтому важно не забывать продлевать действие сертификата.
                                                    </div>

                                                    <div className='fake-footer-of-body'>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default HelpFaq;