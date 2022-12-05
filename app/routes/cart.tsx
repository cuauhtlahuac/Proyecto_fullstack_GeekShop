import { Link, useLoaderData } from '@remix-run/react';
import NavBar from '~/components/NavBar';
import { type ShirtType } from './shirts';
import CartProduct from '../components/CartProduct';

interface LoaderData {
  items: ShirtType[];
}
export const loader: LoaderFunction = async () => {
  const items = [
    {
      id: 3,
      title: 'Invertocat Pride Tee',
      price: '$30.00',
      img: 'https://cdn.shopify.com/s/files/1/0051/4802/products/Webshop_TShirt_Pride2022_VintageBlack_Pride_600x600_crop_center.png?v=1653680303',
    },
  ];
  return { items };
};
export default function Cart() {
  const { items } = useLoaderData<LoaderData>();
  return (
    <>
      <NavBar />
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
            <CartProduct product={item} key={item.id} />
          ))}
        </table>
        <article className='flex flex-col items-end'>
          <div className='flex items-end gap-2 mb-4'>
            <h2 className='font-bold text-2xl'>Subtotal</h2>
            <span>$30.00</span>
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
