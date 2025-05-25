import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
