import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';
import styles from './ProductCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const ProductCard = ({ id, name, price, image }) => {

  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      setError('Usuario no autenticado. Por favor, inicie sesión.');
      await loginWithRedirect();
      return;
    }

    try {
      const storedUserProfile = localStorage.getItem('userProfile');
      if (!storedUserProfile) {
        setError('Usuario no autenticado. Por favor, inicie sesión.');
        await loginWithRedirect();
        return;
      }

      const parsedUserProfile = JSON.parse(storedUserProfile);
      const userId = parsedUserProfile.id;

      const product = {
        userId,
        bookId: id,
        amount: 1,
      };

      await dispatch(addToCart(product));

      setError('');
      navigate('/cartitem');

    } catch (error) {
      setError(error.response?.data?.message || 'Error al agregar el libro al carrito');
    }
  };

  return (
    <div className={styles.card}>
      <Link className={styles.Info} to={`/detail/${id}`}>
        <img src={image} alt={name} />
        <div className={styles.details}>
          <h3>{name}</h3>
          <div className={styles.price}><p>{`$${price}`}</p></div>
        </div>
      </Link>

      <button onClick={handleAddToCart}>Add to Cart</button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ProductCard;
