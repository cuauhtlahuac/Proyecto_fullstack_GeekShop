import { HiOutlineShoppingBag } from 'react-icons/hi';
import { CgMenuLeft } from 'react-icons/cg';
import { FaTshirt } from 'react-icons/fa';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@remix-run/react';

export default function NavBar({ badgeNumber }: { badgeNumber?: number }) {
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen((value) => !value);

  return (
    <>
      <nav className='px-3 h-16 flex justify-between items-center shadow-xl fixed top-0 left-0 w-full bg-white z-20'>
        <button className='text-3xl' onClick={onToggle}>
          <CgMenuLeft />
        </button>
        <Link to='/'>
          <p className='flex items-center gap-1'>
            <span className='text-2xl'>
              {' '}
              <FaTshirt />
            </span>
            <span className='font-semibold text-xl'>GeekShop</span>
          </p>
        </Link>
        <Link to='/cart'>
          <p className='relative'>
            <span className='text-2xl'>
              <HiOutlineShoppingBag />
            </span>
            {badgeNumber && (
              <span className='bg-violet-500 text-white rounded-full p-1 text-xs h-[20px] w-[20px] flex items-center justify-center font-semibold absolute top-[-10px] right-[-10px]'>
                {badgeNumber}
              </span>
            )}
          </p>
        </Link>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -250 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -250 }}
            className='bg-white flex flex-col items-start pb-6 absolute w-full z-10 mt-16'
          >
            <Link className='w-full' to='/login'>
              <button className='px-3 py-3 text-lg hover:bg-zinc-200 w-full text-left'>
                Login
              </button>
            </Link>
            <Link className='w-full' to='/signup'>
              <button className='px-3 py-3 text-lg hover:bg-zinc-200 w-full text-left'>
                Crear una cuenta
              </button>
            </Link>
            <Link className='w-full' to='/cart'>
              <button className='px-3 py-3 text-lg hover:bg-zinc-200 w-full text-left'>
                Ver carrito
              </button>
            </Link>
            <Link className='w-full' to='/'>
              <button className='px-3 py-3 text-lg hover:bg-zinc-200 w-full text-left'>
                Explorar
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
