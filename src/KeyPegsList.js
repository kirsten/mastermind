import React, { Component } from 'react';
import KeyPeg from './KeyPeg';
import './KeyPegs.css';

class KeyPegsList extends Component {
  buildKeyPegsList() {
    const code = this.props.code;
    const guess = this.props.guess;
    let keyPegsList = [];
    if (!code) { return keyPegsList; }

    guess.forEach((color, index) => {
      if (color === code[index]) {
        keyPegsList.push(1);
      } else if (code.includes(color)) {
        keyPegsList.push(0);
      }
    });
    return keyPegsList;
  }

  render() {
    if (!this.props.guess.includes(null)) {
      const keyPegsList = this.buildKeyPegsList();
      const keyPegs = keyPegsList.map((value, index) =>
        <KeyPeg key={index} value={value} />
      );
      return <div className="key-pegs-list">{keyPegs}</div>;
    } else {
      return null;
    }
  }
}

export default KeyPegsList;
