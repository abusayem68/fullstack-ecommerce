import React, { useState } from 'react';
import { useGetAllProductsQuery } from '../../features/product/productApi';
import Navbar from './Navbar';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [error, setError] = useState('');
  const {
    data: products,
    isLoading,
    isError,
    error: responseError,
  } = useGetAllProductsQuery();

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>{responseError?.data}</div>;
  }
  if (!isLoading && !isError && products.length === 0) {
    content = <div>No products found!</div>;
  }
  if (!isLoading && !isError && products.length > 0) {
    content = products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ));
  }
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="lg:col-span-4">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 py-12">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
