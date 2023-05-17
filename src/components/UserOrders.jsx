import { TbAlertCircle } from 'react-icons/tb'
import { useEffect, useState, useContext, useRef } from 'react'
import { CarritoContext } from '../context/CarritoContext'
import { db } from '../firebase/cliente'
import { query, where, collection, onSnapshot } from 'firebase/firestore'
import Modal from './Modal'
export default function UserOrders () {
  const [userOrdenes, setUserOrdenes] = useState([])
  const subscriptionRef = useRef(null)
  const { userId } = useContext(CarritoContext)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, 'ordenes'), where('usuario', '==', userId))

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
            completado: doc.data().completado,
            entrega: doc.data().entrega
          })
        })
        setUserOrdenes(ordenes)
      })
      subscriptionRef.current = unsubscribe
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current()
      }
    }
  }, [])

  return (
    <>
        <h2 className='text-2xl text-center font-bold mt-5'>Ordenes</h2>
        <ul className="flex flex-col overflow-x-hidden overflow-y-auto justify-center ">

            {userOrdenes &&
              userOrdenes.map((orden) => {
                const horaPedido = orden.fecha.toDate().toString().split(' ')[4]
                const entregaPedido = orden.entrega && orden.entrega.toDate().toString().split(' ')[4]
                const fullDirection = orden.domicilio.calle + ' ' + orden.domicilio.numeroExterior + ', ' + orden.domicilio.colonia + ', ' + orden.domicilio.municipio + ', ' + orden.domicilio.estado + '.'
                return (
                <li key={orden.id} className="w-full my-3 ml-5 bg-main-color/[.5] rounded p-3">
                    <h3> ID: {orden.id}</h3>
                    <div className='flex justify-between w-full'>
                        <div>
                            <p>Dirección: {fullDirection}</p>
                            <p>Hora del pedido: {horaPedido}</p>
                            <p>Entrega: {entregaPedido}</p>
                        </div>

                        <div className='mr-10 '>
                            <h4 className='text-center font-bold mb-3'>Status</h4>
                            <span className='mt-2 p-2 bg-main-color rounded-md mx-5'>Ordenado</span>
                            {orden.enPreparacion && <span className='mt-2 p-2 bg-main-color rounded-md mx-5'>En preparacion</span>}
                            {orden.enviado && <span className='mt-2 p-2 bg-main-color rounded-md mx-5'>Enviado</span>}
                            {orden.completado && <span className='mt-2 p-2 bg-main-color rounded-md mx-5'>Entregado</span>}
                        </div>
                    </div>

                    <button className="mt-2 p-2 bg-main-color hover:bg-third-color rounded-md" onClick={() => setShowModal(!showModal)}>Ver productos de la orden</button>
                    {showModal && <Modal data={orden} mensaje={'Productos'} showButtons={true} handleCloseModal={() => setShowModal(false)}/>}
                 </li>

                )
              })}
            {typeof (userOrdenes) === 'undefined' || userOrdenes.length === 0
              ? <div className='flex flex-col items-center justify-center mt-10'>
                    <TbAlertCircle className='text-main-color text-6xl mb-1' />
                    <span className='text-gray-400'>No cuentas con ordenes</span>
                </div>
              : null}
        </ul>

    </>
  )
}
