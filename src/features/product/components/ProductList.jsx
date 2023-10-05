import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';
import { PRODUCTS_PER_PAGE } from '../../../app/constant';
import SkeletonProduct from '../../../components/ui/SkeletonProduct';
import Pagination from '../../common/Pagination';
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetProductsByFiltersQuery,
} from '../productApi';
import DesktopFilter from './DesktopFilter';
import MobileFilter from './MobileFilter';
import ProductGrid from './ProductGrid';

const sortOptions = [
  { name: 'Default', sort: '', order: '', current: true },
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  {
    name: 'Price: Low to High',
    sort: 'price',
    order: 'asc',
    current: false,
  },
  {
    name: 'Price: High to Low',
    sort: 'price',
    order: 'desc',
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function ProductList() {
  const [fetchProducts, setFetchProducts] = useState(true);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({ _sort: '', _order: '' });
  const [page, setPage] = useState(1);
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsByFiltersQuery(
    { filter, sort, pagination: { _page: page, _limit: PRODUCTS_PER_PAGE } },
    { skip: fetchProducts }
  );
  const { data: categories } = useGetCategoriesQuery({ skip: true });
  const { data: brands } = useGetBrandsQuery({ skip: true });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { products, totalCount } = productsData || {};

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories || [],
    },
    {
      id: 'brand',
      name: 'Brands',
      options: brands || [],
    },
  ];

  const handleFilter = (e, section, option) => {
    let newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id] = [...newFilter[section.id], option.value];
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id] = newFilter[section.id].filter(
        (_, i) => i !== index
      );
    }

    setFilter({ ...newFilter });
  };

  const handleSort = (e, option) => {
    const updatedSort = { _sort: option.sort, _order: option.order };
    setSort(updatedSort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [totalCount, filter, sort]);

  useEffect(() => {
    setFetchProducts(false);
  }, [filter, sort, page]);

  //   decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="lg:col-span-3">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <div>Error! to load data</div>;
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <div>No product found!</div>;
  }
  if (!isLoading && !isError && products?.length > 0) {
    content = <ProductGrid products={products} />;
  }

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleFilter={handleFilter}
            filters={filters}
          />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6 lg:pt-12">
              <h1 className="text-lg md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
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
                                onClick={(e) => handleSort(e, option)}
                                className={classNames(
                                  sort?._sort === option.sort &&
                                    sort?._order === option.order
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
              className="pb-10 lg:pb-16 pt-6">
              <h2
                id="products-heading"
                className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilter
                  handleFilter={handleFilter}
                  filters={filters}
                />
                {/* Product grid */}
                {content}
              </div>
            </section>
            {!isLoading && (
              <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalCount}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
