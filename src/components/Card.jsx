import React from 'react';

const Card = ({ imageUrl, name }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center text-gray-800">{name}</div>
      </div>
    </div>
  );
};

export default Card;
