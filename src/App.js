import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import GameTimer from './components/GameTimer/GameTimer';
import NewGameButton from './components/NewGameButton/NewGameButton';

const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      selColorIdx: 0,
      // Update to initial with only one guess object
      guesses: [this.getNewGuess(), this.getNewGuess()],
      code: this.genCode()
    };
  }
  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }
  handleNewGame = () => {
    this.setState(this.returnBlankState());
  }
  returnBlankState() {
    return {
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code: this.genCode()
    };
  }
  genCode() {
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * 4));
  }
  //event handlers
  handleColorSelection = (colorIdx) => {
    // debugger
    this.setState({ selColorIdx: colorIdx });
  };
  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }
  addColor = (idx) => {
    let guesses = [...this.state.guesses];
    guesses[guesses.length - 1].code[idx] =
      this.state.selColorIdx;
    this.setState({
      guesses: guesses
    })
  };
  scoreGuess = () => {
    let perfect = 0;
    let almost = 0;
    let masterCode = [this.state.code][0];
    let masterCodeCopy = [...masterCode];
    let userCodebackup = [...this.state.guesses]
    let guessNumber = this.state.guesses.length - 1;
    let userCode = userCodebackup[guessNumber].code;
    console.log('mastercode:', masterCode);
    console.log('usercode:', userCode);
    userCode.forEach((guessedPeg, idx) => {
      if (masterCodeCopy[idx] === guessedPeg) {
        perfect++;
        masterCodeCopy[idx] = null;
      }
      else if (masterCodeCopy.includes(guessedPeg)) {
        almost++;
        masterCodeCopy[idx] = null;
      }
      return;
    });

    let currentState = [...this.state.guesses];
    let currentGuess = {...currentState[guessNumber]};
    currentGuess.score = {
      perfect: perfect,
      almost: almost
    };
    currentState[guessNumber] = currentGuess;
    if (perfect !== 4) currentState.push(this.getNewGuess());
    this.setState({
      guesses: currentState
    });
  }

  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header className="App-header">React Mastermind</header>
        <div className="flex-h">
          <GameBoard
            colors={colors}
            guesses={this.state.guesses}
            addColor={this.addColor}
            scoreGuess={this.scoreGuess}
          />
          <div className="App-RightSide">
            <ColorPicker
              colors={colors}
              selColorIdx={this.state.selColorIdx}
              handleColorSelection={this.handleColorSelection}
            />
            <GameTimer />
            <NewGameButton
              handleNewGame={this.handleNewGame}
            />
          </div>
        </div>
        <footer>{(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}</footer>
      </div>
    );
  }
}

export default App;
