import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductDetails from './components/productDetails/ProductDetails';
import CancelPage from './components/canclePage/CancelPage';
import Navigation from './components/navigation/Navigation';
import SuccessPage from './components/successPage/SuccessPage';
import Prac from './components/prac/prac';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <Navigation /> {/* Use the Navigation component */}

      <Routes> {/* Notice 'Routes' used here instead of 'Switch' */}
        <Route path="/" element={<ProductDetails />} />3
        <Route path="/cancel" element={<CancelPage />} />
        <Route path='/success' element={<SuccessPage />} />
        <Route path='/prac' element={<Prac />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
