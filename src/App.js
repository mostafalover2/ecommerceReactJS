import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
// import WishList from './Components/WishList/WishList';
import Brands from './Components/Brands/Brands';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Orders from './Components/Orders/Orders';
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Address from './Components/Address/Address';



function App() {

  let routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <Navigate to={'home'} /> },

        { path: 'home', element: <ProtectedRoute><Home /> </ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
        // { path: 'wishlist',element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /> </ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /> </ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
        { path: 'address/:cartId', element: <ProtectedRoute><Address /> </ProtectedRoute> },

        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },

        { path: '*', element: <NotFound /> }
      ]
    }
  ])


  return (
    <>
      <RouterProvider router={routers}>

      </RouterProvider>
    </>
  );
}

export default App;
