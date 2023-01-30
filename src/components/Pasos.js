import { useRouter } from "next/router";
import useKiosco from "../hooks/useKiosco";

const pasos = [
  {paso: 1, nombre: 'Menú', url: '/'},
  {paso: 2, nombre: 'Resumen', url: '/resumen'},
  {paso: 3, nombre: 'Datos y total', url: '/total'}
]

function Pasos() {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map(paso => (
          <button
            onClick={() => {
              router.push(paso.url);
            }}
            className="text-lg font-bold"
            key={paso.paso}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div className={`rounded-full bg-amber-500 text-xs leading-none h-2 ${router.pathname === '/' ? 'w-10' : router.pathname === '/resumen' ? 'w-1/2' : 'w-full'}`}></div>
      </div>
    </>
  )
}

export default Pasos
