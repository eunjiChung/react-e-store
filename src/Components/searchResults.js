import React, { useState, useEffect } from 'react'

import { useSearchParams } from 'react-router-dom';
import { getProductsByQuery } from '../fetcher';

import CategoryProduct from './category_product';

const SearchResults = () => {
    const [products, setProducts] = useState({
      errorMessage: '', 
      data: []
    });

    let [searchParams] = useSearchParams();
    let query = searchParams.get('s');

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsByQuery(query);
      setProducts(responseObject);
    }
    fetchData();
  }, []);

  const renderProducts = () => {
    if (products.data.length > 0) {
        return products.data.map(p =>
          <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>
        )
    } else {
        return <div>No Results Found!</div>;
    }
  }

  return (
    <div>
      { products.errorMessage && <div>Error: {products.errorMessage}</div> }
      { renderProducts() }
    </div>
  )
}

export default SearchResults;