import React, {Component} from 'react';
import './SliderArrows.css';

class PlanPrevArrow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { className, style, onClick } = this.props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", color: '#4F4F4F' }}
                onClick={onClick}
            />
        )
    }
}

export default PlanPrevArrow;
