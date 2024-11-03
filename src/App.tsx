import { Route, Routes,  } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import History from './pages/History';
import Friends from './pages/Friends';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { AuthProvider } from './context/UserContext';




function App() {
  return (

    <AuthProvider>
    <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/history" element={<History />} /> 
      <Route path="/friends" element={<Friends />} />  
    </Routes>

    </AuthProvider>

  );
}

export default App;