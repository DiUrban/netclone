import Home from "./pages/home/Home"
import './app.scss'
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";import { AuthContext } from "./authContext/AuthContext";
import { useContext } from "react";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
           {!user ?
        <>
          <Routes>
            <Route path="/secret_register" element={<Register/>}/>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />}/>
          </Routes>
        </> 
        :   
        <>
          <Routes>
            <Route  path="/movies" element={<Home type="movies" />}/>
            <Route  path="/series" element={<Home type="series" />}/>
            <Route path="/watch" element={<Watch/>}/>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </>
        }      
    </BrowserRouter>
  );
};

export default App;