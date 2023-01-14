import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const KioscoContext = createContext();

export function KioscoProvider({children}) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [total, setTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    getCategorias();
    async function getCategorias() {
      try {
        const { data } = await axios('/api/categorias')
        setCategorias(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedidos.reduce((total, pro) => (pro.precio * pro.cantidad) + total, 0);
    setTotal(nuevoTotal);
  }, [pedidos]);

  const handleClickCategoria = id => {
    const categoria = categorias.filter(cat => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push('/')
  }

  const handleChangeModal = () => {
    setModal(!modal);
  }

  const handlePedido = ({categoriaId, ...producto}) => {
    const productoExiste = pedidos.some(p => p.id === producto.id);

    if(productoExiste) {
      const pedidoActualizado = pedidos.map(p => p.id === producto.id ? producto : p);
      setPedidos(pedidoActualizado);
      toast.success('Guardado correctamente');
    }else{
      setPedidos([...pedidos, producto])
      toast.success('Agregado correctamente');
    }
    setModal(false);
  }

  const handleEditarCantidades = id => {
    const pedidoActualizado = pedidos.filter(p => p.id === id);
    setProducto(pedidoActualizado[0]);
    setModal(!modal);
  }

  const handleEliminarProducto = id => {
    const pedidoActualizados = pedidos.filter(p => p.id !== id);
    setPedidos(pedidoActualizados);
  }

  async function enviarOrden(e) {
    e.preventDefault();
    
    try {
      await axios.post('/api/ordenes', { pedidos, nombre, total, fecha:Date.now().toString(), });

      //App reset
      setTotal(0);
      setCategoriaActual(categorias[0]);
      setPedidos([]);
      setNombre('');
      toast.success('Pedido realizado correctamente');

      setTimeout(() => {
        router.push('/')
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        setProducto,
        modal,
        handleChangeModal,
        handlePedido,
        pedidos,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        total,
        enviarOrden
      }}
    >
      {children}
    </KioscoContext.Provider>
  )
}

export default KioscoContext;