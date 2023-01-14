import Image from 'next/image';
import useKiosco from '../hooks/useKiosco';
import Categoria from './Categoria';

function Sidebar() {
  const { categorias } = useKiosco();

  return (
    <>
     <Image
      width={200}
      height={100}
      src="/assets/img/logo.svg"
      alt="logo kiosco"
     />

    <nav className='mt-10 overflow-y-scroll'>
      {categorias.map(categoria => (
        <Categoria
          key={categoria.id}
          categoria={categoria}
        />
      ))}
    </nav>

    </>
  )
}

export default Sidebar
