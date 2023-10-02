import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLogin from './components/admin/Login';
import AdminRoute from './features/auth/components/AdminRoute';
import PrivateRoute from './features/auth/components/PrivateRoute';
import PublicRoute from './features/auth/components/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Signup from './pages/Signup';
import ProductList from './components/admin/ProductList';
import EditProduct from './components/admin/EditProduct';
import AddProduct from './components/admin/AddProduct';

function App() {
  const authChecked = useAuthCheck();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: '/signup',
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: '/cart',
      element: <Cart />,
    },
    {
      path: 'checkout',
      element: (
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      ),
    },
    {
      path: 'products/:productId',
      element: <ProductDetailsPage />,
    },
    {
      path: '/admin/login',
      element: <AdminLogin />,
    },
    {
      path: '/admin/dashboard',
      element: (
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      ),
    },
    {
      path: '/admin/products',
      element: (
        <AdminRoute>
          <ProductList />
        </AdminRoute>
      ),
    },
    {
      path: '/admin/edit-product/:id',
      element: (
        <AdminRoute>
          <EditProduct />
        </AdminRoute>
      ),
    },
    {
      path: '/admin/products/add',
      element: (
        <AdminRoute>
          <AddProduct />
        </AdminRoute>
      ),
    },
  ]);

  return !authChecked ? (
    <div>Checking Authentication...</div>
  ) : (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
