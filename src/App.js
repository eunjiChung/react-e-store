import React from 'react';
import './App.css';

import { useEffect, useState } from 'react';
import { getCategories } from './fetcher';

import ProductDetail from './Components/ProductDetail';
import Basket from './Components/Basket';
import Checkout from './Components/Checkout';
import Category from './Components/Category';
import Layout from './Components/Layout';
import Home from './Components/home';
import OrderConfirmation from './Components/orderConfirmation';
import SearchResults from './Components/searchResults';

import { 
  BrowserRouter, 
  Routes,
  Route
} from "react-router-dom";



function App() {
  const [categories, setCategories] = useState({errorMessage: '', data: []});

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  },[]);

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout categories={categories}/>}>
            <Route index element={<Home />} />
            <Route path="basket" element={<Basket />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path='search' element={<SearchResults />} />
            <Route path='orderconfirmation' element={<OrderConfirmation />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path='categories/:categoryId' element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
