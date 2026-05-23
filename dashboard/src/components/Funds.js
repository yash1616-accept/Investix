import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Funds = () => {
  const [cashfree, setCashfree] = useState(null);
  const [loading, setLoading] = useState(true); // new state for SDK loading
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const userId = "user_001"; // replace with auth userId
  const amount = 500; // demo amount

  // Load Cashfree SDK
  useEffect(() => {
    const initCashfree = async () => {
      try {
        const cf = await load({ mode: "sandbox" });
        setCashfree(cf);
        setLoading(false);
      } catch (err) {
        console.error("Cashfree SDK load error:", err);
        alert("Failed to load payment SDK");
      }
    };
    initCashfree();
  }, []);





  // verify payment model
  const verifyPayment = async (orderId) => {
  if (!orderId) return;

  try {
    const res = await axios.post(
      `${API_URL}/payments/verify`,
      { orderId, userId }
    );

    if (res.data.success) {
      setShowSuccessModal(true); // 🎉 show modal
    } else {
      alert("Payment verification failed");
    }
  } catch (err) {
    console.error("Verify payment error:", err.response || err);
  
  }
};




  //handles add fund btn
  const handleAddFunds = async (e) => {
  e.preventDefault();

  if (!cashfree) {
    alert("Payment SDK not loaded");
    return;
  }

  try {
    const res = await axios.post(
      `${API_URL}/payments/create-order`,
      { amount, userId }
    );

    const { payment_session_id, order_id } = res.data.data;

    const result = await cashfree.checkout({
      paymentSessionId: payment_session_id,
      redirectTarget: "_modal",
    });

    // ✅ verify ONLY if checkout succeeds
    if (result?.paymentDetails) {
      verifyPayment(order_id);
    }

  } catch (err) {
    console.error("Payment init error:", err);
    const errMsg = err.response?.data?.message || "Payment initialization failed";
    alert(errMsg);
  }
};




  return (
    <div className="funds-page">
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="fund-actions">
          <button
            className="btn btn-green"
            onClick={handleAddFunds}
            disabled={loading} // disable until SDK loads
          >
            {loading ? "Loading..." : "Add funds"}
          </button>
          <Link to="/funds" className="btn btn-blue">
            Withdraw
          </Link>
        </div>
      </div>

      <div className="funds-row">
        <div className="funds-col">
          <p className="section-title">Equity</p>
          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">4,043.10</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">3,757.30</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">4,043.10</p>
            </div>

            <hr />

            <div className="data">
              <p>Opening balance</p>
              <p>4,043.10</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>4,064.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>

            <hr />

            <div className="data">
              <p>Total collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="funds-col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link to="/funds" className="btn btn-blue">
              Open account
            </Link>
          </div>
        </div>
      </div>

        {showSuccessModal && (
          <div className="payment-modal-overlay">
            <div className="payment-modal">
              <h2>Payment Successful 🎉</h2>
              <p>₹{amount} has been added to your wallet.</p>

              <button
                className="btn btn-green"
                onClick={() => setShowSuccessModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}

    </div>
  );
};

export default Funds;
