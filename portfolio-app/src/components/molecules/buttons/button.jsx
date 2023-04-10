import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  render() {
    const { text } = this.props;
    const { isHovered } = this.state;

    return (
      <button
        aria-label={text}
        className={`button ${isHovered ? 'button-hover' : ''}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {text}
      </button>
    );
  }
}

export default Button;
