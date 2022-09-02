import './App.css';
import { Routes,Route } from "react-router-dom";
import PrimeReact from 'primereact/api';


import DashBoard from './pages/dashboard';
import Register from './pages/register';
import Login from './pages/login';
import ProtectedRoutes from './components/auth';
import ExpenseDetails from './pages/detail';
import Profile from './pages/profile';



function App() {
  PrimeReact.ripple = true;

  return (
    <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />

    <Route element={<ProtectedRoutes/>}>
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/" element={<ExpenseDetails></ExpenseDetails>} />
      <Route path="/profile" element={<Profile></Profile>} />


    </Route>
    
  </Routes>  
  );
}

export default App;

