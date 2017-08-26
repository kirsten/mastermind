import _ from 'lodash';
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
    const pegColors = ["fuchsia", "red", "orange", "yellow", "lime", "aqua"];
    this.state = {
      codePegs: pegColors,
      availablePegs: pegColors,
      guess: Array(4).fill(null),
      activeCodePeg: null
    };
  }

  componentDidMount() {
    this.generateCode();
  }

  generateCode() {
    let code = _.sampleSize(this.state.codePegs, 4);
    this.setState({ code: code });
  }

  renderCodePegChoices() {
    let pegs = []
    for(let i = 0; i < this.state.availablePegs.length; i++) {
      let color = this.state.availablePegs[i];
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
    let color = this.state.availablePegs[colorIndex];
    if (this.state.activeCodePeg === null) {
      return;
    } else {
      let guess = _.clone(this.state.guess);
      guess.splice(this.state.activeCodePeg, 1, color);
      this.setState({guess: guess}, this.updateAvailableCodePegs);
      this.setState({activeCodePeg: null});
    }
  }

  updateAvailableCodePegs() {
    let availablePegs = _.difference(this.state.codePegs, this.state.guess);
    this.setState({availablePegs: availablePegs});
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
