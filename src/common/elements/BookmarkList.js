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
            bookmarkData: []
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

    render() {
        const {loading, bookmarkData} = this.state;

        return (
            <div className='header-right-bookmark blue-hover'>
                <Popup
                    trigger={<Icon link size={'large'} name='bookmark outline'/>}
                    header='Избранное'
                    content={loading || bookmarkData === undefined ? <BookmarkLoadingIndicator/>
                        :
                        <Grid textAlign='left'>
                            {
                                bookmarkData.map(item => (
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
                                ))}
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
