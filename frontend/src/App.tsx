import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Conversation from "./pages/Conversation"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Conversation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
