import React, {Component} from 'react';
import './Administration.css';
import {Breadcrumb, Icon, Image} from "semantic-ui-react";
import {NavLink, withRouter} from "react-router-dom";
import queryString from 'query-string';
import volgaImage from '../../img/volga.png';

class AdministrationBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            command: {
                imageUrl: volgaImage,
                name: 'Волга'
            },
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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


    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        let params = queryString.parse(this.props.location.search);
        let page = params.page ? params.page : 'Волга';
        let linkToPage = '/profile/administration?page=' + page;
        return (
              <div className='administration-body-main'>
                  <div className="command-avatar-container">
                      <div className="command-avatar">
                          {
                              this.state.command.imageUrl ? (
                                  <Image src={this.state.command.imageUrl} size='medium' circular verticalAlign='middle' className='command-avatar-center'
                                         alt={this.state.command.name}/>
                              ) : (
                                  <div className="text-avatar">
                                      <span>{this.state.command.name && this.state.command.name[0]}</span>
                                  </div>
                              )
                          }
                          <div className="command-avatar-footer">
                              <Icon link name='photo' size={'large'} color={'grey'}/>
                          </div>
                      </div>
                      <div className="command-name-container">
                          <span style={{paddingRight: '8px', height: 28}}>{this.state.command.name}</span>
                          <span className='command-label'>Команда</span>
                      </div>
                      <div className="command-custom-icon-container">
                          <Icon link name='cog' size={'large'} color={'grey'}/>
                      </div>
                  </div>
              </div>

        )
    }
}
export default withRouter(AdministrationBody);