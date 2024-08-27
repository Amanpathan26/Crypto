/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"


function Header({ setCurrency, setClickEffectOnCoinBtn, clickEffectOnCoinBtn }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate()



  const formSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
    setSearchTerm('')
    setSearchLocation(`/search/${searchTerm}`);
  }
  
  return (
    <>
      <header className='w-full py-5 bg-gray-900 px-6 flex items-center justify-between flex-wrap gap-y-4 text-white sticky top-0 z-10'>

        <Link to={'/'} className='font-bold text-lg sm:text-2xl text-[gold]'>CrytoGraphy</Link>

        <div className='flex gap-2 items-center sm:order-3'>
          <button onClick={() => { setCurrency('inr') }}>INR</button>
          <button onClick={() => { setCurrency('usd') }}>USD</button>

          { clickEffectOnCoinBtn ?
            (<div className="w-10 font-semibold text-md cursor-pointer transition-all duration-300 hover:text-blue-600 sm:hidden" onClick={() => { setClickEffectOnCoinBtn(!clickEffectOnCoinBtn) }}>Coins</div>) :

          (<div className="ml-[7%] w-10 font-semibold text-md cursor-pointer sm:hidden" onClick={()=>{ setClickEffectOnCoinBtn(!clickEffectOnCoinBtn) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-7  hover:text-red-600 transition-all">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>)
          }

        </div>

        {
        (useLocation().pathname == searchLocation ) || ( useLocation().pathname == `/`) ? <form onSubmit={formSubmitHandler} className='headerForm w-[50%] mx-auto'>
          <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} className='w-full px-2 py-1 sm:px-3 sm:py-2 text-black outline-none rounded-lg' type='text' placeholder='Search coin...'></input>
        </form> : null
        }
      </header>
    </>
  )
}

export default Header