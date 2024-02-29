import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Conversation from "./pages/Conversation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/:id" element={user ? <Conversation /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
