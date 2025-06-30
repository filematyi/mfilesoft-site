import React from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import Home from './Home'; // Example component for one site  
import About from './About'; // Another example component for another site  
import Contact from './Contact'; // Example for a third site  
  
function App() {  
  return (  
    <Router>  
      <div>  
        {/* Header with navigation links */}  
        <header style={{ padding: '10px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ccc' }}>  
          <nav>  
            <ul style={{ listStyleType: 'none', display: 'flex', gap: '10px', padding: 0 }}>  
              <li><Link to="/">Home</Link></li>  
              <li><Link to="/about">About</Link></li>  
              <li><Link to="/contact">Contact</Link></li>  
            </ul>  
          </nav>  
        </header>  
  
        {/* Routing table */}  
        <main style={{ padding: '20px' }}>  
          <Routes>  
            <Route path="/" element={<Home />} />  
            <Route path="/about" element={<About />} />  
            <Route path="/contact" element={<Contact />} />  
          </Routes>  
        </main>  
      </div>  
    </Router>  
  );  
}  
  
export default App;  
