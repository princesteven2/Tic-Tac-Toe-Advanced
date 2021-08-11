import Square from './Square';

const Board = ({ squares, onClick, getLast, cursor, inMove }) => {
  const renderSquare = (i) => {
    //console.log(inMove);
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        getLast={(arr) => getLast(arr)}
        ifCursor={cursor === i}
        ifInMove={inMove && cursor === i}
      />
    );
  };

  return (
    <div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
