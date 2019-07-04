import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllScores } from '../../services/mastermindapi';
import { timeFormat } from '../../services/timeFormat';


import './ScorePage.css';

class ScorePage extends Component {

    async componentDidMount() {
        const scores = await getAllScores();
        this.props.handleUpdateScores(scores);
    }

    render() {
        const scoreRows = this.props.scores.map((score, idx) => (
            <tr key={idx}>
                <td><span className="badge">{idx + 1}</span></td>
                <td>{score.initials}</td>
                <td>{score.numGuesses}</td>
                <td>{timeFormat(score.seconds)}</td>
            </tr>
        ));
        return (
            <div className="HighScores" >
                <header className="footer">High Scores</header>
                {this.props.scores.length ?
                    <table>
                        <thead>
                            <tr>
                                <th width={80}>#</th>
                                <th width={100}>Initials</th>
                                <th width={100}>Guesses</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoreRows}
                        </tbody>
                    </table>
                    :
                    <h4>No High Scores Yet</h4>
                }
                <div>
                    <Link className="cancel " to='/'>Back to Game</Link>
                </div>
            </div>
        );
    }

}

export default ScorePage;