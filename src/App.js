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
      guesses: Array(8).fill(Array(4).fill(null)),
      guessNumber: 0,
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

  toggleActiveCodePeg(i, rowIndex) {
    if (rowIndex !== this.state.guessNumber) { return; }

    if (this.state.activeCodePeg === i) {
      this.setState({activeCodePeg: null})
    } else {
      this.setState({activeCodePeg: i})
    }
  }

  handleCodePegSelection(color) {
    if (this.state.activeCodePeg === null) {
      return;
    } else {
      let guess = _.clone(this.state.guesses[this.state.guessNumber]);
      guess.splice(this.state.activeCodePeg, 1, color);
      let guesses = _.clone(this.state.guesses);
      guesses[this.state.guessNumber] = guess;
      this.setState({
        guesses: guesses,
        activeCodePeg: null
      }, this.updateAvailableCodePegs);

      if (!guess.includes(null)) {
        this.setState({
          guessNumber: this.state.guessNumber + 1,
          availablePegs: this.state.codePegs
        });
      }
    }
  }

  updateAvailableCodePegs() {
    let currentGuess = this.state.guesses[this.state.guessNumber];
    let availablePegs = _.difference(this.state.codePegs, currentGuess);
    this.setState({availablePegs: availablePegs});
  }

  renderGuessPegs(rowIndex) {
    let pegs = []
    let guess = this.state.guesses[rowIndex];
    for(let i = 0; i < guess.length; i++) {
      let peg = (
        <CodePeg
          key={i}
          active={(this.state.activeCodePeg === i) && (this.state.guessNumber === rowIndex)}
          color={guess[i]}
          onClick={() => this.toggleActiveCodePeg(i, rowIndex)}
        />
      );
      pegs.push(peg)
    }
    return pegs;
  }

  renderGuesses() {
    let guesses = []
    for(let i = 0; i < this.state.guesses.length; i++) {
      let guess = (
        <div key={i} className="board-row">
          {this.renderGuessPegs(i)}
          <KeyPegsList code={this.state.code} guess={this.state.guesses[i]} />
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
          onClick={() => this.handleCodePegSelection(color)}
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
