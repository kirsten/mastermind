import _ from 'lodash';
import React, { Component } from 'react';
import CodePeg from './CodePeg';
import KeyPegsList from './KeyPegsList';
import './App.css';

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

  renderGuessPegs() {
    let pegs = []
    for(let i = 0; i < this.state.guess.length; i++) {
      let peg = (
        <CodePeg
          key={i}
          active={this.state.activeCodePeg === i}
          color={this.state.guess[i]}
          onClick={() => this.toggleActiveCodePeg(i)}
        />
      );
      pegs.push(peg)
    }
    return pegs;
  }

  renderGuesses() {
    let guesses = []
    for(let i = 0; i < 1; i++) {
      let guess = (
        <div key={i} className="board-row">
          {this.renderGuessPegs()}
          <KeyPegsList code={this.state.code} guess={this.state.guess} />
        </div>
      );
      guesses.push(guess)
    }
    return guesses;
  }

  renderAvailablePegs() {
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

  render() {
    return (
      <div className="game">
        <header>
          <h1>Mastermind</h1>
        </header>
        <div className="decoding-board">{this.renderGuesses()}</div>
        <div className="code-peg-selection">{this.renderAvailablePegs()}</div>
      </div>
    );
  }
}

export default App;
