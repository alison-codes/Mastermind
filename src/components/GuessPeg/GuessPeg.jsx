import React from 'react';
import styles from './GuessPeg.module.css';


const GuessPeg = (props) => (
  <button className={styles.GuessPeg} 
    style={{
        backgroundColor: props.color,
        border: props.color ? `1px solid ${props.color}`: '1px dashed grey',
        cursor: props.currentGuess && 'pointer'
      }}>
    
  </button>
);

export default GuessPeg;
