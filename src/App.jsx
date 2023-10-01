import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './features/auth/components/PrivateRoute';
import PublicRoute from './features/auth/components/PublicRoute';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Signup from './pages/Signup';
import useAuthCheck from './hooks/useAuthCheck';

function App() {
  const authChecked = useAuthCheck();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: 'signup',
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
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
