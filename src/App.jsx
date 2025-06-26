import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./main_pages/SignIn";
import SignUp from "./main_pages/SignUp";
import DrawerLayout from "./main_pages/Drawer"; // Rename for clarity
import VisitorsLog from './drawer_pages/VisitorsLog';
import Student from './drawer_pages/Student';
import Rooms from './drawer_pages/Rooms';
import Payment from './drawer_pages/Payment';

import Dashboard from './drawer_pages/Dashboard';
import Complain from './drawer_pages/Complain';
import Admin from './drawer_pages/Admin';
import Warden from './drawer_pages/Warden';
import Users from './drawer_pages/Users';
import Security from './drawer_pages/Security';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Nested route layout for Drawer pages */}
        <Route path="/drawer/*" element={<DrawerLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="complain" element={<Complain />} />
          <Route path="payment" element={<Payment />} />
          <Route path="students" element={<Student />} />
          <Route path="visitors" element={<VisitorsLog />} />
          <Route path="admin" element={<Admin />} />
          <Route path="warden" element={<Warden />} />
          <Route path="users" element={<Users />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
