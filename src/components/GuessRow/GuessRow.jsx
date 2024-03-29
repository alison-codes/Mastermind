import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
import ScoreButton from '../ScoreButton/ScoreButton';
import styles from './GuessRow.module.css';


const GuessRow = (props) => (
  //may not need to add GuessRow class to outer div
  <div className={`${styles.GuessRow} flex-h`}>
    <div style={{
      color: props.currentGuess ? 'black' : 'lightgrey'}}>
      {props.rowIdx + 1}
    </div>
    <GuessPegs className={styles.GuessRow}
      colors={props.colors}
      code={props.guess.code}
      currentGuess={props.currentGuess}
      addColor={props.addColor}
    />
    {
      props.currentGuess ?
        <ScoreButton 
        code={props.guess.code} 
        scoreGuess={props.scoreGuess}/> :
        <GuessScore score={props.guess.score} />
    }
  </div>
);

export default GuessRow;
