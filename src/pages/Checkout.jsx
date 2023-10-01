import { useSelector } from 'react-redux';
import CheckOutForm from '../components/checkOut/CheckOutForm';
import OrderSummary from '../components/checkOut/OrderSummary';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const { products } = cart || {};
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      {products.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CheckOutForm />
          </div>
          <div className="lg:col-span-2">
            <OrderSummary />
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex flex-col bg-white shadow-xl rounded-md">
            <div className=" px-4 py-6 sm:px-6">
              <div className="flex items-start justify-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Your Cart is Empty!
                </h2>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-center text-center text-sm text-gray-500">
                <p>
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
      )}
    </div>
  );
}
