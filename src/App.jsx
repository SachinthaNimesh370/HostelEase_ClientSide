import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Drawer  from "./pages/Drawer";

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/drawer" element={<Drawer/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
