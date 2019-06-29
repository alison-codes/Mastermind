import React from 'react';
import styles from './ScoreButton.module.css';

const ScoreButton = (props) => (
  <button disabled={props.code.includes(null)}
      className={`${styles.button} btn btn-default`}
      onClick={props.scoreGuess}>
    ✔
  </button>
);


export default ScoreButton;
