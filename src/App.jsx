import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer'
import Practice from './components/Practice';
import About from './components/About';


function App() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Practice/>
      <About/>
      <Footer/>

    </div>

  );
}

export default App;
