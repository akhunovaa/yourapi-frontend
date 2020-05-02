import React, {Component} from 'react'
import {Grid, Icon, Popup} from 'semantic-ui-react'
import './BookmarkList.css';
import {bookmarkApiListGet} from "../../util/APIUtils";
import {BookmarkLoadingIndicator} from '../../common/LoadingIndicator';
import {NavLink} from "react-router-dom";
import {getLink4Description} from "../../util/ElementsDataUtils";
import LazyBookmarkMiniImage from '../../util/LazyBookmarkMiniImage';

const host = window.location.origin.toString();
const timeoutLength = 4500;

class BookmarkList extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bookmarkData: [],
            clicked: false,
            isOpen: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            bookmarkApiListGet(3)
                .then(response => {
                    this.setState({
                        bookmarkData: response.response,
                        loading: false
                    });
                }).catch(error => {
                this.setState({
                    loading: false
                });
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            bookmarkData: []
        });
        this._isMounted = false;
    }

    handleOpen = () => {
        this.setState((prevState) => ({clicked: !prevState.clicked, isOpen: true}));
        this.timeout = setTimeout(() => {
            this.setState((prevState) => ({clicked: !prevState.clicked, isOpen: false}))
        }, timeoutLength)
    };

    handleClose = () => {
        this.setState((prevState) => ({clicked: !prevState.clicked, isOpen: false}));
        clearTimeout(this.timeout)
    };

    render() {
        const {loading, bookmarkData, clicked, isOpen} = this.state;
        const {colored} = this.props;

        return (
            <div className='header-right-bookmark blue-hover'>
                <Popup
                    trigger={clicked ?
                        <Icon link name='close' size={'large'} onClick={this.handleClose}
                              style={{color: clicked ? '' : '#2F80ED'}} className={colored}/> :
                        <Icon link size={'large'} name={clicked ? 'bookmark' : 'bookmark outline'}
                              style={{color: clicked ? '#2F80ED' : ''}} className={colored}/>}
                    header='Избранное'
                    open={isOpen}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    on='focus' position='bottom right' wide size={'small'}
                    content={loading || bookmarkData === undefined ? <BookmarkLoadingIndicator/>
                        :
                        <Grid textAlign='left' style={{minHeight: 50, minWidth: 250}}>
                            <div style={{width: '100%', paddingTop: 8}}/>
                            {
                                bookmarkData.length > 0 ? bookmarkData.map(item => (
                                    <Grid.Row key={item.id + item.name} divided>

                                        <Grid.Column width={3} verticalAlign={'middle'} textAlign={'justified'}>
                                            {
                                                item.img ? (
                                                    <NavLink to={getLink4Description(item.category) + item.uuid}>
                                                        <LazyBookmarkMiniImage
                                                            src={host + "/api-data/image/" + item.img}/>
                                                    </NavLink>
                                                ) : (
                                                    <div className="home-api-text-avatar">
                                                        <NavLink
                                                            to={getLink4Description(item.category) + item.uuid}><span>{item.fullName && item.fullName[0]}</span></NavLink>
                                                    </div>
                                                )
                                            }
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <NavLink to={getLink4Description(item.category) + item.uuid}>
                                                <div style={{whiteSpace: 'nowrap', paddingTop: 4}}>
                                                <span style={{color: '#2F80ED'}}>
                                                    {item.fullName}
                                                </span>
                                                </div>
                                                <div style={{paddingTop: 4}}>
                                                    <span style={{color: '#4F4F4F'}}>
                                                        {item.description}
                                                    </span>
                                                </div>
                                            </NavLink>
                                        </Grid.Column>

                                    </Grid.Row>
                                )) : <div style={{color: '#A5A5A5'}}>Данные отсутствуют</div>}
                            {bookmarkData.length > 0 ? (
                                <div style={{width: '100%', textAlign: 'center'}}><NavLink to="/profile/bookmarks"
                                                                                           style={{color: '#2F80ED'}}>Посмотреть
                                    все</NavLink></div>) : (<></>)}
                        </Grid>
                    }
                />
            </div>
        )
    }
}

BookmarkList.propTypes = {};


export default BookmarkList;
