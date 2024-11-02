import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import History from './pages/History';
import Friends from './pages/Friends';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/history" element={<History />} /> 
      <Route path="/friends" element={<Friends />} /> 
    </Routes>
  );
}

export default App;
