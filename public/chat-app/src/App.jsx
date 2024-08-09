import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/register.jsx"
import Chat from "./pages/chat.jsx"
import Login from "./pages/login.jsx"

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register"  element={<Register/>}></Route>
      <Route path="/login"  element={<Chat/>}></Route>
      <Route path="/"  element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
