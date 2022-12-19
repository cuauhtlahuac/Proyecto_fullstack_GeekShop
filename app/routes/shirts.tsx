import { type LoaderFunction, redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import type { ActionFunction } from '@remix-run/node';

import NavBar from '~/components/NavBar';
import { cart } from "~/cookies";
import ProductCard from '~/components/ProductCard';

export interface ShirtType {
  title: string;
  price: string;
  img: string;
  id: number;
  quantity?: number;
  totalPrice?: string;
}
interface LoaderData {
  shirts: ShirtType[];
}
export const loader: LoaderFunction = async () => {
  const shirts = [
    {
      id: 3,
      title: 'Invertocat Pride Tee',
      price: '$30.00',
      img: 'https://cdn.shopify.com/s/files/1/0051/4802/products/Webshop_TShirt_Pride2022_VintageBlack_Pride_600x600_crop_center.png?v=1653680303',
    },
    {
      id: 0,
      title: 'Youth Invertocat 4.0 Shirt',
      price: '$20.00',
      img: 'https://cdn.shopify.com/s/files/1/0051/4802/products/WebShop_Youth_TShirt_Invertocat_4.0_Turquoise_1_600x600_crop_center.jpg?v=1629732165',
    },
    {
      id: 1,
      title: 'Ivertocat 4.0 Shirt',
      price: '$30.00',
      img: 'https://cdn.shopify.com/s/files/1/0051/4802/products/TShirt_Invertocat_4.0_Unisex_Black_600x600_crop_center.jpg?v=1629997801',
    },
    {
      id: 2,
      title: 'Username 2.0 Shirt',
      price: '$30.00',
      img: 'https://cdn.shopify.com/s/files/1/0051/4802/products/TShirt_GitHub_Username_Unisex_CoolBlue_1_600x600_crop_center.jpg?v=1629732698',
    },
  ];
  return { shirts };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { product }: any = Object.fromEntries(formData);
  const cartSession = await cart.getSession(
    request.headers.get("Cookie")
  );
  let items: ShirtType[] = [];

  let parsedProduct: { [k: string]: any } = JSON.parse(product);
  if (cartSession.has('cart')) {
    parsedProduct = JSON.parse(product);
    const cartItems = cartSession.get('cart');
    const target = parsedProduct["id"];

    const findIndex = cartItems.findIndex((item: string) => {
      const parsedItem = JSON.parse(item);
      return parsedItem["id"] === target;
    });

    if (findIndex > -1) {
      const parsedItems = JSON.parse(cartItems[findIndex]);
      cartItems[findIndex] = JSON.stringify({ ...parsedItems, quantity: parsedItems.quantity + 1 });
      items = [...cartItems];
    } else {
      items = [...cartItems, JSON.stringify({ ...parsedProduct, quantity: 1 })];
    }
    cartSession.set('cart', items);
  } else {
    cartSession.set('cart', [JSON.stringify({ ...parsedProduct, quantity: 1 })]);
  }
  const value = await cart.commitSession(cartSession);

  return redirect("/shirts", {
    headers: {
      'Set-Cookie': value,
    },
  });
}

export default function Shirts() {
  const { shirts } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const handleOnClick = (product: {}) => {
    fetcher.submit(
      {
        product: JSON.stringify(product),
      },
      { method: 'post' }
    );
  }
  return (
    <>
      <NavBar />
      <section className='py-40 max-w-5xl mx-auto px-6 '>
        <h1 className='text-6xl font-bold mb-12 '>Shirts</h1>
        <article className='flex gap-4 flex-wrap'>
          {shirts.map((shirt) => (
            <ProductCard product={shirt} key={shirt.id} onClick={handleOnClick} />
          ))}
        </article>
      </section>
    </>
  );
}
