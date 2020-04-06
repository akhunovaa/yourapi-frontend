import React, {Component} from "react";
import "./Progress.css";
import * as PropTypes from "prop-types";

class Progress extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {progress} = this.props;
        const style = {
            progress: {
                width: progress + "%"
            }
        };
        return (
            <div className="ProgressBar">
                <div className="Progress" style={style.progress}/>
            </div>
        );
    }
}

Progress.propTypes = {
    progress: PropTypes.any.isRequired
};

export default Progress;