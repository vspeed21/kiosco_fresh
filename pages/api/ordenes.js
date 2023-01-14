import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  //Obtener ordenes en false
  const ordenes = await prisma.orden.findMany({
    where: {
      estado: false,
    },
  });
  res.status(200).json(ordenes);


  //Crear orden
  if(req.method === 'POST') {
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        total: req.body.total,
        pedido: req.body.pedidos,
      },
    });
    res.json(orden);
  }
}