import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const loggedIn = useAuth();
  return loggedIn ? (
    children
  ) : (
    <Navigate
      to={'/login'}
      replace
      state={{ from: location }}
    />
  );
}
