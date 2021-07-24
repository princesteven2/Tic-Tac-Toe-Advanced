const Square = ({ value, onClick, getLast, ifCursor }) => (
  <button
    className={`square ${getLast(value)} ${ifCursor && 'cursor'}`}
    onClick={onClick}
  >
    {getLast(value) !== null && getLast(value).charAt(0)}
  </button>
);

export default Square;
