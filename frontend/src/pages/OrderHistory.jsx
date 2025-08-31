import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/orders/", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not fetch orders.Please try again.")
      }
    };
    if(currentUser?.token){
        fetchOrders();
    }
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "700px", margin: "40px auto" }}>
        <h2 className="text-center"> Your Orders</h2>
        {error && <p className="text-center" style={{color : "red"}}> {error} </p>}
        {orders.length === 0 ? (
        <>
          <p className="text-center">No orders found.</p>
          <p className="text-center">
            <Link to="/">Shop now !!!</Link>
          </p>
        </>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={{ marginBottom: "15px", padding: "15px", border: "1px solid black", 
                    borderRadius: "8px",background: "#f9f9f9", }}>
              <p> <strong> Order ID : </strong> {order.id} </p>
              <p> <strong> Total Items : </strong> {order.items?.length} </p>
              <ul>
                {order.items?.map((it,i) => (
                  <li key={i}> {it.name} - {it.quantity} x Rs. {it.price} </li>
                ))}
              </ul>
              <p> <strong> Total Price : </strong> Rs. {order.total_price} </p>
              <p>
                <strong> Order Date : </strong> {" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default OrderHistory;