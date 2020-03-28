import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Icon, List} from "semantic-ui-react";

class ApiDetailVersionBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            hidden: {
                p1: false,
                p2: true,
                p3: true,
                p4: true,
                p5: true,
                p6: true,
                p7: true,
                p8: true,
                p9: true
            },
            arrow: {
                p1: 'chevron up',
                p2: 'chevron down',
                p3: 'chevron down',
                p4: 'chevron down',
                p5: 'chevron down',
                p6: 'chevron down',
                p7: 'chevron down',
                p8: 'chevron down',
                p9: 'chevron down'
            }
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.toggle = this.toggle.bind(this);
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

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };

    toggle(event) {
        const target = event.target;
        const inputName = target.id;
        let hidden = this.state.hidden;
        let arrows = this.state.arrow;
        const open = hidden[inputName];
        hidden[inputName] = !open;
        arrows[inputName] = open ? 'chevron up' : 'chevron down';
        this.setState({
            hidden: hidden,
            arrow: arrows
        });
    }


    render() {
        return (
            <div>
                <div className='detail-version-body'>
                    <List verticalAlign='middle'>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p1' name={this.state.arrow.p1} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p1}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p2' name={this.state.arrow.p2} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p2}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p3' name={this.state.arrow.p3} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p3}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p4' name={this.state.arrow.p4} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p4}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p5' name={this.state.arrow.p5} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p5}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p6' name={this.state.arrow.p6} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p6}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p7' name={this.state.arrow.p7} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p7}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p8' name={this.state.arrow.p8} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p8}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='detail-version-element'>
                                <List.Content floated='right'>
                                    <div className='detail-version-element-header'>
                                        <Icon link id='p9' name={this.state.arrow.p9} onClick={this.toggle}/>
                                    </div>
                                </List.Content>
                                <List.Content>
                                    <div className='detail-version-element-header'>
                                        <span className='detail-version-element-header-text'>16.1</span>
                                        <span className='detail-version-element-header-date'>от 19.10.2019</span>
                                    </div>
                                </List.Content>
                                <List.List className='detail-version-element-body-content' hidden={this.state.hidden.p9}>
                                    <List.Content className='detail-version-element-body'>
                                        <span>Перечень нововведений:</span>
                                        <span>- Фича 1</span>
                                        <span>- Фича 2</span>
                                        <span>- Фича 3</span>
                                        <span>- Фича 4</span>
                                        <span>- Фича 5</span>
                                    </List.Content>
                                </List.List>
                            </div>
                        </List.Item>
                    </List>
                </div>
            </div>

        )
    }
}

export default ApiDetailVersionBody;
