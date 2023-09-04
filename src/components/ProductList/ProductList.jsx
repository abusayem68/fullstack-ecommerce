import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../features/productList/productListApi';
import { updateSortType } from '../../features/sorting/sortingSlice';
import Filter from '../Filter/Filter';
import FilterMobile from '../Filter/FilterMobile';
import Pagination from '../Pagination/Pagination';
import Product from '../Product/Product';

const initialSortOptions = [
  { name: 'Default', value: 'default', current: true },
  { name: 'Best Rating', value: 'best-rating', current: false },
  { name: 'Price: Low to High', value: 'price-low-to-high', current: false },
  { name: 'Price: High to Low', value: 'price-high-to-low', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const ProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [reFetch, setReFetch] = useState(true);
  const [sortOptions, setSortOptions] = useState(initialSortOptions);

  const filteredBy = useSelector((state) => state.filter);
  const { sortType } = useSelector((state) => state.sorting);
  const dispatch = useDispatch();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(filteredBy, { skip: reFetch });

  useEffect(() => {
    setReFetch(false);
  }, [filteredBy]);

  useEffect(() => {
    const updatedSortOptions = initialSortOptions.map((option) => {
      if (option.value === sortType) {
        return {
          ...option,
          current: true,
        };
      }
      return {
        ...option,
        current: false,
      };
    });
    setSortOptions(updatedSortOptions);
  }, [sortType]);

  const handleSort = (value) => {
    dispatch(updateSortType(value));
  };

  const sortedProducts = (products) => {
    if (sortType === 'best-rating') {
      const sortedArray = [...products].sort((a, b) => b.rating - a.rating);
      return sortedArray;
    }
    if (sortType === 'price-low-to-high') {
      const sortedArray = [...products].sort((a, b) => a.price - b.price);
      return sortedArray;
    }
    if (sortType === 'price-high-to-low') {
      const sortedArray = [...products].sort((a, b) => b.price - a.price);
      return sortedArray;
    }
    return products;
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>Error to loading products</div>;
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <div>No product found</div>;
  }
  if (!isLoading && !isError && products?.length > 0) {
    content = (
      <div className="lg:col-span-3">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {sortedProducts(products).map((product) => (
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

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root
            show={mobileFiltersOpen}
            as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full">
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}>
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {/* Filters */}
                    <FilterMobile />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All products
              </h1>
              <div className="flex items-center">
                <Menu
                  as="div"
                  className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <li
                                onClick={() => handleSort(option.value)}
                                className={classNames(
                                  option.current
                                    ? 'font-medium text-gray-900 cursor-pointer'
                                    : 'text-gray-500 cursor-pointer',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}>
                                {option.name}
                              </li>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}>
                  <span className="sr-only">Filters</span>
                  <FunnelIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <section
              aria-labelledby="products-heading"
              className="pb-24 pt-6">
              <h2
                id="products-heading"
                className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <Filter />
                {/* Product grid */}
                {content}
              </div>
            </section>
            <Pagination />
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductList;
