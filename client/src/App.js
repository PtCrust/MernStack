import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

// pages and components
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Update from './Pages/Update';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to={'/login'} />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to={'/'}/>} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to={'/'}/>} />
            <Route path="/update/:id" element={user ? <Update /> : <Navigate to={'/login'}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
