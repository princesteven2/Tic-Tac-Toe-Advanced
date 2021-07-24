const Square = ({ value, onClick, getLast }) => (
  <button className={`square ${getLast(value)}`} onClick={onClick}>
    {getLast(value) !== null && getLast(value).charAt(0)}
  </button>
);

export default Square;
