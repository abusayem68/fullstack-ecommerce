import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useUpdateMutation,
} from '../../features/product/productApi';
import Navbar from './Navbar';

export default function EditProduct() {
  const [error, setError] = useState('');
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error: responseError,
  } = useGetProductByIdQuery(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const navigate = useNavigate();
  const [update, { isLoading: updating, isSuccess: updateSuccess }] =
    useUpdateMutation();
  useEffect(() => {
    if (product?.id) {
      setTitle(product?.title);
      setDescription(product?.description);
      setPrice(product?.price);
      setDiscountPercentage(product?.discountPercentage);
      setRating(product?.rating);
      setStock(product?.stock);
      setThumbnail(product?.thumbnail);
    }
  }, [product]);
  useEffect(() => {
    if (updateSuccess) {
      navigate('/admin/products');
    }
  }, [updateSuccess, navigate]);

  const resetForm = () => {
    setTitle(product?.title);
    setDescription(product?.description);
    setPrice(product?.price);
    setDiscountPercentage(product?.discountPercentage);
    setRating(product?.rating);
    setStock(product?.stock);
    setThumbnail(product?.thumbnail);
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const updatedRating = parseFloat(rating);
    const updatedDiscountPercentage = parseFloat(discountPercentage);
    if (
      updatedRating < 0 ||
      updatedRating > 5 ||
      updatedDiscountPercentage < 0 ||
      updatedDiscountPercentage > 100
    ) {
      setError(
        'Something went wrong! Rating should be 0 to 5 and Discount Percentage should be 0 to 100'
      );
    } else {
      update({
        id,
        data: {
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          thumbnail,
        },
      });
    }
  };
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>There was an error</div>;
  }
  if (!isLoading && !isError && product?.id) {
    content = (
      <form
        onSubmit={(e) => handleUpdate(e, id)}
        className="bg-white px-10  py-6 shadow-xl rounded-md">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900">
              Edit Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="6"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="price"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    type="text"
                    name="discountPercentage"
                    id="discountPercentage"
                    autoComplete="discountPercentage"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Rating
                </label>
                <div className="mt-2">
                  <input
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    type="text"
                    name="rating"
                    id="rating"
                    autoComplete="rating"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="text"
                    name="stock"
                    id="stock"
                    autoComplete="stock"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    id="thumbnail"
                    name="thumbnail"
                    type="text"
                    autoComplete="thumbnail"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {error !== '' && <div className="text-red-500">{error}</div>}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={resetForm}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900">
              Reset
            </button>
            <button
              disabled={updating}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Update
            </button>
          </div>
        </div>
      </form>
    );
  }
  return (
    <>
      <Navbar />
      {content}
    </>
  );
}
