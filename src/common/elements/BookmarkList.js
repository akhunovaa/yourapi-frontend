import React, {Component} from 'react'
import {Grid, Icon, Popup} from 'semantic-ui-react'
import './BookmarkList.css';
import {bookmarkApiListGet} from "../../util/APIUtils";
import {BookmarkLoadingIndicator} from '../../common/LoadingIndicator';
import {NavLink} from "react-router-dom";
import {getLink4Description} from "../../util/ElementsDataUtils";
import LazyBookmarkMiniImage from '../../util/LazyBookmarkMiniImage';

const host = window.location.origin.toString();

class BookmarkList extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bookmarkData: [],
            clicked: false
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

    handleBookmarkClick = () => {
        this.setState((prevState) => ({clicked: !prevState.clicked}));
    };

    componentWillUnmount() {
        this.setState({
            bookmarkData: []
        });
        this._isMounted = false;
    }

    render() {
        const {loading, bookmarkData, clicked} = this.state;

        return (
            <div className='header-right-bookmark blue-hover'>
                <Popup
                    trigger={<Icon link size={'large'} name={clicked ? 'bookmark' : 'bookmark outline'} style={{color: clicked ? '#2F80ED' : ''}} />}
                    header='Избранное'
                    onClose={this.handleBookmarkClick}
                    onOpen={this.handleBookmarkClick}
                    content={loading || bookmarkData === undefined ? <BookmarkLoadingIndicator/>
                        :
                        <Grid textAlign='left' style={{minHeight: 50, minWidth: 250}}>
                            {
                                bookmarkData.length > 0 ? bookmarkData.map(item => (
                                    <Grid.Row key={item.id + item.name} divided>
                                        <Grid.Column width={3} verticalAlign={'middle'} textAlign={'justified'}>
                                            {
                                                item.img ? (
                                                    <NavLink
                                                        to={getLink4Description(item.category) + item.uuid}>
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
                                            <div style={{whiteSpace: 'nowrap', paddingTop: 4}}>
                                                <NavLink to={getLink4Description(item.category) + item.uuid}>
                                                    {item.fullName}
                                                </NavLink>
                                            </div>
                                            <div style={{paddingTop: 4}}>
                                                {item.description}
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                )) : <div style={{paddingTop: 20, color: '#A5A5A5'}}><span>Данные отсутствуют</span></div>}
                        </Grid>
                    }
                    on='focus' position='bottom right' wide size={'small'}
                />
            </div>
        )
    }
}

BookmarkList.propTypes = {};


export default BookmarkList;
