import React, {Component} from 'react'
import {Grid, Icon, Popup} from 'semantic-ui-react'
import './BookmarkList.css';
import {bookmarkApiListGet, bookmarkRemove} from "../../util/APIUtils";
import {BookmarkLoadingIndicator} from '../../common/LoadingIndicator';
import {NavLink} from "react-router-dom";
import {getLink4Description} from "../../util/ElementsDataUtils";
import LazyBookmarkMiniImage from '../../util/LazyBookmarkMiniImage';
import Alert from "react-s-alert";

const host = window.location.origin.toString();

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
            this.requestBookmarkList();
        }
    }

    requestBookmarkList = () => {
        this.setState({loading: true});
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
    };

    componentWillUnmount() {
        this.setState({
            bookmarkData: []
        });
        this._isMounted = false;
    }

    handleOpen = () => {
        this.requestBookmarkList();
        this.setState((prevState) => ({clicked: !prevState.clicked, isOpen: true}));
    };

    handleClose = () => {
        this.setState((prevState) => ({clicked: !prevState.clicked, isOpen: false}));
    };

    bookmarkPurge = (e, {id}) => {

        bookmarkRemove(id)
            .then(response => {
                this.requestBookmarkList();
            }).catch(error => {
            Alert.error('Ошибка при удалении для Bookmark' || (error && error.message));
        });

    };

    render() {
        const {loading, bookmarkData, clicked, isOpen} = this.state;
        const {colored} = this.props;

        return (
            <div className='header-right-bookmark blue-hover'>
                <Popup
                    trigger={clicked ?
                        <Icon link name='bookmark' size={'large'} onClick={this.handleClose}
                              style={{color: clicked ? '' : '#2F80ED'}} className={colored}/> :
                        <Icon link size={'large'} name={clicked ? 'bookmark' : 'bookmark outline'}
                              style={{color: clicked ? '#2F80ED' : ''}} className={colored}/>}
                    header='Избранное'
                    open={isOpen}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    on='focus' position='bottom right' wide size={'small'}
                    className='header-right-bookmark-container'
                    content={loading || bookmarkData === undefined ? <BookmarkLoadingIndicator/>
                        :
                        <Grid textAlign='left' style={{minHeight: 50, minWidth: 406}}>
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
                                        <Grid.Column width={11}>
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

                                        <Grid.Column width={1} textAlign={'left'} verticalAlign={'middle'}
                                                     divided={'false'} className='bookmark-delete-button'>
                                            <Icon style={{
                                                color: item.bookmarked ? this.state[item.uuid] !== 'close' ? '#2F80ED' : '' : this.state[item.uuid] === 'close' ? '#2F80ED' : ''
                                            }} link onClick={this.bookmarkPurge} id={item.uuid}
                                                  className='grid-labels-icon'
                                                  name={item.bookmarked ? this.state[item.uuid] !== 'bookmark outline' ? 'close' : 'close' : this.state[item.uuid] === 'close' ? 'close' : 'close'}/>
                                        </Grid.Column>

                                    </Grid.Row>
                                )) : <div style={{color: '#A5A5A5', minWidth: 337, height: 47.6, display: 'table'}}><span style={{verticalAlign: 'middle', display: 'table-cell'}}>Данные отсутствуют</span></div>}
                            {bookmarkData.length > 2 ? (
                                <div style={{width: '100%', textAlign: 'center', paddingBottom: 14}}>
                                    <NavLink to="/shop/bookmarks" style={{color: '#2F80ED'}}>Посмотреть все</NavLink>
                                </div>) : (<></>)}
                        </Grid>
                    }
                />
            </div>
        )
    }
}

BookmarkList.propTypes = {};


export default BookmarkList;
