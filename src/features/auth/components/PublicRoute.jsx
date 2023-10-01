import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export default function PublicRoute({ children }) {
  const loggedIn = useAuth();
  const location = useLocation();

  let pathname = '/';
  if (location?.state?.from) {
    pathname = location?.state?.from?.pathname;
  }
  if (loggedIn && pathname) {
    return <Navigate to={pathname} />;
  }

  return children;
}
