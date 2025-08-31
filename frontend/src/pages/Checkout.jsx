import React, { useContext, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import '../components/Auth/Auth.css'
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const Checkout = () => {

  const { cartItems } = useContext(CartContext)

  const total = cartItems.reduce((total,item)=>total+item.price*item.quantity,0);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refreshAccessToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) throw new Error("No refresh token found");

      const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh,
      });

      localStorage.setItem("access", res.data.access);
      return res.data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      setError("Session expired. Please login again.");
      return null;
    }
  };

  const handleOrder = async () => {
    try {
      let access = localStorage.getItem("access");
      if (!access) {
        setError("Please login to place an order.");
        return;
      }

      const orderData = {
        items: cartItems,
        total_price: total,
        name,
        address,
        phone,
      };

      let response;
      try {
        response = await axios.post(
          "http://127.0.0.1:8000/api/orders/",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
          console.log("Order data being sent :",orderData)
          localStorage.setItem("bakesmart_order",JSON.stringify({
            ...response.data,items:cartItems
          }))
      } catch (err) {
        if (err.response && err.response.status === 401) {
          access = await refreshAccessToken();
          if (!access) return;
          response = await axios.post(
            "http://127.0.0.1:8000/api/orders/",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            });
        } else {
          throw err;
        }}
      setSuccess("Order placed successfully!");
      navigate("/order-success");
      setError("");
      console.log("Order response:", response.data);
      } catch (err) {
        if (err.response) {
            console.error("Order failed - response:", err.response.data, "status:", err.response.status);
        } else if (err.request) {
            console.error("Order failed - no response:", err.request);
        } else {
            console.error("Order failed - error message:", err.message);
        }
        setError("Order failed. Please try again.");
      }
    };

  return (
    <>
    <Navbar/>
      <div className="container">
        <form className="form">
          <h2 className="name"> Checkout </h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
            <table>
              <tbody>
                <tr>
                  <td><label>Name: </label></td>
                  <td> <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /> </td>
                </tr>
                <tr>
                  <td><label>Address: </label></td>
                  <td> <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required /> </td>
                </tr>
                <tr>
                  <td><label>Phone: </label></td>
                  <td> <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required /> </td>
                </tr>
              </tbody>
            </table>
            <br />
            <button type="button" onClick={handleOrder}>Place Order</button>
        </form>
      </div>
    </>
  );
};

export default Checkout;