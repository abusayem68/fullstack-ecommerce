import Navbar from '../components/Navbar/Navbar';
import ProductList from '../components/ProductList/ProductList';

export default function Home() {
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
    </>
  );
}
