import React, { Component } from 'react';

class KonamiCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      konamiCodeEntered: false
    };
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.currentPosition = 0;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (event.key === this.konamiCode[this.currentPosition]) {
      this.currentPosition++;

      if (this.currentPosition === this.konamiCode.length) {
        this.setState({ konamiCodeEntered: true });
        this.currentPosition = 0; // Reset the position
      }
    } else {
      this.currentPosition = 0; // Reset if the sequence is broken
    }
  };

  render() {
    if (this.state.konamiCodeEntered) {
      return (
        <div>
      
          <h1>Konami Code Activated!</h1>
        </div>
      );
    }

    return (
      <div>delete</div>
    );
  }
}

export default KonamiCodeComponent;
