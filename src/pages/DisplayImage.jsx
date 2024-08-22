import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const DisplayImage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (term = '') => {
    setLoading(true);
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const pokemonList = response?.data?.results;

      let newDataArray = [];

      for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        const pokemonDetails = await axios.get(pokemon.url);

        const imageUrl = pokemonDetails?.data?.sprites.front_default;

        const newData = {
          name: pokemon.name,
          imageUrl: imageUrl
        };

        newDataArray.push(newData);
      }

      // Filter the results based on the search term
      if (term) {
        newDataArray = newDataArray.filter(pokemon => pokemon.name.toLowerCase().includes(term.toLowerCase()));
      }

      setData(newDataArray);
    } catch (error) {
      console.log("Error in API call", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData(searchTerm);
  };

  return (
    <div className='flex flex-col items-center mt-10 w-[90%] mx-auto bg-gray-100 p-6 rounded-lg shadow-lg'>
      <div className='flex justify-between items-center w-full mb-8'>
        <h1 className='underline uppercase text-4xl text-gray-800'>Displaying Pokémon Data</h1>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            id='searchByName'
            placeholder='Enter the Name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'
          />
          <button
            onClick={handleSearch}
            className='bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            Search Data
          </button>
        </div>
      </div>

      {loading ? (
        <div className='text-center text-gray-500'>Loading...</div>
      ) : (
        <div className='w-full'>
          {data.length === 0 ? (
            <div className='text-center text-gray-500'>No results found.</div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
              {data.map((pokemon, index) => (
                <Card key={index} imageUrl={pokemon.imageUrl} name={pokemon.name} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayImage;
