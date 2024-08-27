/* eslint-disable react/prop-types */

import { useParams } from 'react-router-dom';
import CrytoTable from './CryptoTable';
import { useEffect, useState } from 'react';

function SearchItem({ exchangeData, currency }) {

  const [filteredData, setFilteredData] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    const filterData = exchangeData.filter(item => item.id.toLowerCase().includes(term.toLowerCase()));
    setFilteredData(filterData);
  }, [term, currency, exchangeData]);

  return (

    <>
      {
        filteredData.length == 0 ? 
        (<div className='text-center font-bold text-4xl mt-32'>Coin not found...</div>) :
        (<div className='search-main-container h-[calc(100%-117px)] sm:h-[calc(100%-80px)]'>
         <CrytoTable exchangeData={filteredData} />
        </div>)
      }
    </>

    

  )
}

export default SearchItem
