
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Detail from './pages/Detail/Detail.jsx'
import Landing from './pages/Langing/Landing.jsx'
import Form from './pages/Form/Form.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import NavBar from './components/Nav/Nav.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import PrivateRoute from './components/private/PrivateRoute.jsx'
import  CheckUsers  from './pages/dashboard/CheckUsers.jsx'
function App() {

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Detail from './pages/Detail/Detail.jsx';
import Landing from './pages/Langing/Landing.jsx';
import Form from './pages/Form/Form.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import NavBar from './components/Nav/Nav.jsx';
import PrivateRoute from './components/privateRoute/privateRoute.jsx';
import { LoginButton } from './components/Login/Login.jsx';


function App() {
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/form' element={<Form />} />

          <Route path='/cartitem' element={<Cart></Cart>} />
          <Route path='/checkout' element={<Checkout></Checkout>} />
          <Route path="/admin" element={<Dashboard />}/>
          <Route path="/admin/checkusers" element={<CheckUsers/>} />


      

          <Route path='/login' element={<LoginButton />} />
          <Route path='/cartitem' element={<PrivateRoute element={<Cart />} />} />
          <Route path='/checkout' element={<PrivateRoute element={<Checkout />} />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
