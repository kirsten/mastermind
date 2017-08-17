import React, { Component } from 'react';
import './App.css';

class CodePeg extends Component {
  render() {
    return (
      <div className="code-peg"></div>
    );
  }
}

class DecodingBoard extends Component {
  renderCodePegs() {
    let pegs = []
    for(let i = 0; i < 4; i++) {
      let peg = <CodePeg key={i} />
      pegs.push(peg)
    }
    return pegs;
  }

  renderRows() {
    let rows = []
    for(let i = 0; i < 10; i++) {
      let row = <div key={i} className="board-row">{this.renderCodePegs()}</div>
      rows.push(row)
    }
    return rows;
  }

  render() {
    return (
      <div className="decoding-board">{this.renderRows()}</div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="game">
        <header>
          <h1>Mastermind</h1>
        </header>
        <DecodingBoard/>
      </div>
    );
  }
}

export default App;
