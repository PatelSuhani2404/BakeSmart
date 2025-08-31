import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Cheesecake from './pages/Cheesecake';
import Cupcakes from './pages/Cupcakes';
import Pastries from './pages/Pastries';
import Other from './pages/Other';
import Cart from './pages/Cart';
import CartProvider from './context/CartContext';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminPanel from './pages/AdminPanel'
import ManageCakes from './pages/ManageCakes';
import ManageCheesecake from './pages/ManageCheesecake';
import ManageCupcakes from './pages/ManageCupcakes';
import ManagePastries from './pages/ManagePastries';
import ManageOther from './pages/ManageOther';

function App(){
  return(
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cakes' element={<Cakes/>}/>
            <Route path='/cheesecake' element={<Cheesecake/>}/>
            <Route path='/cupcakes' element={<Cupcakes/>}/>
            <Route path='/pastries' element={<Pastries/>}/>
            <Route path='/other' element={<Other/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order-success' element={<OrderSuccess/>}/>
            <Route path='/order-history' element={<OrderHistory/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/admin-panel' element={<AdminPanel/>}/>
            <Route path='/admin/manage-cakes' element={<ManageCakes/>}/>
            <Route path='/admin/manage-cheesecake' element={<ManageCheesecake/>}/>
            <Route path='/admin/manage-cupcakes' element={<ManageCupcakes/>}/>
            <Route path='/admin/manage-pastries' element={<ManagePastries/>}/>
            <Route path='/admin/manage-other' element={<ManageOther/>}/>
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}


export default App;