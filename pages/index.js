import Layout from "../src/layout/Layout";
import useKiosco from "../src/hooks/useKiosco";
import Producto from "../src/components/Producto";

export default function Home() {
  const { categoriaActual } = useKiosco();

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-3xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">Elije y personaliza tu pedido a continuacion</p>

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </Layout>
  )
}
