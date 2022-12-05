import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import NavBar from '~/components/NavBar';
import ProductCard from '~/components/ProductCard';

export interface ShirtType {
  title: string;
  price: string;
  img: string;
  id: number;
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

export default function Shirts() {
  const { shirts } = useLoaderData<LoaderData>();
  return (
    <>
      <NavBar />
      <section className='py-40 max-w-5xl mx-auto px-6 '>
        <h1 className='text-6xl font-bold mb-12 '>Shirts</h1>
        <article className='flex gap-4 flex-wrap'>
          {shirts.map((shirt) => (
            <ProductCard product={shirt} key={shirt.id} />
          ))}
        </article>
      </section>
    </>
  );
}
