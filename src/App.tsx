import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Profile from "./pages/Profile";
import PostDetailed from "./pages/PostDetailed"
import ProtectorRuta from "./components/ProtectorRuta";
import ModalRedireccion from "./components/ModalRedireccion";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <ModalRedireccion />
      <Toaster position="top-right"  />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={
          <ProtectorRuta>
            <HomePage/>
          </ProtectorRuta>
          }
          />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={
          <ProtectorRuta>
          <Profile />
          </ProtectorRuta>
          } />
        <Route path="/post/:id" element={<PostDetailed />} />
        <Route path="*" element={<Navigate to="/home"/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
