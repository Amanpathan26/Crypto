/* eslint-disable react/prop-types */
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";


function CrytoTable({exchangeData, loader, currencySymbolInr }) {

  const navigate = useNavigate()

  return (
    
    <div className="relative">
      {loader ? (<Loader />) :
        (<table className="w-full mx-auto text-center">
          <thead className="table-head h-20 text-white sm:text-2xl font-bold sticky top-0 z-10 bg-slate-500">
            <tr>
              <td>Icon</td>
              <td>Name</td>
              <td>Current Price</td>
              <td>Profit</td>
              <td>Rank</td>
            </tr>
          </thead>
          {
            exchangeData.map((item, i) => {
              const profit = item.price_change_percentage_24h > 0 ? true : false;
              return (

                <tbody onClick={() => { navigate(`/coin/${item.id}`) }} key={i} className="table-body border-b h-28 sm:text-xl text-white hover:bg-slate-500">

                  <tr>
                    <td className="w-[25%]"><img className="w-[30%] min-w-14 mx-auto" src={item.image}></img> <p>{item.symbol.toUpperCase()}</p></td>
                    <td>{item.name}</td>
                    <td>{currencySymbolInr ? '₹' + ' ' + item.current_price : '$' + item.current_price}</td>
                    <td style={profit ? { color: '#32ee21' } : { color: 'red' }}>{profit ? '+' + item.price_change_percentage_24h.toFixed(2) : item.price_change_percentage_24h.toFixed(2)}</td>
                    <td>{item.market_cap_rank}</td>
                  </tr>

                </tbody>

              )
            })
          }
        </table>)
      }
    </div>

  )
}

export default CrytoTable