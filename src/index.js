import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react';
import Board from './Board';
import Pick from './Pick';

/*
// class component
class Square extends React.Component {
  render() {
    return (
      <button 
        className="square" 
        onClick={()=> this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
*/

/*
// function component
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}*/

/*
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
*/

/*
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const history = this.state.history;
    //console.log(history);
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className='game-info'>
          <div>{status}</div>
          <ol start='0'>
            <li>
              <button onClick={() => this.jumpTo(this.state.stepNumber - 1)}>
                Last move
              </button>
            </li>
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}
*/

// arrow function component

const Game = () => {
    const [state, setState] = useState({
        history: [
            {
                squares: Array(9)
                    .fill(null)
                    .map(() => new Array(3).fill(null)),
                //Array(9).fill(Array(3).fill(null)),
                xchess: ['X1', 'X1', 'X2', 'X2', 'X3', 'X3'],
                ochess: ['O1', 'O1', 'O2', 'O2', 'O3', 'O3'],
            },
        ],
        stepNumber: 0,
        xIsNext: true,
        showPick: false,
        inMove: false,
        cursor: -1,
        pickingUp: null,
    });

    const [message, setMessage] = useState('');

    const showPick = (i) => {
        const history = state.history;
        const current = history[state.stepNumber];
        const squares = current.squares;
        const last = lastItem(squares[i]);
        // if game is over
        if (calculateWinner(squares)) {
            setMessage('The game has been end man.');
            return;
        }
        // if existing chess is largest and not yours
        if (last) {
            if (
                (state.xIsNext ? 'O' : 'X' === last.charAt(0)) &&
                last.charAt(1) === '3'
            ) {
                return;
            }
        }
        //moving
        if (state.pickingUp && state.cursor !== i) {
            putChess(state.pickingUp, i);
            return;
        }

        var showPick, cursor, inMove;
        var pickingUp = null;
        // Moving cursor
        if (state.cursor !== i) {
            showPick = true;
            cursor = i;
            inMove = false;
            // Same cursor
        } else {
            // if inMove
            if (state.inMove) {
                showPick = false;
            } else {
                showPick = !state.showPick;
            }
            // if showPick
            if (
                state.showPick &&
                last &&
                (state.xIsNext ? 'X' : 'O') === last.charAt(0)
            ) {
                cursor = i;
                inMove = true;
                pickingUp = last;
            } else {
                cursor = -1;
                inMove = false;
            }
        }
        setState({
            ...state,
            showPick: showPick,
            cursor: cursor,
            inMove: inMove,
            pickingUp: pickingUp,
        });

        ////TODO:
        // last have changed from null to ''
        // handling pickingUp when jumpTo
        //Last move button to the end = crash

        // setState({
        //   ...state,
        //   showPick:
        //     state.cursor === i ? (state.inMove ? false : !state.showPick) : true,
        //   cursor:
        //     state.cursor === i && !(state.showPick && lastItem(squares[i]))
        //       ? -1
        //       : i,
        //   inMove:
        //     state.cursor === i && state.showPick && lastItem(squares[i])
        //       ? true
        //       : false,
        // });
        setMessage('');
    };

    const putChess = (chess, pos) => {
        //console.log(state);
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice().map((i) => i.slice());
        const ochess = current.ochess.slice();
        const xchess = current.xchess.slice();
        const targetSquare = pos === -1 ? squares[state.cursor] : squares[pos];
        // if game is over
        if (calculateWinner(squares)) {
            setMessage('The game has been end man.');
            return;
        }
        // if the chess is less then existing
        if (lastItem(targetSquare)) {
            if (lastItem(targetSquare).charAt(1) >= chess.charAt(1)) {
                setMessage('You must put a larger piece.');
                return;
            }
        }

        if (pos === -1) {
            // remove chess from pickList
            const oIndex = current.ochess.indexOf(chess);
            if (oIndex > -1) {
                ochess.splice(oIndex, 1);
            }

            const xIndex = current.xchess.indexOf(chess);
            if (xIndex > -1) {
                xchess.splice(xIndex, 1);
            }
        } else {
            // remove chess from last position
            /*maybe can write it better:*/
            squares[state.cursor][
                squares[state.cursor].indexOf(lastItem(squares[state.cursor]))
            ] = null;
        }

        targetSquare[targetSquare.indexOf(null)] = chess;
        setState({
            ...state,
            history: history.concat([
                {
                    squares: squares,
                    ochess: ochess,
                    xchess: xchess,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !state.xIsNext,
            showPick: false,
            cursor: -1,
            pickingUp: null,
        });
        setMessage('');
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                lastItem(squares[a]) === null ||
                lastItem(squares[b]) === null ||
                lastItem(squares[c]) === null
            ) {
                continue;
            }

            if (
                lastItem(squares[a]).charAt(0) ===
                    lastItem(squares[b]).charAt(0) &&
                lastItem(squares[a]).charAt(0) ===
                    lastItem(squares[c]).charAt(0)
            ) {
                return lastItem(squares[a]).charAt(0);
            }
        }
        return null;
    };

    const lastItem = (arr) => {
        const last = arr.filter((x) => x != null).slice(-1)[0];
        return last === undefined ? '' : last;
    };

    const jumpTo = (step) => {
        setState({
            ...state,
            stepNumber: step,
            xIsNext: step % 2 === 0,
            cursor: -1,
            showPick: false,
            inMove: false,
        });
    };

    const history = state.history;
    const current = history[state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner ' + winner;
    } else {
        status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    squares={current.squares}
                    onClick={(i) => showPick(i)}
                    getLast={(arr) => lastItem(arr)}
                    cursor={state.cursor}
                    inMove={state.inMove}
                />
                {state.showPick && (
                    <Pick
                        chesses={
                            state.xIsNext ? current.xchess : current.ochess
                        }
                        onClick={putChess}
                    />
                )}
                <div>{message}</div>
            </div>

            <div className='game-info'>
                <div>{status}</div>
                <ol start='0'>
                    <li>
                        <button onClick={() => jumpTo(state.stepNumber - 1)}>
                            Last move
                        </button>
                    </li>
                    {moves}
                </ol>
            </div>
        </div>
    );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
