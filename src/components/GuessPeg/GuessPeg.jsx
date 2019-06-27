import React from 'react';
import styles from './GuessPeg.module.css';


const GuessPeg = (props) => (
  <button className={styles.GuessPeg} style={{
          backgroundColor: props.color,
          borderColor: props.colors
        }}>
    
  </button>
);

export default GuessPeg;
