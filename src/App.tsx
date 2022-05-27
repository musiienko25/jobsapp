import PageInfo from './components/PageInfo'
import './App.css';

import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PageInfo />} />
      </Routes>
    </Router>
  );
}

export default App;


