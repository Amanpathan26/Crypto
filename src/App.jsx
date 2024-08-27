import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CoinDetails from './components/CoinDetails'
import { useEffect, useState } from 'react'
import SearchItem  from './components/SearchItem'

function App() {

  const [currency, setCurrency] = useState('inr');
  const [exchangeData, setExchangeData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [clickEffectOnCoinBtn, setClickEffectOnCoinBtn] = useState(true);
  const currencySymbolInr = currency == "inr" ? true : false;

  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-c4zwK77fbGrwmz9qJBfUCg9G' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`, options)
      .then(response => response.json())
      .then(response => setExchangeData(response))
      .catch(err => console.error(err));
    setLoader(false);

    console.log(exchangeData)

  }, [currency])

  return (
    <div className='h-screen '>
      <Header setClickEffectOnCoinBtn={setClickEffectOnCoinBtn} clickEffectOnCoinBtn={clickEffectOnCoinBtn} setCurrency={setCurrency} setExchangeData={setExchangeData} />
      <Routes>
        <Route path='/' element={<Home currency={currency} exchangeData={exchangeData} loader={loader} currencySymbolInr={currencySymbolInr}/>}></Route>
        <Route path='/coin/:id' element={<CoinDetails currency={currency} exchangeData={exchangeData}  currencySymbolInr={currencySymbolInr} clickEffectOnCoinBtn={clickEffectOnCoinBtn}/>}></Route>
        <Route path='/search/:term' element={<SearchItem exchangeData={exchangeData} currency={currency}/>}></Route>
      </Routes>
    </div>
  )
}

export default App
