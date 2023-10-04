import { Outlet } from 'react-router-dom';
import Navbar from '../components/admin/Navbar';

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
