import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export default function AdminRoute({ children }) {
  const auth = useAuth();
  return auth && auth?.role === 'admin' ? (
    children
  ) : (
    <Navigate to={'/admin/login'} />
  );
}
