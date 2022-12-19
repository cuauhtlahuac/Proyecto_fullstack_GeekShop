import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { type LoaderFunction, redirect, type ActionFunction } from '@remix-run/node';
import NavBar from '~/components/NavBar';
import { type ShirtType } from './shirts';
import CartProduct from '../components/CartProduct';
import { cart } from "~/cookies";

interface LoaderData {
  items: ShirtType[];
  subtotal: number;
  totalItems: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const cartSession = await cart.getSession(
    request.headers.get("Cookie")
  );
  let items: any = [];
  if (cartSession.has('cart')) {
    const cartValues = cartSession.get('cart');

    for (let i = 0; i < cartValues.length; i++) {
      const cartItems = JSON.parse(cartValues[i]);
      const calculatePrice = Number(cartItems.price.replace(/[^0-9.-]+/g, '')) * cartItems.quantity;
      const obj = { ...cartItems, totalPrice: `$${calculatePrice}` };
      items.push(obj);
    }
  }

  const subtotal = items.reduce((acc: number, item: ShirtType) => {
    const itemPrice = item.price.replace(/[^0-9.-]+/g, '');
    return acc + (Number(itemPrice) * (item?.quantity || 1));
  }, 0);

  const totalItems = items.reduce((acc: number, item: ShirtType) => {
    return acc + (Number(item?.quantity) || 1);
  }, 0);

  return { items, subtotal, totalItems };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { data, intent }: any = Object.fromEntries(formData);
  const cartSession = await cart.getSession(
    request.headers.get("Cookie")
  );
  let items: any = [];
  const parsedProduct = JSON.parse(data);
  if (cartSession.has('cart')) {
    const cartItems = cartSession.get('cart');
    const target = parsedProduct["id"];

    if (intent === 'delete') {
      const newCart = cartItems.filter((item: string) => {
        const currentItem = JSON.parse(item);
        return currentItem.id !== target;
      });
      cartSession.set('cart', newCart);
    }
    if (intent === 'update') {
      items = cartItems.map((item: string) => {
        const currentItem = JSON.parse(item);
        if (currentItem.id === target) {
          return JSON.stringify(parsedProduct);
        }
        return item;
      });
      cartSession.set('cart', items);
    }
  }

  const value = await cart.commitSession(cartSession);
  return redirect('/cart', {
    headers: {
      'Set-Cookie': value,
    },
  });
};

export default function Cart() {
  const { items, subtotal, totalItems } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const handleOnChange = ({ event, product }: any) => {
    const quantity = event?.target?.value;
    if (Number(quantity) === 0) return;
    fetcher.submit(
      {
        intent: 'update',
        data: JSON.stringify({ ...product, quantity }),
      },
      { method: 'post' }
    );
  };

  const onDelete = (product: ShirtType) => {
    fetcher.submit(
      {
        intent: 'delete',
        data: JSON.stringify(product),
      },
      { method: 'post' }
    );
  };

  return (
    <>
      <NavBar badgeNumber={totalItems} />
      <section className='py-40 max-w-5xl mx-auto px-6 '>
        <h1 className='text-6xl font-bold mb-12 '>Shopping Cart</h1>
        <table className=''>
          <tr className='border-b border-b-gray-300'>
            <th>Producto</th>
            <th>Detalle</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>

          {items.map((item) => (
            <CartProduct
              product={item}
              key={item.id}
              onChange={handleOnChange}
              onDelete={onDelete}
            />
          ))}
        </table>
        <article className='flex flex-col items-end'>
          <div className='flex items-end gap-2 mb-4'>
            <h2 className='font-bold text-2xl'>Subtotal</h2>
            <span>${subtotal}</span>
          </div>
          <p className='text-lg mb-4'>
            El envío y los impuestos se calculan al pagar
          </p>
          <div>
            <Link to=''>
              <button className='bg-green-500 text-white font-semibold tracking-wide text-lg py-3 px-4 rounded border-4 border-transparent hover:border-green-500 hover:bg-green-600 transition-all'>
                Proceder al pago
              </button>
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
