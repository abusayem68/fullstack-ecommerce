import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAddProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from '../../features/product/productApi';
import Navbar from './Navbar';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState({
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
  });
  const [error, setError] = useState('');

  const [
    addProduct,
    { data, isLoading, isError, error: responseError, isSuccess },
  ] = useAddProductMutation();
  const { data: brands } = useGetBrandsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const navigate = useNavigate();

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBrand('');
    setCategory('');
    setPrice('');
    setDiscountPercentage('');
    setRating('');
    setStock('');
    setThumbnail('');
    setImages({
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
    });
    setError('');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const updatedPrice = parseFloat(price);
    const updatedStock = parseInt(stock);
    const updatedRating = parseFloat(rating);
    const updatedDiscountPercentage = parseFloat(discountPercentage);
    const imagesArr = [];
    for (const key in images) {
      if (images[key] !== '') {
        imagesArr.push(images[key]);
      }
    }
    if (
      isNaN(updatedPrice) ||
      isNaN(updatedDiscountPercentage) ||
      isNaN(updatedRating) ||
      isNaN(updatedStock)
    ) {
      setError(
        'Something went wrong! Price, Discount Percentage, Rating, Stock should be number'
      );
    } else if (
      updatedRating < 0 ||
      updatedRating > 5 ||
      updatedDiscountPercentage < 0 ||
      updatedDiscountPercentage > 100 ||
      updatedStock <= 0
    ) {
      setError(
        'Something went wrong! Rating should be 0 to 5 and Discount Percentage should be 0 to 100 and stock should be greater than 0'
      );
    } else {
      addProduct({
        title,
        description,
        price: updatedPrice,
        discountPercentage: updatedDiscountPercentage,
        rating: updatedRating,
        stock: updatedStock,
        thumbnail,
        images: imagesArr,
      });
    }
  };
  useEffect(() => {
    if (responseError?.data) {
      setError(responseError?.data);
    }
    if (data?.id) {
      navigate('/admin/products');
    }
  }, [data, responseError, navigate]);
  return (
    <>
      <form
        onSubmit={(e) => handleAddProduct(e)}
        className="bg-white px-10  py-6 shadow-xl rounded-md">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900">
              Add New Product
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
                    required
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
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    id="brand"
                    name="brand"
                    autoComplete="brand-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    {brands?.length > 0 &&
                      brands.map((brand, idx) => (
                        <option
                          key={idx}
                          value={brand.value}>
                          {brand.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
                <div className="mt-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    {}
                    {categories?.length > 0 &&
                      categories.map((category, idx) => (
                        <option
                          key={idx}
                          value={category.value}>
                          {category.label}
                        </option>
                      ))}
                  </select>
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                    id="thumbnail"
                    name="thumbnail"
                    type="text"
                    autoComplete="thumbnail"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full block text-sm font-medium leading-6 text-gray-900">
                Images
              </div>
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    value={images.img1}
                    onChange={(e) =>
                      setImages({ ...images, img1: e.target.value })
                    }
                    name="image-1"
                    type="text"
                    autoComplete="thumbnail"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    value={images.img2}
                    onChange={(e) =>
                      setImages({ ...images, img2: e.target.value })
                    }
                    name="image-2"
                    type="text"
                    autoComplete="thumbnail"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    value={images.img3}
                    onChange={(e) =>
                      setImages({ ...images, img3: e.target.value })
                    }
                    name="image-3"
                    type="text"
                    autoComplete="thumbnail"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    value={images.img4}
                    onChange={(e) =>
                      setImages({ ...images, img4: e.target.value })
                    }
                    name="image-4"
                    type="text"
                    autoComplete="thumbnail"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    value={images.img5}
                    onChange={(e) =>
                      setImages({ ...images, img5: e.target.value })
                    }
                    name="image-5"
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
              disabled={isLoading}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
