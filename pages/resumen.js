import Layout from "../src/layout/Layout"
import useKiosco from "../src/hooks/useKiosco"
import ResumenPedido from "../src/components/ResumenPedido";

export default function Resumen() {
  const { pedidos } = useKiosco();

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {pedidos.length ? (
        pedidos.map(pedido => (
          <ResumenPedido
            key={pedido.id}
            pedido={pedido}
          />
        ))
      ) : (
        <p className="text-2xl text-center font-bold">No hay nada en tu pedido</p>
      )}
    </Layout>
  )
}