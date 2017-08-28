import React, { Component } from 'react';

class KeyPeg extends Component {
  pegColor() {
    if (this.props.value === 1) {
      return "black";
    } else if (this.props.value === 0) {
      return "white";
    }
  }

  render() {
    return (
      <div className="key-peg" style={{backgroundColor: this.pegColor()}}></div>
    );
  }
}

export default KeyPeg;
