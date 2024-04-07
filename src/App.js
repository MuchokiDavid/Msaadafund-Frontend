import './App.css';
import Campaigns from './pages/Campaigns';
import { Route, Routes } from 'react-router-dom';
import CampainDetails from './pages/CampainDetails';
import Home from './pages/Home';
import Login from './components/user-auth/Login';
import Register from './components/user-auth/Register';
import Reset from './components/user-auth/Reset';
import OrgLogIn from './components/org-auth/OrgLogIn';
import ContactUs from './pages/ContactUs';
import OrgSignUp from './components/org-auth/OrgSignUp';
import UserLayout from './components/user-dashboard/UserLayout';
import OrgLayout from './components/org-dashboard/OrgLayout';
import ResetPass from './components/org-auth/ResetPass';
import AboutUs from './pages/AboutUs';



function App() {
  return (
 
    <Routes>
    <Route path = '/' element= {<Home/>}/>
    <Route path='/campaign' element={<Campaigns/>}/>
    <Route path={`campaign/:campaignId`} element={<CampainDetails/>} /> 
    <Route path = '/user/login' element = {<Login/>}/>
    <Route path = '/user/signup' element = {<Register/>}/>
    <Route path = '/user/reset' element = {<Reset/>}/>
    <Route path = '/org/reset' element = {<ResetPass/>}/>
    <Route path = '/org/login' element = {<OrgLogIn/>}/>
    <Route path = '/org/signup' element = {<OrgSignUp/>}/>
    <Route path = '/contact' element = {<ContactUs/>}/>
    <Route path = '/about' element = {<AboutUs/>}/>
    <Route path = '/user/dashboard/*' element = {<UserLayout/>}/>
    <Route path = '/org/dashboard/*' element = {<OrgLayout/>}/>
    
    </Routes>
   

// <Route path = '/' element = {<Login />} />
// <Route path='/signup' element={<Register/>}></Route>
// <Route path='/resetpassword' element={<ResetPassword/>}></Route>
// <Route path='/dashboard/*' element={<DashboardLayout/>}></Route>
// <Route path='/verify' element={<EmailForm/>}></Route>
  );
}

export default App;
