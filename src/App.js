import React, { Component } from 'react';
import './App.css';

class CodePeg extends Component {
  render() {
    return (
      <div
        className={`code-peg ${this.props.active ? 'active' : ''}`}
        style={{backgroundColor: this.props.color}}
        onClick={() => this.props.onClick()}
      ></div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      codePegChoices: ["fuchsia", "red", "orange", "yellow", "lime", "aqua"],
      guess: Array(4).fill(null),
      activeCodePeg: null
    };
  }

  renderCodePegChoices() {
    let pegs = []
    for(let i = 0; i < this.state.codePegChoices.length; i++) {
      let color = this.state.codePegChoices[i];
      let peg = (
        <CodePeg
          key={i}
          color={color}
          onClick={() => this.handleCodePegSelection(i)}
        />
      );
      pegs.push(peg)
    }
    return pegs;
  }

  renderCodePegHoles() {
    let holes = []
    for(let i = 0; i < this.state.guess.length; i++) {
      let hole = (
        <CodePeg
          key={i}
          active={this.state.activeCodePeg === i}
          color={this.state.guess[i]}
          onClick={() => this.toggleActiveCodePeg(i)}
        />
      );
      holes.push(hole)
    }
    return holes;
  }

  toggleActiveCodePeg(i) {
    if (this.state.activeCodePeg === i) {
      this.setState({activeCodePeg: null})
    } else {
      this.setState({activeCodePeg: i})
    }
  }

  handleCodePegSelection(colorIndex) {
    let color = this.state.codePegChoices[colorIndex];
    if (this.state.activeCodePeg === null) {
      return;
    } else {
      let guess = this.state.guess;
      guess.splice(this.state.activeCodePeg, 1, color);
      let pegChoices = this.state.codePegChoices;
      pegChoices.splice(colorIndex, 1);
      this.setState({guess: guess});
      this.setState({activeCodePeg: null});
    }
  }

  renderRows() {
    let rows = []
    for(let i = 0; i < 1; i++) {
      let row = <div key={i} className="board-row">{this.renderCodePegHoles()}</div>
      rows.push(row)
    }
    return rows;
  }

  render() {
    return (
      <div className="game">
        <header>
          <h1>Mastermind</h1>
        </header>
        <div className="decoding-board">{this.renderRows()}</div>
        <div className="code-peg-selection">{this.renderCodePegChoices()}</div>
      </div>
    );
  }
}

export default App;
