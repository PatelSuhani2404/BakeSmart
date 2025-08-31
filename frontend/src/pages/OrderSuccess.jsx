import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommendedStrip from "../components/RecommendedStrip";
import Navbar from "../components/Navbar";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("bakesmart_order");
    if (storedOrder) {
      try {
        setOrder(JSON.parse(storedOrder));
      } catch (err) {
        console.error("Failed to parse order:", err);
        setOrder(null);
      }
    }
  }, []);

  if (!order) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "#ff4d4f" }}> No order found</h2>
        <p>Please go back to the home page and place a new order.</p>
      </div>
    );
  }

  const gstRate = 0.18;
  const deliveryCharge = 50.00;

  const gstAmount = (order.total_price*gstRate).toFixed(2);
  const finalTotal = Number(order.total_price) + parseFloat(gstAmount) + deliveryCharge;

  return (
    <>
    <Navbar />
    <div style={{ maxWidth: '1000px', margin: "30px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px",
        backgroundColor: "#fafafa", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif", }} >
      <h2 style={{ color: "#28a745", textAlign: "center" }}> Order Success!</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Thank you for shopping with <b>BakeSmart</b> 
      </p>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <b> Order ID : </b> {order.id}
        </p>
        <p>
          <b> Placed on : </b> {order.created_at}
        </p>
      </div>

      <h3 style={{ borderBottom: "2px solid #ddd", paddingBottom: "5px" }}>Order Summary</h3>
      <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>
              Item
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Qty</th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.name}</td>
              <td style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #eee" }}>
                {item.quantity}
              </td>
              <td style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #eee" }}>
                ₹{item.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "right", marginTop: "15px", fontSize: "18px" }}>
        <p>Subtotal: ₹{order.total_price}</p>
        <p>GST (18%): ₹{gstAmount}</p>
        <p>Delivery Charges: ₹{deliveryCharge}</p>
        <hr />
        <b>Final Total: ₹{finalTotal.toFixed(2)}</b>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ borderBottom: "2px solid #ddd", paddingBottom: "5px" }}>
          You might also like
        </h3>
          {order.items && order.items.length > 0 && (
              <RecommendedStrip seedId={order.items[order.items.length - 1].id}
                seedName={order.items[order.items.length - 1].name}/>
          )}
      </div>
      <Link to="/">
          <p className="text-center">
            <button className="btn btn-primary"> Home </button>
          </p>
      </Link>
    </div>
    </>
  );
};

export default OrderSuccess;