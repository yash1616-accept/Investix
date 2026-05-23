const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require ("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");
const Cashfree  = require("cashfree-pg");

const WalletModel = require("./model/WalletModel");


const { HoldingsModel } = require("./model/HoldingsModel");

const{ PositionsModel } = require("./model/PositionsModel");

const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL || process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async(req,res)=>{
//     let tempHoldings = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];

//     tempHoldings.forEach((item)=>{
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         });

//         newHolding.save();
//     });
//     res.send("done!")
// });

// app.get("/addPositions", async(req,res)=>{
//     let tempPositions =  [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

//     tempPositions.forEach((item)=>{
//         let newPosition = new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });
//          newPosition.save();
//     });
//     res.send("done!!");
// });

app.get("/allHoldings", async(req,res)=>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions", async(req,res)=>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.get("/allOrders", async(req,res)=>{
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    //  Save order (order history)
    await OrdersModel.create({
      name,
      qty,
      price,
      mode,
    });

    // Find existing position
    let position = await PositionsModel.findOne({ name });

    if (mode === "BUY") {
      if (position) {
        // weighted average price
        const totalQty = position.qty + qty;
        position.avg =
          (position.avg * position.qty + price * qty) / totalQty;
        position.qty = totalQty;
        position.price = price;
      } else {
        position = new PositionsModel({
          product: "CNC",
          name,
          qty,
          avg: price,
          price,
        });
      }
    }

    if (mode === "SELL") {
      if (!position) {
        return res.status(400).send("No position to sell");
      }

      if (qty > position.qty) {
        return res.status(400).send("Sell qty exceeds position qty");
      }

      position.qty -= qty;

      if (position.qty === 0) {
        await PositionsModel.deleteOne({ name });
        return res.send("Position closed");
      }
    }

    await position.save();
    res.send("Order executed successfully");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});



// Cashfree.XClientId = process.env.CASHFREE_APP_ID;
// Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
// Cashfree.XEnvironment = "SANDBOX"; // or "PRODUCTION"

// function generateOrderId() {
//   return crypto.randomBytes(12).toString("hex");
// }

// //ORDER API

// app.post("/payments/create-order", async (req, res) => {
//   try {
//     const { amount, userId } = req.body;

//     const request = {
//       order_id: generateOrderId(),
//       order_amount: amount,
//       order_currency: "INR",
//       customer_details: {
//         customer_id: userId || "guest_user",
//         customer_phone: "9999999999",
//         customer_name: "Test User",
//         customer_email: "test@example.com",
//       },
//     };

//     const response = await Cashfree.PGCreateOrder(
//       "2023-08-01",
//       request
//     );

//     res.json({
//       success: true,
//       data: response.data,
//     });

//   }catch (error) {
//     console.error("Cashfree order error:", error.response?.data || error);
//     res.status(500).json({
//       success: false,
//       message: error.response?.data || "Order creation failed",
//     });
//   }
// });


// //VERIFY PAYMENT

// app.post("/payments/verify", async (req, res) => {
//   try {
//     const { orderId, userId } = req.body;

//     const response = await Cashfree.PGOrderFetchPayments(
//       "2023-08-01",
//       orderId
//     );

//     const payments = response.data;

//     const successPayment = payments.find(
//       (p) => p.payment_status === "SUCCESS"
//     );

//     if (!successPayment) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment not successful",
//       });
//     }

//     await WalletModel.updateOne(
//       { userId },
//       { $inc: { availableCash: successPayment.payment_amount } },
//       { upsert: true }
//     );

//     res.json({
//       success: true,
//       payment: successPayment,
//     });

//   } catch (error) {
//     console.error(error.response?.data || error);
//     res.status(500).json({ success: false, message: "Verification failed" });
//   }
// });




// Cashfree headers


// Use dotenv config values
const CF_APP_ID = process.env.CASHFREE_APP_ID;
const CF_SECRET = process.env.CASHFREE_SECRET_KEY;
const CF_ENV = process.env.CASHFREE_ENV === "PROD" ? "PROD" : "TEST";

// Function to return headers for Cashfree API
function cfHeaders() {
  return {
    "x-client-id": CF_APP_ID,               // use env variable
    "x-client-secret": CF_SECRET,           // use env variable
    "x-api-version": "2023-08-01",          // ✅ REQUIRED         
    "Content-Type": "application/json",
  };
}

// Utility to generate random order_id for Cashfree
function generateOrderId() {
  return crypto.randomBytes(12).toString("hex");
}

// ------------------- CREATE ORDER -------------------
app.post("/payments/create-order", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const payload = {
      order_id: generateOrderId(),         // generated locally
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: userId || "guest_user",
        customer_name: "Test User",
        customer_email: "test@example.com",
        customer_phone: "9999999999",
      },
    };

    // Cashfree sandbox or prod URL
    const url =
      CF_ENV === "PROD"
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

    // Use axios POST to create order
    const response = await axios.post(url, payload, { headers: cfHeaders() });

    // Send both order_id and payment_session_id to frontend
    res.json({
      success: true,
      data: {
        order_id: response.data.order_id,
        payment_session_id: response.data.payment_session_id, // <- important
      },
    });

  } catch (err) {
    console.error("Cashfree order error:", err.response?.data || err);
    const errMsg = err.response?.data?.message || "Order creation failed";
    res.status(500).json({ success: false, message: errMsg });
  }
});

// ------------------- VERIFY PAYMENT -------------------
app.post("/payments/verify", async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    const url =
      CF_ENV === "PROD"
        ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
        : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`;

    // GET payments from Cashfree
    const response = await axios.get(url, { headers: cfHeaders() });

    const payments = response.data.data || [];

    const successPayment = payments.find(
      p => p.txStatus === "SUCCESS" || p.payment_status === "SUCCESS"
    );

    if (!successPayment) {
      return res.status(400).json({ success: false, message: "Payment not successful" });
    }

    // Update wallet
    await WalletModel.updateOne(
      { userId },
      { $inc: { availableCash: successPayment.txAmount } },
      { upsert: true }
    );

    res.json({ success: true, payment: successPayment });

  } catch (err) {
    console.error("Cashfree verify error:", err.response?.data || err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});


mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected!");

    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
// Trigger reload for new env keys
