import React from 'react';

const Pick = ({ chesses, onClick }) => {
    return (
        <div className='pickpool'>
            {chesses.map((chess) => (
                <button
                    key={Math.floor(Math.random() * 10000) + 1}
                    className={`pickbtn ${chess}`}
                    onClick={() => onClick(chess, -1)}
                >
                    {chess.charAt(0)}
                </button>
            ))}
        </div>
    );
};

export default Pick;
