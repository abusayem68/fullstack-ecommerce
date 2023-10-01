import Product from './Product';

export default function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
