import { Navbar } from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SigninPage from './Pages/SigninPage';
import SignupPage from './Pages/SignupPage';
import { useAuthContext } from './Hooks/useAuthContext';
function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Dashboard/> : <Navigate to='/signin'/>}/>
          <Route path='/signin' element={!user ? <SigninPage/> : <Navigate to='/'/>}/>
          <Route path='/signup' element={!user ? <SignupPage/> : <Navigate to='/'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
