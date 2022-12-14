import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { Fragment, useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {!user ?
        <>
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />}/>
          </Routes>
        </> 
        :
        <Fragment>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<User />} />
              <Route path="/newuser" element={<NewUser />} />
              <Route exact path="/movies" element={<ProductList />} />
              <Route path="/movies/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/list" element={<ListList />} />
              <Route path="/list/:productId" element={<List />} />
              <Route path="/newlist" element={<NewList />} />
            </Routes>
            
      </div>
        </Fragment>
        }
    </BrowserRouter>
  );
}

export default App;
