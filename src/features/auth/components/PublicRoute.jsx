import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export default function PublicRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  let pathname = '/';
  if (location?.state?.from) {
    pathname = location?.state?.from?.pathname;
  }
  return auth && auth?.role === 'user' ? <Navigate to={pathname} /> : children;
}
