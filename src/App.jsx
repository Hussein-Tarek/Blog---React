import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import { AuthProvider } from "./Context/AuthContext";
import AddPost from "./pages/addPost";
import PostDetails from "./pages/PostDetails";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/add" element={<AddPost />}></Route>
            </Route>
            <Route path="/post/:id" element={<PostDetails />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {/* <Footer /> */}
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
