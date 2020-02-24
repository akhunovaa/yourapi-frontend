import React, {Component} from 'react';
import './Integrators.css';
import {NavLink} from 'react-router-dom';
import {Dropdown, Icon, Input, Table} from "semantic-ui-react";
import {loadUser} from "../util/APIUtils";

class IntegratorsProfileTable extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            profile: "Выберите профиль"
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        //this.setState({user: this.props.currentUser})
        // this.loadUser(handle);
    }


    loadUser(handle) {
        this.setState({
            loading: true
        });
        let data = {
            "id": handle
        };
        loadUser(data)
            .then(response => {
                this.setState({
                    user: response.response,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
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

    render() {

        const profileOptions = [
            {
                profile: 'Выберите профиль',
                text: 'Выберите профиль',
                value: 'Выберите профиль'
            }
        ];
        return (
            <div className="integrators-table-main">
                <div className='header-inputs'>
                    <div className='header-search-input'>
                        <Input size={'small'} icon={{name: 'search', link: true}} placeholder='Поиск...' id="search"
                               name="search"/>
                    </div>
                    <div className="header-profile-input">
                        <label style={{paddingBottom: '6px'}}>Профиль</label>
                        <Dropdown onChange={this.handleDropdownChange} placeholder='Выберите профиль'
                                  selection id="profile" name="profile" noResultsMessage="Москва - лучший город"
                                  className="form-input" options={profileOptions}
                                  defaultValue={this.state.profile}/>
                    </div>
                </div>
                <div className='element-input'>
                    <NavLink to='/integrator/profile/1'>
                        <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table> </NavLink>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='element-input'>
                    <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                        <Table.Body>
                            <Table.Row textAlign={'left'}>
                                <Table.Cell>
                                    <div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-member-user-text'>Ольга Орлова</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>РусВолга</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-company-user-text'>Профиль</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='integrator-star-icon'>
                                        <Icon fitted link name='star'/>
                                        <span className='integrator-star-icon-label'>4,9</span>
                                        <Icon className='integrator-bookmark' fitted link name='bookmark outline'/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='footer-paging'>

                        <Icon className='footer-left-icon' fitted link name='arrow left'/>
                        <span className='footer-paging-label'>1-14 из 55</span>
                        <Icon className='footer-right-icon' fitted link name='arrow right'/>

                </div>

            </div>
        )
    }
}

export default IntegratorsProfileTable;