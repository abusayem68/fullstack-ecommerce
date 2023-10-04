import ProductList from '../features/product/components/ProductList';

export default function Home() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <ProductList />
        </div>
      </main>
    </>
  );
}
