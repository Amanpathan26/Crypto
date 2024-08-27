import CrytoTable from "./CryptoTable"


function Home({currency, exchangeData, loader, currencySymbolInr}) {
  return (
    <div className="home-main-conatiner ">
        <CrytoTable currency={currency} exchangeData={exchangeData} loader={loader} currencySymbolInr={currencySymbolInr}/>
    </div>
  )
}

export default Home