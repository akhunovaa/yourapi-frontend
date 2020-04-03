import _ from 'lodash'
import React, {Component} from 'react'
import {Grid, Search} from 'semantic-ui-react'
import './SearchBox.css';
import {apiFullListGet} from "../util/APIUtils";
import Alert from "react-s-alert";
import LazySearchMiniImage from "../util/LazySearchMiniImage";

const initialState = {isLoading: false, results: [], value: ''};
const host = window.location.origin.toString();
const apiData = [];

class SearchBox extends Component {

    state = initialState;
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
            apiFullListGet()
                .then(response => {
                    response.response.map((category) =>{
                        category.list.map((api) =>{
                            const data = {
                                id: api.id,
                                title: api.fullName,
                                description: api.description,
                                category: api.category,
                                image: api.image ? host + "/api-data/image/" + api.image + "/73/73" : null
                            };
                            apiData.push(data);
                        });
                    });
                    this.setState({
                        loading: false
                    });
                }).catch(error => {
                Alert.error('Ошибка запросе на получение проекта' || (error && error.message));
                this.setState({loading: false})
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleResultSelect = (e, {result}) => {
        this.setState({value: result.title});
    };

    handleSearchResultRenderer = ({image, title, category, description })=> {
        return ([
            image && (
                <div key='image' className='result-image'>
                    <LazySearchMiniImage src={image}/>
                </div>
            ),
            <div key={'content' + description } className='result-content'>
                {title && <div className='title'>{title}</div>}
                {description && <div className='description'>{description}</div>}
            </div>,
        ])
    };


    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});


        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState);
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = (result) => re.test(result.title);
            console.log(_.filter(apiData, isMatch))
            this.setState({
                isLoading: false,
                results: _.filter(apiData, isMatch),
                loading: true
            })
        }, 300)
    };


    render() {
        const {isLoading, value, results} = this.state;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <Search className='header-center-search-box'
                            noResultsMessage={'Ничего не найдено...'}
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                leading: true,
                            })}
                            results={results}
                            value={value}
                            placeholder='Поиск...'
                            resultRenderer={this.handleSearchResultRenderer}
                            {...this.props}
                            id="searchInput" name="searchInput"/>
                </Grid.Column>
            </Grid>
        )
    }
}

SearchBox.propTypes = {};


export default SearchBox;