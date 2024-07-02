import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginButton } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { LogoutButton } from '../Logout/Logout';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../Images/logo.png';
import carrito from '../Images/carrito.png';
import './NavBar.css';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      navigate('/cartitem');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-left">
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <div>
        <Link to="/form">
          <button>Crear Libro</button>
        </Link>
      </div>
      <div>
        {isAuthenticated ? <>
          <Profile />
          <div className='downloads'>
            <Link to='/downloads'>
              <button>Descargas</button>
            </Link>
          </div>
          <LogoutButton />
        </> : <LoginButton />}
      </div>
      <div className="navbar-right">
        <img
          src={carrito}
          alt="Carrito de Compras"
          className="shopping-cart"
          onClick={handleCartClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
