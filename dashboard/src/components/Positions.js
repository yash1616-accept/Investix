// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import { positions } from "../data/data";

// const Positions = () => {
//   const [allPositions, setAllPositions] = useState([]);
//   const { openBuyWindow } = useContext(GeneralContext);

//   useEffect(() => {
//     axios.get("http://localhost:3002/allPositions").then((res) => {
//       // console.log(res.data);
//       setAllPositions(res.data);
//     });
//   }, []);

//   return (
//     <>
//       <h3 className="title">Positions ({allPositions.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Product</th>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Avg.</th>
//             <th>LTP</th>
//             <th>P&amp;L</th>
//             <th>Chg.</th>
//           </tr>

//           {allPositions.map((stock, index) => {
//             const curValue = stock.price * stock.qty;
//             const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//             const profClass = isProfit ? "profit" : "loss";
//             const dayClass = stock.isLoss ? "loss" : "profit";

//             return (
//               <tr key={index}>
//                 <td>{stock.product}</td>
//                 <td>{stock.name}</td>
//                 <td>{stock.qty}</td>
//                 <td>{stock.avg.toFixed(2)}</td>
//                 <td>{stock.price.toFixed(2)}</td>
//                 <td className={profClass}>
//                   {(curValue - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={dayClass}>{stock.day}</td>
//                 {/* button added here!! */}
//                 <td>
//                   <button className="btn btn-red" onClick={()=> openSell(stock.name)}>SELL</button>
//                 </td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Positions;


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const { openBuyWindow } = useContext(GeneralContext);
   console.log("openBuyWindow:", openBuyWindow);

  useEffect(() => {
    axios.get(`${API_URL}/allPositions`).then((res) => {
      setAllPositions(res.data);
    });
  }, []);


  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&amp;L</th>
            <th>Chg.</th>
            <th>Action</th>
          </tr>

          {allPositions.map((stock) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            // const dayClass = stock.isLoss ? "loss" : "profit";

            const dayValue =
            stock.day ??
            (((stock.price - stock.avg) / stock.avg) * 100).toFixed(2) + "%";

            const dayLoss =
              stock.isLoss ?? (stock.price < stock.avg);

            const dayClass = dayLoss ? "loss" : "profit";


            return (
              <tr key={stock._id}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{dayValue}</td>
                <td>
                  <button
                    className="btn btn-red"
                    style={{ backgroundColor: "#df514c", color: "#fff" }}
                    disabled={stock.qty === 0}
                    onClick={() => openBuyWindow(stock, "SELL")}
                  >
                    SELL
                  </button>
                  

                </td>
              </tr>
            );
          })}
          
        </table>
      </div>
    </>
    
  );
};

export default Positions;
