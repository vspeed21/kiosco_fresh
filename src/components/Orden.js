import axios from "axios";
import Image from "next/image";
import { formatearCantidad } from "../helpers";
import { toast } from 'react-toastify';

function Orden({orden}) {
  const { nombre, total, pedido, id } = orden;

  const completarOrden = async () => {
    try {
      await axios.post(`/api/ordenes/${id}`);
      toast.success('¡Orden Lista!')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border p-10 space-y-5">
      <h3 className="text-2xl font-black">Orden: {id}</h3>
      <p className="text-lg my-10 font-bold">Cliente: {nombre}</p>

      <div>
        {pedido.map(platillo => (
          <div 
            key={platillo.id}
            className="flex py-3 border-b items-center last-of-type:border-0"
          >
            <div className="w-32">
              <Image
                width={400}
                height={500}
                src={`/assets/img/${platillo.imagen}.jpg`}
                alt={`imagen platillo ${platillo.nombre}`}
              />
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-amber-500">{platillo.nombre}</h3>
              <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='md:flex md:justify-between md:items-center my-10'>
        <p className="mt-5 font-black text-4xl text-amber-500">
          Total a a pagar: {formatearCantidad(total)}
        </p>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 transition-colors duration-300 text-white text-center mt-5 md:mt-0 py-2 px-5 rounded-lg uppercase font-bold"
          onClick={completarOrden}
        >
          Completar orden
        </button>
      </div>
    </div>
  )
}

export default Orden