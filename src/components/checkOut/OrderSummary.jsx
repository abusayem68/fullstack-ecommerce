import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../features/cart/CartSlice';

export default function OrderSummary() {
  const cart = useSelector((state) => state.cart);
  const { products } = cart;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const subTotal = products?.reduce((total, product) => {
    return (total +=
      Math.round(product?.price * (1 - product?.discountPercentage / 100)) *
      product?.quantity);
  }, 0);
  return (
    <div className="flex flex-col bg-white shadow-xl rounded-md">
      <div className=" px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul
              role="list"
              className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
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
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Qty{' '}
                        <select
                          className="ms-2 border rounded py-[6px] px-3"
                          name="quantity"
                          id="quantity">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </p>

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
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${subTotal}</p>
        </div>
        <div className="flex justify-between text-lg font-medium text-gray-900 mt-6">
          <p>Total</p>
          <p>${subTotal}</p>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Confirm order
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
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
  );
}
