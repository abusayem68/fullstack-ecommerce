import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutForm from '../components/checkOut/CheckOutForm';
import OrderSummary from '../components/checkOut/OrderSummary';
import Spinner from '../components/ui/Spinner';
import { useConfirmOrderMutation } from '../features/order/orderApi';
import useAuth from '../hooks/useAuth';
import { validateEmail, validatePhoneNumber } from '../utils/utils';
import OrderSuccess from '../components/checkOut/OrderSuccess';

export default function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAdress, setStreetAdress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');

  const auth = useAuth();
  const [email, setEmail] = useState(auth?.email);

  const cart = useSelector((state) => state.cart);
  const { products } = cart || {};

  const [
    confirmOrder,
    { isLoading, isError, isSuccess, error: responseError },
  ] = useConfirmOrderMutation();

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phone === '' ||
      streetAdress === '' ||
      city === '' ||
      region === '' ||
      postalCode === ''
    ) {
      setError('Please fill all input feild');
    } else if (!validateEmail(email)) {
      setError('Please input a valid email');
    } else if (!validatePhoneNumber(phone)) {
      setError('Plese input a valid phone number');
    } else {
      confirmOrder({
        deliveryAdressInfo: {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          adress: `${streetAdress}, ${city}, ${region}, ${postalCode}`,
        },
        cart,
      });
    }
  };

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  }
  if (!isLoading && !isError && isSuccess) {
    content = <OrderSuccess />;
  }
  if (!isLoading && !isError && !isSuccess) {
    content = (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:pb-12">
        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
            <div className="lg:col-span-3">
              <CheckOutForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                streetAdress={streetAdress}
                setStreetAdress={setStreetAdress}
                city={city}
                setCity={setCity}
                region={region}
                setRegion={setRegion}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                error={error}
              />
            </div>
            <div className="lg:col-span-3">
              <OrderSummary handleConfirmOrder={handleConfirmOrder} />
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

  return <>{content}</>;
}
