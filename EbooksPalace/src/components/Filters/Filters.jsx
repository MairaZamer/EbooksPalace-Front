import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Cards/ProductCard';
import styles from './Filters.module.css';

const Filters = () => {
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [sort, setSort] = useState('');
  const [minimo, setMinimo] = useState('');
  const [maximo, setMaximo] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const booksPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = {
          page: currentPage,
          productsByPage: booksPerPage,
        };

        if (category) params.category = category;
        if (order) params.order = order;
        if (sort) params.sort = sort;
        if (minimo) params.minimo = minimo;
        if (maximo) params.maximo = maximo;
        if (searchValue) params.search = searchValue;

        const response = await axios.get('https://ebookspalace.onrender.com/books', { params });
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, [category, order, sort, minimo, maximo, searchValue, currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ebookspalace.onrender.com/categories');
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const sortOptions = [
    { value: 'asc', label: 'Precio Menor' },
    { value: 'desc', label: 'Precio Mayor' },
  ];

  const orderOptions = [
    { value: 'asc', label: 'Z - A' },
    { value: 'desc', label: 'A - Z' },
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
    setOrder('')
    setSort('')
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setCurrentPage(1);
    setSort('')
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
    setOrder('')
  };

  const handleMinimoChange = (e) => {
    setMinimo(e.target.value);
    setCurrentPage(1);
  };

  const handleMaximoChange = (e) => {
    setMaximo(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.activePage : styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchFilter}>
        <form className={styles.filterForm}>
          <label className={styles.searchBar}>
            Buscar:
            <input type="text" placeholder="Nombre/Autor/Editorial" value={searchValue} onChange={handleSearchValueChange} />
          </label>
        </form>
      </div>
      <div className={styles.sideFilters}>
        <form className={styles.filterForm}>
          <label className={styles.labelmin}>
            Precio Mínimo:
            <input
              type="number"
              value={minimo}
              onChange={handleMinimoChange}
              placeholder="Mínimo"
            />
          </label>
          <br />
          <label className={styles.labelmin}>
            Precio Máximo:
            <input
              type="number"
              value={maximo}
              onChange={handleMaximoChange}
              placeholder="Máximo"
            />
          </label>
          <br />
          <label >
            Categoría:
            <select value={category} onChange={handleCategoryChange}>
              <option value="">Categorías...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Alfabético:
            <select value={order} onChange={handleOrderChange}>
              <option value="">Alfabético...</option>
              {orderOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Precio:
            <select value={sort} onChange={handleSortChange}>
              <option value="">Precio...</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </form>
      </div>
      <div className={styles.books}>
        {error && <p>{error}</p>}
        <div className={styles.booksGrid}>
          {books.map((book) => (
            <ProductCard
              key={book.id}
              id={book.id}
              name={book.name}
              author={book.author}
              editorial={book.editorial}
              price={book.price}
              category={book.category}
              image={book.image}
              description={book.description}
            />
          ))}
        </div>
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          {renderPagination()}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
