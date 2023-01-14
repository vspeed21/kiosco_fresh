import Image from 'next/image'
import useKiosco from '../hooks/useKiosco';

function Categoria({categoria}) {
  const { handleClickCategoria, categoriaActual } = useKiosco();
  const { nombre, icono, id} = categoria;

  return (
    <div 
      className={`flex items-center gap-4 w-full border p-3 hover:bg-amber-400 ${categoriaActual?.id === id ? 'bg-amber-400': ''}`}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt={`icono ${nombre}`}
      />

      <button
        type='button'
        onClick={() => handleClickCategoria(id)}
        className='text-2xl font-bold hover:cursor-pointer'
      >
        {nombre}
      </button>
    </div>
  )
}

export default Categoria
