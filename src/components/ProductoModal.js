import Image from 'next/image';
import { formatearCantidad } from '../helpers';
import useKiosco from "../hooks/useKiosco"
import { useEffect, useState } from 'react';

function ProductoModal() {
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  const { producto, handleChangeModal, handlePedido, pedidos } = useKiosco();

  useEffect(() => {
    //Actualizar la cantidad
    if(pedidos?.some(p => p.id === producto.id)) {
      setEdicion(true);
      const edicion = pedidos.find(p => p.id === producto.id);
      setCantidad(edicion.cantidad);
    }
  }, [producto, pedidos]);

  return (
    <div className='md:flex gap-10'>
      <div className='md:w-1/3'>
        <Image
          width={300}
          height={400}
          src={`/assets/img/${producto.imagen}.jpg`}
          alt={`imagen producto ${producto.nombre}`}
        />
      </div>

      <div className='md:w-2/3'>
        <div className='flex justify-end'>
          <button
            onClick={handleChangeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <h2 className='text-3xl font-bold mt-5'>{producto.nombre}</h2>
        <p className='mt-5 text-5xl font-black text-amber-500'>
          {formatearCantidad(producto.precio)}
        </p>

        <div className='flex gap-4 mt-5'>
          <button
            type='button'
            onClick={() => {
              if (cantidad <=1 ) return;
              setCantidad(cantidad - 1)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <p className='text-2xl'>{cantidad}</p>

          <button
            type='button'
            onClick={() => {
              if (cantidad >= 5 ) return;
              setCantidad(cantidad + 1)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <button
          type='button'
          className='bg-indigo-600 text-white rounded uppercase hover:bg-indigo-700 mt-5 font-bold p-2 transition-colors duration-300'
          onClick={() => handlePedido({...producto, cantidad})}
        >
          {edicion ? 'Guardar cambios' : 'Añadir al pedido'}
        </button>
      </div>
    </div>
  )
}

export default ProductoModal
