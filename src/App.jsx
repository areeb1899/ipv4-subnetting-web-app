import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Practice from './components/Practice';
import Footer from './components/Footer';
import BinaryPage from './components/BinaryPage';
import FlsmVlsm from './components/FlsmVlsm';
import SubnettingCheatSheet from './components/SubnettingCheatSheet';
import ErrorPage from './components/ErrorPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Practice />
              <About />
              <Footer />
            </>
          }
        />
        <Route path="/binary-representation" element={<BinaryPage />} />
        <Route path="/flsm-vlsm" element={<FlsmVlsm />} />
        <Route path="/subnetting-cheat-sheet" element={<SubnettingCheatSheet />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
