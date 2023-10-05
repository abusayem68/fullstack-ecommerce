import { StarIcon } from '@heroicons/react/20/solid';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../cart/CartSlice';

export default function Product({ product }) {
  const { id, thumbnail, title, price, rating, discountPercentage } =
    product || {};
  const dispatch = useDispatch();
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
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    notify();
  };
  return (
    <>
      <div className="relative flex flex-col justify-between">
        <Link to={`/products/${id}`}>
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
              {Array.from({ length: 5 }).map((el, index) => (
                <StarIcon
                  key={index}
                  className={`${
                    index + 1 <= rating ? 'text-yellow-500' : 'text-gray-200'
                  } 'h-5 w-5 flex-shrink-0'
                      `}
                  aria-hidden="true"
                />
              ))}
              <p className="mt-1 text-sm text-gray-500">{rating}</p>
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
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add to cart
        </button>
      </div>
    </>
  );
}
