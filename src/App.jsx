import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./main_pages/SignIn"
import SignUp from "./main_pages/SignUp"
import Drawer  from "./main_pages/Drawer";
import VisitorsLog from './drawer_pages/VisitorsLog';
import Student from './drawer_pages/Student';
import Rooms from './drawer_pages/Rooms';
import Payment from './drawer_pages/Payment';
import Notification from './drawer_pages/Notification';
import Dashboard from './drawer_pages/Dashboard';
import Complain from './drawer_pages/Complain';

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/drawer" element={<Drawer/>} />
        <Route path="/complain" element={<Complain/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/rooms" element={<Rooms/>} />
        <Route path="/students" element={<Student/>} />
        <Route path="/visitors" element={<VisitorsLog/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
