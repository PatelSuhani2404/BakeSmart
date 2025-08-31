import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Cart.css"

function Cart(){
    const { cartItems, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);
    const total = cartItems.reduce((sum,item) => sum+item.price * item.quantity,0);
    return(
        <>
        <Navbar/>
        <div className="cart-container">
            <h2 className="cart-title text-center">Your Cart</h2>
            <div className="container my-5">
                {cartItems.length === 0 ? (
                <p className="text-center">Your Cart is empty.</p>
                ) : (
                    <div className="row">
                        {cartItems.map((item, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div className="cart-item">
                                <img src={`http://localhost:5000${item.image}`} alt={item.name} width="150" height="100" />
                                <div className="cart-item-details">
                                    <h5>{item.name}</h5>
                                    <p>Price: Rs.{item.price}</p>
                                    {item.weight && <p>Weight: {item.weight}</p>}
                                    {item.flavor && <p>Flavor: {item.flavor}</p>}
                                    <p>Quantity: {item.quantity}</p>
                                    <div className="cart-buttons">
                                        <button className="btn btn-sm btn-outline-success" onClick={() => increaseQty(item.id)}>+</button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => decreaseQty(item.id)}>-</button>
                                        <br/>
                                        <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => removeFromCart(item.id)}>
                                                    Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        <div className="col-12 text-end">
                            <h4 className="cart-total">Total: Rs.{total}</h4>
                            <Link to="/checkout">
                                <button className="btn btn-success mt-3">Proceed to Checkout</button>
                            </Link>
                        </div>
                    </div>
                    )}
            </div>
        </div>
        </>
    )
}

export default Cart;