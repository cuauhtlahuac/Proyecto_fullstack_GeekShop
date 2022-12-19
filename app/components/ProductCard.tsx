import { type ShirtType } from '~/routes/shirts';
import Button from './Button';

interface ProductCardProps {
  product: ShirtType;
  onClick?: ({}) => void;
}
export default function ProductCard({ onClick, product }: ProductCardProps) {

  const handleOnClick = async () => {
    onClick?.(product);
  };

  return (
    <div className='h-[240px] text-center grow max-w-[200px] group cursor-pointer relative'>
      <img
        className='w-full group-hover:scale-105 group-hover:opacity-80 transition-all'
        src={product.img}
        alt='product'
      />
      <h2 className='font-semibold'>{product.title}</h2>
      <p className='text-sm'>{product.price}</p>
      <Button
        onClick={handleOnClick}
        className='hidden group-hover:block absolute top-24 text-sm w-full'
      >
        Agregar a mi bolsa
      </Button>
    </div>
  );
}
