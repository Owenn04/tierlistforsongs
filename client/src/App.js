
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/home.js'; 

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}

          {/* Protected Routes */}
          {/* <Route 
            path="/properties" 
            element={<ProtectedRoute element={<Properties />} />} 
          /> */}
          {/* <Route 
            path="/rentcollection" 
            element={<ProtectedRoute element={<RentCollection />} />} 
          /> */}

        </Routes>
    </Router> 
);
};

export default App;
