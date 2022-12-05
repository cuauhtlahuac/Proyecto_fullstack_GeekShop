import { Link } from '@remix-run/react';
import Button from '~/components/Button';
import Category from '~/components/Category';
import NavBar from '~/components/NavBar';

export default function Index() {
  return (
    <>
      <NavBar />
      <section className='bg-[rgba(0,0,0,0.5)] text-white flex flex-col h-[500px] lg:h-[800px] lg:px-20 justify-center relative px-12 overflow-hidden'>
        <img
          className='-z-10 absolute object-cover top-0 left-0'
          src='https://cdn.shopify.com/s/files/1/0051/4802/files/GitHub-Universe-1_571a20c1-1b63-4098-9108-0068333a9a82_2200x.jpg?v=1667837541'
          alt='geekShop'
        />
        <h1 className='text-6xl mb-2'>Geek Shop</h1>
        <p className='text-2xl mb-4'>
          Todo el geek stuff millenial que puedas desear
        </p>
        <Link to='/shirts'>
          <Button>Explorar</Button>
        </Link>
      </section>
      <section className='py-20 px-6 justify-between flex flex-wrap gap-6 max-w-5xl mx-auto'>
        <Category text='Stickers' />
        <Category text='Hoodies & Sweatshirts' />
        <Category link='shirts' text='Shirts' />
      </section>
    </>
  );
}
