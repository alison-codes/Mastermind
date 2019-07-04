import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getAllScores, createscore } from '../../services/mastermindapi';

import './App.css';
import GamePage from '../../pages/GamePage/GamePage';
import SettingsPage from '../SettingsPage/SettingsPage';
import ScorePage from '../ScorePage/ScorePage';


const colors = {
  Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
  Moderate: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#A9d256'],
  Difficult: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#A9d256', '#D27d56'],
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      selColorIdx: 0,
      // Update to initial with only one guess object
      guesses: [this.getNewGuess()],
      code: this.genCode(),
      difficulty: "Easy",
      elapsedTime: 0,
      isTiming: true,
      scores: []
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
  async componentDidMount() {
    let scores = await getAllScores();
    this.setState({
      scores
    })
  }
  handleUpdateScores = (scores) => {
    this.setState({ scores });
  }
  returnBlankState() {
    return {
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code: this.genCode(),
      difficulty: this.state.difficulty,
      elapsedTime: 0,
      isTiming: true
    };
  }
  // generate the color combination the player is trying to find
  genCode() {
    let numColors = this.state && colors[this.state.difficulty].length;
    numColors = numColors || 4;
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * numColors));
  }
  //event handlers
  handleColorSelection = (colorIdx) => {
    // debugger
    this.setState({ selColorIdx: colorIdx });
  };
  handleDifficultyChange = (level) => {
    this.setState({ difficulty: level });
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
    if (perfect !== 4) {
      currentState.push(this.getNewGuess());
      this.setState({
        guesses: currentState,
        isTiming: perfect !== 4
      });
    }
    else {
      this.setState(state => ({ isTiming: false, guesses: currentState }), async function () {
        // Do high-score logic in this callback
        if (this.state.scores.length < 20) {
          let initials = prompt('Congrats you have a top-20 score! Enter your initials: ').substr(0, 3);
          await createscore({ initials: initials, numGuesses: currentState.length, seconds: this.state.elapsedTime });
        }
      });
    };

    // this.setState({
    //   guesses: currentState,
    //   isTiming: perfect !== 4
    // });
  }
  isHighScore = (guessesCopy) => {
    let lastScore = this.state.scores[this.state.scores.length - 1];
    return (guessesCopy.length < lastScore.numGuesses || (
      guessesCopy.length === lastScore.numGuesses &&
      this.state.elapsedTime < lastScore.seconds
    ));
  }

  handleTimerUpdate = () => {
    // enable timer to start when user has chosen the first four colors
    if (this.state.guesses[0].code.includes(null)) return;
    this.setState((state) => ({ elapsedTime: ++state.elapsedTime }));
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
              colors={colors[this.state.difficulty]}
              selColorIdx={this.state.selColorIdx}
              guesses={this.state.guesses}
              handleColorSelection={this.handleColorSelection}
              handleNewGame={this.handleNewGame}
              addColor={this.addColor}
              scoreGuess={this.scoreGuess}
              difficulty={this.state.difficulty}
              elapsedTime={this.state.elapsedTime}
              handleTimerUpdate={this.handleTimerUpdate}
              isTiming={this.state.isTiming}
            />
          } />
          <Route exact path='/settings' render={props =>
            <SettingsPage
              {...props}
              colorsLookup={colors}
              handleDifficultyChange={this.handleDifficultyChange}
              difficulty={this.state.difficulty} />
          } />
          <Route exact path='/high-scores' render={() => (
            <ScorePage
              scores={this.state.scores}
              handleUpdateScores={this.handleUpdateScores}
            />
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;


require('config')