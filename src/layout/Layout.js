import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Modal from 'react-modal';
import useKiosco from '../hooks/useKiosco';
import ProductoModal from '../components/ProductoModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pasos from '../components/Pasos';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export default function Layout({children, pagina}) {
  const { modal } = useKiosco();

  return (
    <>
      <Head>
        <title>Café | {pagina}</title>
        <meta name="description" content="Kiosco Cafetería"/>
        <meta name="author" content="Victor Torres"/>
      </Head>

      <div className='md:flex'>
        <aside className='md:w-4/12 xl:1/4 2xl:w-1/5'>
          <Sidebar/>
        </aside>

        <main className='md:w-8/12 xl:3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
          <div className='p-10'>
            <Pasos/>
            {children}
          </div>
        </main>

        {modal ? (
          <Modal
            isOpen={modal}
            style={customStyles}
          >
            <ProductoModal/>
          </Modal>
        ) : null}

        <ToastContainer/>
      </div>
    </>
  )
}
