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
import Careers from './pages/Careers';
import Unauthorized from './components/reusables/Unauthorized';
import Policy from './pages/Policy';
import Terms from './pages/Terms';
import ThankYou from './components/reusables/ThankYou';
import Organisation from './pages/Organisation';
import NotFound from './components/reusables/NotFound';
import OrganisationDetails from './pages/OrganisationDetails';
import Faq from './components/reusables/Faq';
// import Maintenance from './components/reusables/Maintenance';
import Message from './components/services/Message';

function App() {
  return (
 <div className='text-black text-sm lg:text-md' >
    <Routes>
    <Route path = '/' element= {<Home/>}/>
    {/* <Route path = '/' element= {<Maintenance/>}/> */}
    <Route path='/campaigns' element={<Campaigns/>}/>
    <Route path={`campaigns/:campaignId`} element={<CampainDetails/>} /> 
    <Route path = '/user/login' element = {<Login/>}/>
    <Route path = '/user/signup' element = {<Register/>}/>
    <Route path = '/user/reset' element = {<Reset/>}/>
    <Route path = '/org/reset' element = {<ResetPass/>}/>
    <Route path = '/org/login' element = {<OrgLogIn/>}/>
    <Route path = '/org/signup' element = {<OrgSignUp/>}/>
    <Route path = '/contact' element = {<ContactUs/>}/>
    <Route path = '/about' element = {<AboutUs/>}/>
    <Route path = '/message' element = {<Message/>}/>
    <Route path = '/faq' element = {<Faq/>}/>
    <Route path = '/careers' element = {<Careers/>}/>
    <Route path = '/user/dashboard/*' element = {<UserLayout/>}/>
    <Route path = '/org/dashboard/*' element = {<OrgLayout/>}/>
    <Route path = '/privacy' element = {<Policy/>}/>
    <Route path = '/terms' element = {<Terms/>}/>
    <Route path = "/unauthorized" element = {<Unauthorized/>}/>
    <Route path = "/thank-you" element = {<ThankYou/>}/>
    <Route path = "/organisations" element = {<Organisation/>}/>
    <Route path={"/organisations/:orgid" } element={<OrganisationDetails/>} />
    {/* not found route */}
    <Route path='*' element = {<NotFound/>}/>
    </Routes>
    </div>
     );
}

export default App;
