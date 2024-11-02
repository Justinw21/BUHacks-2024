import { Route, Routes,  } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import History from './pages/History';
import Friends from './pages/Friends';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/history" element={<History />} /> 
      <Route path="/friends" element={<Friends />} /> 
      <Route path="/signin" element={<SignIn/>} />
      <Route path = "/signup" element={<SignUp/>} /> 
    </Routes>
  );
}

export default App;