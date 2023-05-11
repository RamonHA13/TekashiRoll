import { useEffect, useState } from 'react'

import { getOrders, updateOrderById } from '../firebase/cliente'
import { TbAlertCircle } from 'react-icons/tb'

export default function AdminOrders () {
  const [ordenes, setOrdenes] = useState()
  const [togglePedidos, setTogglePedidos] = useState(false)
  const handleCompletado = (ordenId) => {
    updateOrderById(ordenId)
    setTogglePedidos(!togglePedidos)
  }
  useEffect(() => {
    const fecha = Date().toString().split(' ').slice(0, 4).join(' ')
    getOrders(fecha).then(orders => {
      if (orders.length <= 0) {
        setOrdenes(null)
      } else {
        setOrdenes(orders)
      }
    })
  }, [togglePedidos])

  const handleEnviado = (ordenId) => {
    setOrdenes(prevOrdenes => {
      return prevOrdenes.map(orden => {
        if (orden.id === ordenId) {
          return { ...orden, enviado: true }
        }
        return orden
      })
    })
  }
  const handleEnPreparación = (ordenId) => {
    setOrdenes(prevOrdenes => {
      return prevOrdenes.map(orden => {
        if (orden.id === ordenId) {
          return { ...orden, enPreparacion: true }
        }
        return orden
      })
    })
  }

  return (
    <div className="h-screen">

        <h2 className='text-2xl text-center font-bold mt-5'>Ordenes</h2>
        <ul className="flex flex-col overflow-x-hidden justify-center ">

            {ordenes
              ? ordenes.map((orden) => {
                const horaPedido = orden.fecha.split(' ')[4]
                const fullDirection = orden.domicilio.calle + ' ' + orden.domicilio.numeroExterior + ', ' + orden.domicilio.colonia + ', ' + orden.domicilio.municipio + ', ' + orden.domicilio.estado + '.'
                return (
                <li key={orden.id} className="w-full my-3 ml-5 bg-main-color/[.5] rounded p-3">
                    <h3>{orden.id}</h3>
                    <div className='flex justify-between'>
                        <div>
                            <p>Dirección: {fullDirection}</p>
                            <p>Hora del pedido: {horaPedido}</p>
                        </div>

                        <div className='mr-10'>
                            <button className="mt-2 p-2 bg-main-color hover:bg-third-color rounded-md mx-5" onClick={() => handleEnPreparación(orden.id)}>{orden.enPreparacion ? 'La orden se encuentra en preparación' : 'Marcar la orden en preparación'}</button>
                            {orden.enPreparacion && <button className="mt-2 p-2 bg-main-color hover:bg-third-color rounded-md mx-5" onClick={() => handleEnviado(orden.id)}>{orden.enviado ? 'El producto ha sido enviado' : 'Marcar la orden como enviada'}</button>}
                            {orden.enviado && <button className="mt-2 p-2 bg-main-color hover:bg-third-color rounded-md mx-5" onClick={() => handleCompletado(orden.id)}>{orden.completado ? 'La orden ha sido entregado' : 'Marcar la orden como entregado'}</button>}
                        </div>
                    </div>
                    <button className="mt-2 p-2 bg-main-color hover:bg-third-color rounded-md" onClick={() => alert('productos de la orden')}>Ver productos de la orden</button>
                 </li>
                )
              })
              : <div className='flex flex-col items-center justify-center mt-10'>
                    <TbAlertCircle className='text-main-color text-6xl mb-1' />
                    <span className='text-gray-400'>No cuentas con ordenes</span>
                </div>}

        </ul>
    </div>
  )
}
