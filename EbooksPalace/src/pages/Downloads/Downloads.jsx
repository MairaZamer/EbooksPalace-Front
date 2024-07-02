import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaidBooks } from '../../redux/actions';
import styles from './Downloads.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Downloads = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('userProfile'));
    const userId = user ? user.id : null;

    const { books, loading, error } = useSelector(state => state.books);

    useEffect(() => {
        if (userId) {
            dispatch(fetchPaidBooks(userId));
        }
    }, [dispatch, userId]);

    const handleDownloads = async (bookId) => {
        try {
            const response = await axios.get(`http://localhost:3001/download/${bookId}`, {
                params: { userId },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${bookId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the book:', error);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.downloads}>
            <h1>Mis libros</h1>
            {books.length === 0 ? (
                <p>Aún no tienes libros</p>
            ) : (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>
                            <img src={book.image} alt={book.name} />
                            <div>
                                <h2>{book.name}</h2>
                                <p>{book.author}</p>
                            </div>
                            <button onClick={() => handleDownloads(book.id)}>Descargar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Downloads;
