import React, {Component} from 'react';
import './CommandsTreeSet.css';
import {Icon, List} from "semantic-ui-react";
import {NavLink} from 'react-router-dom';

class CommandsTreeSet extends Component {

    constructor(props){
        super(props);
        this.state = {
            hidden: false,
            hidden2: true,
            arrow: 'chevron up',
            arrow2: 'chevron down'

        };
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
    }

    toggle(){
        const open = this.state.hidden;
        this.setState({hidden: !open, arrow: open ? 'chevron up' : 'chevron down'})
    }

    toggle2(){
        const open = this.state.hidden2;
        this.setState({hidden2: !open, arrow2: open ? 'chevron up' : 'chevron down'})
    }

    render(){
        return (
            <div className='command-toggle'>
                <List verticalAlign='middle'>

                        <List.Item>
                            <List.Content floated='right'>
                                <Icon link name={this.state.arrow} onClick={this.toggle}/>
                            </List.Content>
                            <Icon name='users'/>
                            <List.Content><span className="command-operation-text command-bold-font-weight">Волга</span></List.Content>
                            <List.List hidden={this.state.hidden} className='sub-menu-list'>
                                <List.Content className='sub-command'>
                                    <NavLink to="#"><span className="command-operation-text command-link-color">О Команде</span></NavLink>
                                </List.Content>
                                <List.Content className='sub-command'>
                                    <NavLink to="#"><span className="command-operation-text">Участники</span></NavLink>
                                </List.Content>
                            </List.List>
                        </List.Item>

                        <List.Item style={{paddingTop: 32}}>
                            <List.Content floated='right'>
                                <Icon link name={this.state.arrow2} onClick={this.toggle2} className='command-disabled-color'/>
                            </List.Content>
                            <Icon name='users' className='command-disabled-color'/>
                            <List.Content><span className="command-operation-text command-disabled-color command-bold-font-weight">Урал</span></List.Content>
                            <List.List hidden={this.state.hidden2}>
                                <List.Content className='sub-command'>
                                    <NavLink to="#"><span className="command-operation-text command-disabled-color">О Команде</span></NavLink>
                                </List.Content>
                                <List.Content className='sub-command'>
                                    <NavLink to="#"><span className="command-operation-text command-disabled-color">Участники</span></NavLink>
                                </List.Content>
                            </List.List>
                        </List.Item>
                </List>
            </div>
        );
    }
}

export default CommandsTreeSet;
