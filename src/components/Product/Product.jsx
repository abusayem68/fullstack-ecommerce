import { StarIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  return (
    <Link to={'/product-details'}>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{product.title}</h3>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              $
              {Math.round(
                product.price * (1 - product.discountPercentage / 100)
              )}
            </p>
            <p className="text-sm font-medium text-gray-400 line-through">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
