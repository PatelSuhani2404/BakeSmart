import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'

function Navbar() {
  const { cartItems } = useContext(CartContext)
  const { currentUser,logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4 sticky-top">
      <Link className="navbar-brand" to="/">
        <img src='/images/logo.jpg' alt='BakeSmart' width={"40px"} height={"40px"} className='rounded-pill'/>
        <span className='ms-2'> BakeSmart </span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/cakes">Cakes</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/cheesecake">Cheesecake</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/cupcakes">Cupcakes</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/pastries">Pastries</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/other">Other Items</Link></li>
          <li className="nav-item"><Link className="nav-link position-relative" to="/cart">
            Cart
            { cartItems.length>0 && (
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                {cartItems.length}
              </span>
            ) }
            </Link>
          </li>
          {currentUser ? (
            <>
            <li className='nav-item'>
              <span className='nav-link'> Welcome,{currentUser.username || currentUser.name || currentUser.user.username } 
                      ({currentUser.role || currentUser.user.role }) </span>
            </li>
            {(currentUser.role || currentUser.user.role ) === 'admin' && (
              <li className='nav-item'>
                <Link className='nav-link' to='/admin-panel'> Admin Panel </Link>
              </li>
            )}
            {(currentUser.role || currentUser.user.role ) === 'user' && (
              <li className='nav-item'>
                <Link className='nav-link' to='/order-history'> My Orders </Link>
              </li>
            )}

            <li className='nav-item'>
              <button className='btn btn-danger mx-2' onClick={logout}> Logout </button>
            </li>
            </>
          ):(
            <li className='nav-item'>
              <Link className='nav-link' to='/login'> Login </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;