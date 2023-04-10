import React, { Component } from 'react';
class VerticalSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        const { tabs } = this.props;

        return (
            <div className="field-row">
                <label htmlFor="card-slider">Cowbell</label>
                <div className="is-vertical">
                    <input id="card-slider" 
                    className="has-box-indicator" 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="1" 
                    value={this.state.value}
                    onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export default VerticalSlider;