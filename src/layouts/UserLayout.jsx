import { Outlet } from 'react-router-dom';
import Navbar from '../features/common/Navbar';

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
