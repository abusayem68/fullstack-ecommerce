import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../features/cart/CartSlice';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const { products } = cart || {};
  const dispatch = useDispatch();
  const subTotal = products.reduce((total, product) => {
    return (total +=
      Math.round(product.price * (1 - product.discountPercentage / 100)) *
      product.quantity);
  }, 0);
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };
  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(decrementQuantity(id));
    }
  };

  // decide what to render
  let content = null;
  if (products.length > 0) {
    content = products.map((product) => (
      <li
        key={product.id}
        className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href={product.href}>{product.title}</a>
              </h3>
              <p className="ml-4">
                $
                {Math.round(
                  product.price * (1 - product.discountPercentage / 100)
                ) * product.quantity}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <label
                className="me-4"
                htmlFor="quantity">
                Qty
              </label>
              <div className="flex items-center gap-1">
                <span
                  onClick={() => handleDecrement(product.id, product.quantity)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-black cursor-pointer">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </span>
                <div
                  className="border text-base rounded py-[6px] w-16 text-center"
                  id="quantity">
                  {product.quantity}
                </div>
                <span onClick={() => handleIncrement(product.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-black cursor-pointer">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500">
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    ));
  } else {
    content = <div>Your cart is empty!</div>;
  }
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col bg-white">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <h1 className="border-b pb-6 text-center text-4xl font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h1>
            <div className="mt-8">
              <div className="flow-root">
                <ul
                  role="list"
                  className="-my-6 divide-y divide-gray-200">
                  {content}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            {products.length > 0 && (
              <>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subTotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to={'/checkout'}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Checkout
                  </Link>
                </div>
              </>
            )}
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                {products.length > 0 && 'or'}
                <Link to={'/'}>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
