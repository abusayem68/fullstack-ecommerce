import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Bounce, Flip, Slide, ToastContainer, Zoom } from 'react-toastify';
import AddProduct from './components/admin/AddProduct';
import EditProduct from './components/admin/EditProduct';
import AdminLogin from './components/admin/Login';
import ProductList from './components/admin/ProductList';
import AdminRoute from './features/auth/components/AdminRoute';
import PrivateRoute from './features/auth/components/PrivateRoute';
import PublicRoute from './features/auth/components/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/userLayout';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Signup from './pages/Signup';

function App() {
  const authChecked = useAuthCheck();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },

        {
          path: 'cart',
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
      ],
    },
    {
      path: '/login',
      errorElement: <NotFound />,
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: 'signup',
      errorElement: <NotFound />,
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          path: 'dashboard',
          element: (
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          ),
        },
        {
          path: 'edit-product/:id',
          element: (
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          ),
        },
        {
          path: 'products/add',
          element: (
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: '/admin/login',
      element: <AdminLogin />,
      errorElement: <NotFound />,
    },
  ]);

  return !authChecked ? (
    <div>Checking Authentication...</div>
  ) : (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={300}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Flip}
        closeButton={false}
      />
    </>
  );
}

export default App;
