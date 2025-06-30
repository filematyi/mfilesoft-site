import React from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import Home from './views/home/Home'; // Example component for one site  
import GptChat from './views/gpt_chat/GptChat'; // Another example component for another site  
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
              <li><Link to="/chat">Gpt Chat</Link></li>  
              <li><Link to="/contact">Contact</Link></li>  
            </ul>  
          </nav>  
        </header>  
  
        {/* Routing table */}  
        <main style={{ padding: '20px' }}>  
          <Routes>  
            <Route path="/" element={<Home />} />  
            <Route path="/chat" element={<GptChat />} />  
            <Route path="/contact" element={<Contact />} />  
          </Routes>  
        </main>  
      </div>  
    </Router>  
  );  
}  
  
export default App;  
