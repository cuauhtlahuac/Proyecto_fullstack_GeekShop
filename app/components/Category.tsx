import { Link } from '@remix-run/react';
import { useMemo } from 'react';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

interface CategoryProps {
  text: string;
  link?: string;
}
export default function Category({ text, link = '' }: CategoryProps) {
  const src = useMemo(() => {
    switch (text) {
      case 'Shirts':
        return 'https://cdn.shopify.com/s/files/1/0051/4802/files/shirts_600x.jpg?v=1617639567';
      case 'Hoodies & Sweatshirts':
        return 'https://cdn.shopify.com/s/files/1/0051/4802/files/hoodies_92ec98cf-58bc-4e5d-b0a3-cb449e278b8b_600x.jpg?v=1617642365';
      default:
        return 'https://cdn.shopify.com/s/files/1/0051/4802/files/gh_yubikey_1_WEB_SQUARE_600x.jpg?v=1629239661';
    }
  }, [text]);
  return (
    <Link prefetch='render' className='grow' to={link}>
      <div className=' min-w-64 h-64 bg-[rgba(0,0,0,0.4)] rounded-xl p-12 flex flex-col items-start relative overflow-hidden group hover:shadow-xl transition-all hover:bg-[rgba(0,0,0,0.3)] cursor-pointer'>
        <img
          className='-z-10 absolute object-cover top-0 left-0 h-full w-full group-hover:scale-105 transition-all'
          src={src}
          alt='category'
        />
        <h2 className='w-24 text-white text-xl font-semibold'>{text}</h2>
        <button className='flex items-center font-semibold text-white border-b-2 py-1 border-b-white mt-auto'>
          Ver todo{' '}
          <span>
            <HiOutlineArrowSmRight />
          </span>
        </button>
      </div>
    </Link>
  );
}
