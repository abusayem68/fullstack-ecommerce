import { RadioGroup } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../../components/ui/Spinner';
import { addToCart } from '../../cart/CartSlice';
import { useGetProductByIdQuery } from '../productApi';

const dummyData = {
  highlights: [
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum dolor sit amet.',
  ],
  details:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, rem! Praesentium, sit ad neque libero fugit ducimus blanditiis numquam sint excepturi, necessitatibus, quo optio sequi recusandae inventore iure harum iusto!',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetails() {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();

  const {
    title,
    rating,
    price,
    images,
    description,
    discountPercentage,
    category,
    brand,
  } = product || {};
  const notify = () =>
    toast.success('Product Added', {
      position: 'bottom-left',
      autoClose: 200,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'dark',
    });
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
    notify();
  };

  let breadcrumbs = null;
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <Spinner />;
  }
  if (!isLoading && isError) {
    content = <div>There was an error</div>;
  }
  if (!isLoading && !isError && product?.id) {
    breadcrumbs = [category, brand];
    content = (
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs &&
              breadcrumbs.map((breadcrumb, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <div className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb}
                    </div>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300">
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
            <li className="text-sm">
              <h1
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600">
                {title}
              </h1>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={images[0]}
              alt={title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={images[1] ? images[1] : images[0]}
                alt={title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={images[2] ? images[2] : images[0]}
                alt={title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={images[3] ? images[3] : images[0]}
              alt={title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            {discountPercentage ? (
              <div>
                <p className="text-3xl tracking-tight text-gray-900 ">
                  ${Math.round(price * (1 - discountPercentage / 100))}
                </p>
                <p className="text-2xl tracking-tight text-gray-400 line-through">
                  ${price}
                </p>
              </div>
            ) : (
              <p className="text-3xl tracking-tight text-gray-900">${price}</p>
            )}
            {/* Reviews */}
            {rating && (
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((el, index) => (
                      <StarIcon
                        key={index}
                        className={`${
                          index + 1 <= rating
                            ? 'text-gray-900'
                            : 'text-gray-200'
                        } 'h-5 w-5 flex-shrink-0'
                      `}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{rating} out of 5 stars</p>
                  <div className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {rating} {rating > 1 ? 'Ratings' : 'Rating'}
                  </div>
                </div>
              </div>
            )}

            <form
              className="mt-10"
              onSubmit={(e) => handleAddToCart(e, product)}>
              {/* Colors */}
              {product?.colors && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4">
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }>
                          <RadioGroup.Label
                            as="span"
                            className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Sizes */}
              {product?.sizes && (
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4">
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }>
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-indigo-500'
                                      : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor">
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add to cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul
                  role="list"
                  className="list-disc space-y-2 pl-4 text-sm">
                  {dummyData.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{dummyData.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="bg-white">{content}</div>;
}
