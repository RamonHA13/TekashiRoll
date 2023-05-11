import { useEffect, useState, useRef } from 'react'

import { updateOrderById, db } from '../firebase/cliente'
import { query, orderBy, where, collection, onSnapshot, Timestamp } from 'firebase/firestore'

import { TbAlertCircle } from 'react-icons/tb'

export default function AdminOrders () {
  const [ordenes, setOrdenes] = useState([])
  const [togglePedidos, setTogglePedidos] = useState(false)
  const subscriptionRef = useRef(null)
  const handleCompletado = (ordenId) => {
    updateOrderById(ordenId, { completado: true, fecha: Timestamp.now() })
    setTogglePedidos(!togglePedidos)
  }

  useEffect(() => {
    const fechaActual = new Date()
    const anio = fechaActual.getFullYear()
    const mes = fechaActual.getMonth() // Los meses se indexan desde 0
    const dia = fechaActual.getDate()

    const fechaInicio = Timestamp.fromDate(new Date(anio, mes, dia, 0, 0, 0)) // Establecer fecha de inicio del día
    const fechaFin = Timestamp.fromDate(new Date(anio, mes, dia, 23, 59, 59))

    const q = query(
      collection(db, 'ordenes'),
      orderBy('fecha'),
      where('fecha', '>=', fechaInicio),
      where('fecha', '<=', fechaFin),
      where('completado', '==', false)
    )

    // Cancelar la suscripción anterior si existe
    if (subscriptionRef.current) {
      subscriptionRef.current()
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordenes = []
      querySnapshot.forEach((doc) => {
        ordenes.push({
          id: doc.id,
          domicilio: JSON.parse(doc.data().domicilio),
          fecha: doc.data().fecha,
          orden: JSON.parse(doc.data().orden),
          enPreparacion: doc.data().enPreparacion,
          enviado: doc.data().enviado,
          completado: doc.data().completado
        })
      })
      setOrdenes(ordenes)
    })

    // Guardar la suscripción en la referencia mutable
    subscriptionRef.current = unsubscribe

    return () => {
      // Cancelar la suscripción al desmontar el componente
      if (subscriptionRef.current) {
        subscriptionRef.current()
      }
    }
  }, [])

  const handleEnviado = (ordenId) => {
    updateOrderById(ordenId, { enviado: true, fecha: Timestamp.now() })
  }
  const handleEnPreparación = (ordenId) => {
    updateOrderById(ordenId, { enPreparacion: true, fecha: Timestamp.now() })
  }

  return (
    <div className="h-screen">

        <h2 className='text-2xl text-center font-bold mt-5'>Ordenes</h2>
        <ul className="flex flex-col overflow-x-hidden justify-center ">

            {ordenes &&
              ordenes.map((orden) => {
                const horaPedido = orden.fecha.toDate().toString().split(' ')[4]
                const fullDirection = orden.domicilio.calle + ' ' + orden.domicilio.numeroExterior + ', ' + orden.domicilio.colonia + ', ' + orden.domicilio.municipio + ', ' + orden.domicilio.estado + '.'
                return (
                <li key={orden.id} className="w-full my-3 ml-5 bg-main-color/[.5] rounded p-3">
                    <h3>{orden.id}</h3>
                    <div className='flex justif
                    y-between'>
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
              })}
            {typeof (ordenes) === 'undefined' || ordenes.length === 0
              ? <div className='flex flex-col items-center justify-center mt-10'>
                    <TbAlertCircle className='text-main-color text-6xl mb-1' />
                    <span className='text-gray-400'>No cuentas con ordenes</span>
                </div>
              : null}
        </ul>
    </div>
  )
}
