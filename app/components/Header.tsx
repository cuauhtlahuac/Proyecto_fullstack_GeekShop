import { Link } from '@remix-run/react';

export default function Header() {
  return (
    <Link to='/'>
      <div className='flex items-center'>
        <img className='w-[150px]' src='mobile-shopping.png' alt='yutu' />
        <h2 className='text-6xl font-medium tracking-wider'>GeekShop</h2>
      </div>
    </Link>
  );
}
