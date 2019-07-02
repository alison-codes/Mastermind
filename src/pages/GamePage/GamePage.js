import React from 'react';
import { Link } from 'react-router-dom';
import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
import './GamePage.css';

const GamePage = (props) => {
    return (
        <div className="App">
            <div className="flex-h">
                <GameBoard
                    colors={props.colors}
                    guesses={props.guesses}
                    addColor={props.addColor}
                    scoreGuess={props.scoreGuess}
                />
                <div className='GamePage-rightSide'>
                    <ColorPicker
                        colors={props.colors}
                        selColorIdx={props.selColorIdx}
                        handleColorSelection={props.handleColorSelection}
                    />
                    <GameTimer 
                    elapsedTime={props.elapsedTime}
                    handleTimerUpdate={props.handleTimerUpdate}
                    isTiming={props.isTiming}/>
                    <Link className='btn btn-default GamePage-link-margin' to='/settings'>Difficulty</Link>
                    <NewGameButton handleNewGame={props.handleNewGame} />
                </div>
            </div>
            <footer >
                {(props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!')}
            </footer>
        </div>
    );
};

export default GamePage;