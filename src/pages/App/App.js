import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GamePage from '../../pages/GamePage/GamePage';
import SettingsPage from '../SettingsPage/SettingsPage';


const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      selColorIdx: 0,
      // Update to initial with only one guess object
      guesses: [this.getNewGuess()],
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
    });
    userCode.forEach((guessedPeg, idx) => {
      let foundIdx = masterCodeCopy.indexOf(guessedPeg);
      if (foundIdx > -1) {
        almost++;
        masterCodeCopy[foundIdx] = null;
      }
    });

    let currentState = [...this.state.guesses];
    let currentGuess = { ...currentState[guessNumber] };
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
        <header className='App-header'>React Mastermind </header>
        <Switch>
          <Route exact path='/' render={() =>
            <GamePage
              winTries={winTries}
              colors={colors}
              selColorIdx={this.state.selColorIdx}
              guesses={this.state.guesses}
              handleColorSelection={this.handleColorSelection}
              handleNewGame={this.handleNewGame}
              addColor={this.addColor}
              scoreGuess={this.scoreGuess}
            />
          } />
          <Route exact path='/settings' render={props =>
            <SettingsPage {...props} />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
