import useSWR from 'swr';
import axios from 'axios';
import AdminLayout from "../src/layout/AdminLayout";
import Orden from '../src/components/Orden';

export default function Admin() {

  const fetcher = () => axios('/api/ordenes').then(datos => datos.data);

  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 });
  console.log(data);

  return (
    <AdminLayout pagina="Panel de Administración">
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Administra las ordenes</p>

      {data && data.length ? ( 
        data.map(orden => (
          <Orden
            key={orden.id}
            orden={orden}
          />
        ))
       ): <p className='text-center text-xl text-gray-800 mt-10'>
            No hay ordenes pendiendes. Descansa
          </p>}

    </AdminLayout>
  )
}