import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDeleleModal from '../ui/ConfirmDeleleModal';

export default function ProductCard({ product }) {
  const { id, thumbnail, title, price, rating, stock, discountPercentage } =
    product || {};
  const [open, setOpen] = useState(false);

  const handleDeleteProduct = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="relative flex flex-col justify-between">
        <Link to={`/admin/edit-product/${id}`}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
        </Link>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{title}</h3>
            <div className="flex items-center gap-2">
              <p className="mt-1 text-sm text-gray-500">Ratings: {rating}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="mt-1 text-sm text-gray-500">Stock: {stock}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              ${Math.round(price * (1 - discountPercentage / 100))}
            </p>
            <p className="text-sm font-medium text-gray-400 line-through">
              ${price}
            </p>
          </div>
        </div>
        <div className="w-full mt-4 flex gap-1 justify-between items-center">
          <Link to={`/admin/edit-product/${id}`}>
            <button className="px-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="me-4">Edit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </Link>
          <button
            onClick={handleDeleteProduct}
            className="px-4 flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            <span className="me-4">Delete</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <ConfirmDeleleModal
            open={open}
            setOpen={setOpen}
            id={id}
          />
        </div>
      </div>
    </>
  );
}
