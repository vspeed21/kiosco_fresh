import { useEffect, useCallback } from "react";

import Layout from "../src/layout/Layout";
import useKiosco from "../src/hooks/useKiosco";
import { formatearCantidad } from "../src/helpers";

export default function Total() {
  const { pedidos, nombre, setNombre, enviarOrden, total } = useKiosco();


  const comprobarPedido = useCallback(() => {
    return pedidos.length === 0 || nombre === '' || nombre.length < 4;
  }, [pedidos, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedidos, comprobarPedido]);

  return (
    <Layout pagina="Total y confirmar pedido">
      <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

      <form
        onSubmit={enviarOrden}
      >
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            nombre
          </label>

          <input
            type='text'
            id="nombre"
            className="bg-gray-100 w-full lg:w-1/3 mt-3 p-2 rounded-md focus:outline-blue-700 focus:outline-4 placeholder:text-gray-600"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar {''}
            <span className="font-bold">{formatearCantidad(total)}</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            type='submit'
            value='Confirmar pedido'
            className={`w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center transition-colors ${comprobarPedido() ? 'bg-indigo-100 hover:cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer'}`}
            disabled={comprobarPedido()}
          />
        </div>

      </form>
    </Layout>
  )
}
