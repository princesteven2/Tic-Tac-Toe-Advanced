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
    cursor: -1,
  });

  const showPick = (i) => {
    const history = state.history;
    const current = history[state.stepNumber];
    const squares = current.squares;
    // if game is over
    if (calculateWinner(squares)) {
      return;
    }
    // if existing chess is largest and not yours
    if (lastItem(squares[i]) !== null) {
      if (
        (state.xIsNext ? 'O' : 'X' === lastItem(squares[i]).charAt(0)) &&
        lastItem(squares[i]).charAt(1) === '3'
      ) {
        return;
      }
    }

    setState({
      ...state,
      showPick: !state.showPick,
      cursor: i,
    });
  };

  const putChess = (chess) => {
    console.log(state);
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice().map((i) => i.slice());
    const ochess = current.ochess.slice();
    const xchess = current.xchess.slice();
    const targetSquare = squares[state.cursor];

    const oIndex = current.ochess.indexOf(chess);
    if (oIndex > -1) {
      ochess.splice(oIndex, 1);
    }

    const xIndex = current.xchess.indexOf(chess);
    if (xIndex > -1) {
      xchess.splice(xIndex, 1);
    }
    // if game is over
    if (calculateWinner(squares)) {
      return;
    }
    // if the chess is less then existing
    if (lastItem(targetSquare) !== null) {
      if (lastItem(targetSquare).charAt(1) >= chess.charAt(1)) {
        return;
      }
    }
    //targetSquare = state.xIsNext ? 'X' : 'O';
    //targetSquare = chess;
    targetSquare[targetSquare.indexOf(null)] = chess;
    //console.log(state);
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
    });
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
        lastItem(squares[a]).charAt(0) === lastItem(squares[b]).charAt(0) &&
        lastItem(squares[a]).charAt(0) === lastItem(squares[c]).charAt(0)
      ) {
        return lastItem(squares[a]).charAt(0);
      }
    }
    return null;
  };

  const lastItem = (arr) => {
    const last = arr.filter((x) => x != null).slice(-1)[0];
    return last === undefined ? null : last;
  };

  const jumpTo = (step) => {
    setState({
      ...state,
      stepNumber: step,
      xIsNext: step % 2 === 0,
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
        />
        {state.showPick && (
          <Pick
            chesses={state.xIsNext ? current.xchess : current.ochess}
            onClick={putChess}
          />
        )}
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
