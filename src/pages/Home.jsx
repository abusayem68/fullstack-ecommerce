import Navbar from '../features/common/Navbar';
import ProductList from '../features/product/components/ProductList';

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <ProductList />
        </div>
      </main>
    </>
  );
}
