import {  Route, Routes } from "react-router-dom";
import {
  Brands,
  Categories,
  Dashboard,
  Firms,
  Login,
  Register,
  Sales,
  Products,
  Profile,
  Purchases,
} from "./pages";
import Layout from "./components/Layout/Layout";
import PrivateRouter from "./PrivateRouter";


const App = () => {

  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stock" element={<PrivateRouter />}>
          <Route path="/stock" element={<Layout />}>
            <Route  path="dashboard" element={<Dashboard />} /> {/* Use index for default route */}
            <Route path="brands" element={<Brands />} />
            <Route path="firms" element={<Firms />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
            <Route path="categories" element={<Categories />} />
            <Route path="profile" element={<Profile />} />
            <Route path="purchases" element={<Purchases />} />
          </Route>
        </Route>
      </Routes>
    
  );
};

export default App;