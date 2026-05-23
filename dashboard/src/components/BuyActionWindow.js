import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const BuyActionWindow = ({ stock, mode }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (stock?.price) setStockPrice(stock.price);
    setStockQuantity(1);
  }, [stock]);

  const handleBuyClick = () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (qty <= 0 || qty > stock.qty) {
      setError(`Qty must be between 1 and ${stock.qty}`);
      return;
    }

    if (price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    axios
      .post(`${API_URL}/newOrder`, {
        id: stock._id,     // backend uses this
        name: stock.name,  // UI uses this
        qty,
        price,
        mode,
      })
      .then(() => {
        closeBuyWindow();
      })
      .catch((err) => {
        setError(err.response?.data || "Order failed");
      });
  };

  return (
    <div className="container" id="buy-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty. (max {stock.qty})</legend>
            <input
              type="number"
              min={1}
              max={stock.qty}
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>

        {error && <div className="error">{error}</div>}
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            className={mode === "BUY" ? "btn btn-blue" : "btn btn-red"}
            onClick={handleBuyClick}
          >
            {mode}
          </button>

          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
