import Image from 'next/image';
import { formatearCantidad } from '../helpers';
import useKiosco from '../hooks/useKiosco';

function Producto({producto}) {
  const { setProducto, handleChangeModal } = useKiosco();
  const { imagen, nombre, precio } = producto;

  return (
    <div className='border p-2'>
      <Image
        width={400}
        height={300}
        src={`/assets/img/${imagen}.jpg`}
        alt={`imagen platillo ${nombre}`}
      />

      <div className='p-5'>
        <h3 className='text-2xl font-bold'>{nombre}</h3>
        <p className='mt-5 font-black text-amber-500 text-3xl'>
          {formatearCantidad(precio)}
        </p>

      <button
        type='button'
        className='bg-indigo-600 hover:bg-indigo-800 py-1 px-3 text-white rounded w-full mt-3 font-bold uppercase transition-colors duration-300'
        onClick={() => {
          handleChangeModal();
          setProducto(producto);
        }}
      >
        Agregar
      </button>

      </div>
    </div>
  )
}

export default Producto
