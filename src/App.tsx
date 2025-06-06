import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages  from './pages/export';



const App: React.FC = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Pages.dashboard/>} />
          <Route path="/dashboard" element={<Pages.dashboard/>} />
            <Route path="/People" element={<Pages.people/>} />
            <Route path="/Hiring" element={<Pages.hiring/>} />
            <Route path="/Salary" element={<Pages.salary/>} />
            <Route path="/Reviews" element={<Pages.review/>} />

      </Routes>
    </Router>
  );
};

export default App;


