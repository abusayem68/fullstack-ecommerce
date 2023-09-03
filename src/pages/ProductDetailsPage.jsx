import Navbar from '../components/Navbar/Navbar';
import ProductDetails from '../components/ProductDetails/ProductDetails';

export default function ProductDetailsPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <ProductDetails />
        </div>
      </main>
    </>
  );
}
