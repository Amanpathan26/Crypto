/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export default function CoinDetails({ exchangeData, currencySymbolInr, currency, clickEffectOnCoinBtn }) {

  const { id } = useParams();
  const [clickedId, setClickedId] = useState(id);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(true);
  const mainRightTableClass = clickEffectOnCoinBtn ? 'main-right-small-table' : null;

  useEffect(() => {
    const filterData = exchangeData.filter(item => item.id == clickedId);
    setFilteredData(filterData);
    setLoader(false);
    console.log(filterData);
  }, [clickedId, currency, id, exchangeData]);

  return (
    <>
      {loader ? (<Loader />) :
        (<div className='flex h-[calc(100%-72px)] relative overflow-hidden'>

          {/* Left Coin Details Container */}
          <div className='left-coin-details-container bg-slate-400 h-full text-center sm:min-w-[300px] sm:w-[40%]'>
            {filteredData.map((item) => {

              // const time = new Date(item.last_updated)
              // const date = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
              // const currentTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

              // console.log(date)
              // console.log(currentTime)

              return (
                <>
                  <p className='py-2 text-sm'>Last Update {item.last_updated}</p>
                  <div>
                    <img className='min-w-[140px] sm:min-w-[240px] mx-auto' src={item.image}></img>
                    <h1 className='font-bold text-xl text-white my-4'>#{item.market_cap_rank} {item.id.toUpperCase()}</h1>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='item bg-slate-500 border col-span-2 h-[75px]'>
                      <p className='font-bold text-lg'>Current price</p>
                      {currencySymbolInr ? '₹' + ' ' + item.current_price : '$' + item.current_price}
                    </div>
                    <div className='item bg-slate-500 border h-[75px]'>
                      <p className='font-bold text-lg'>24h Low</p>
                      <p className='text-[#ff5555]'>{currencySymbolInr ? '₹' + ' ' + item.low_24h : '$' + item.low_24h}</p>
                    </div>
                    <div className='item bg-slate-500 border'>
                      <p className='font-bold text-lg'>24h High</p>
                      <p className='text-[#32ee21]'>{currencySymbolInr ? '₹' + ' ' + item.high_24h : '$' + item.high_24h}</p>
                    </div>
                    <div className='item bg-slate-500 border h-[75px]'>
                      <p className='font-bold text-lg'>Total supply</p>
                      {currencySymbolInr ? '₹' + ' ' + item.total_supply.toFixed(2) : '$' + item.total_supply.toFixed(2)}
                    </div>
                    <div className='item bg-slate-500 border'>
                      <p className='font-bold text-lg'>Total volume</p>
                      {currencySymbolInr ? '₹' + ' ' + item.total_volume : '$' + item.total_volume}
                    </div>
                  </div>
                </>
              )
            })
            }
          </div>

          {/* Coin Details right background  Image */}
          <div className='coin-details-right-bg-img bg-black w-[100%] h-full absolute -z-10'></div>

          {/* Coin small Table of right Side */}
          <div className={`${mainRightTableClass} bg-[#ffffff50] backdrop-blur-[10px] w-[350px] text-center h-full overflow-y-scroll transition-all absolute right-0 z-10`}>
            <CoinTable exchangeData={exchangeData} setClickedId={setClickedId} />
          </div>

        </div>)}
    </>
  )
}

{/* Coin small Table of right Side Component*/ }
export const CoinTable = ({ exchangeData, setClickedId }) => {
  
  const [searchCoin, setSearchCoin] = useState('');
  const [searchCoinFilteredData, setSearchCoinFilteredData] = useState(exchangeData);

  useEffect(()=>{
    setSearchCoinFilteredData(exchangeData)
  },[exchangeData]);

  const formSubmitHandler = (e) => {
  e.preventDefault();
  const searchCoinFilterData = exchangeData.filter(item => item.name.toLowerCase().includes(searchCoin.toLowerCase()));
  setSearchCoinFilteredData(searchCoinFilterData);
  setSearchCoin('');
  }

  return (
    <>
   
      <table>

        <thead className='bg-black text-white h-20 font-semibold text-lg sticky top-0'>
          <tr className='bg-slate-500 h-6'>
            <td colSpan={"3"}>
              <form onSubmit={formSubmitHandler}>
                <input className='text-black w-[99%] px-2 outline-none text-sm py-1 placeholder:text-gray-500' type='text' placeholder='Search coins...' value={searchCoin} onChange={(e) => { setSearchCoin(e.target.value); }} />
              </form>
              <button className='absolute top-[4px] right-1 bg-black z-10 h-6 py-0 text-sm hover:border border-black' onClick={() => { setSearchCoinFilteredData(exchangeData) }}>Reset</button>
            </td>
          </tr>
          <tr>
            <td>Icon</td>
            <td>Name</td>
            <td>Profit/Loss</td>
          </tr>
        </thead>

        { searchCoinFilteredData.length == 0 ?
         <tfoot>
          <tr>
            <td colSpan={3}>Coin not found...</td>
          </tr>
         </tfoot> :
         
         <>
           {
          searchCoinFilteredData.map((item, i) => {
            const profit = item.price_change_percentage_24h > 0 ? true : false;
            return (
              <>
                <tfoot className='border-b border-black' key={i}>
                  <tr className='cursor-pointer' onClick={() => { setClickedId(item.id) }}>
                    <td className='py-1'><img className="w-10 mx-auto" src={item.image}></img> <p>{item.symbol}</p></td>
                    <td>{item.name}</td>
                    <td style={profit ? { color: '#32ee21' } : { color: 'red' }}>{profit ? '+' + item.price_change_percentage_24h.toFixed(2) : item.price_change_percentage_24h.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </>
            )
          })
        }
         </>
        }
       
      </table>
    </>
  )
}