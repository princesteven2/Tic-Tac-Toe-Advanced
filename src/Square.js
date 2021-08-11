const Square = ({ value, onClick, getLast, ifCursor, ifInMove }) => (
  <button
    className={`square ${getLast(value)} ${ifCursor && 'cursor'} ${
      ifInMove && 'inmove'
    }`}
    onClick={onClick}
  >
    {getLast(value) !== null && getLast(value).charAt(0)}
  </button>
);

export default Square;
