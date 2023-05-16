import { useContext, useEffect, useState } from 'react'
import { CarritoContext } from '../context/CarritoContext'
import { IoMdClose } from 'react-icons/io'
import Modal from './Modal'
import { addOrder } from '../firebase/cliente'
import { useNavigate } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'

export default function Payment () {
  const { carritoData, totalPedido, cartItems, handleDeleteCart, userId } = useContext(CarritoContext)
  const [showModal, setShowModal] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showSuccessModal, setSuccessModal] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState(
    {
      codigoPostal: '',
      estado: '',
      municipio: '',
      colonia: '',
      calle: '',
      numeroExterior: null,
      numeroInterior: null
    }
  )

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setSuccessModal(false)
        navigate('/')
      }, 3000) // Oculta el modal después de 3 segundos (ajusta el tiempo según tus necesidades)
      return () => clearTimeout(timer)
    }
  }, [showSuccessModal])

  const handleFormSubmit = (e) => {
    const pedidoData = {
      usuario: userId,
      pedido: {
        totalPedido,
        productos: carritoData.productos
      },
      direccion: formData,
      fecha: Timestamp.now()
    }
    e.preventDefault()

    addOrder(pedidoData)
    handleDeleteCart(carritoData.carroId)
    setShowForm(false)
    setSuccessModal(true)
    setFormData({
      codigoPostal: '',
      estado: '',
      municipio: '',
      colonia: '',
      calle: '',
      numeroExterior: null,
      numeroInterior: null
    })
    cartItems.current = 0
  }

  const handleShowForm = () => {
    setShowForm(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }
  return (

    <div className="flex flex-col items-center h-full p-10">

            <div className="p-5 flex flex-col items-center w-1/2">
                <table className='w-full'>
                <thead>
                    <tr>
                        <th colSpan={3} className='text-2xl p-3'><h2>Productos</h2></th>
                    </tr>
                    <tr>
                        <th >Nombre del producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {carritoData && carritoData.productos?.map(producto => {
                      return (
                        <tr key={producto.id} >
                            <td className='p-1'>{producto.nombre}</td>
                            <td className='text-center'>{producto.cantidad}</td>
                            <td className='text-center'>${producto.total ?? producto.precio}</td>
                        </tr>
                      )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td className='p-5 font-bold text-xl'>Total: </td>
                        <td colSpan={2} className='text-center p-5 font-bold text-lg'>$ {totalPedido}</td>
                    </tr>
                </tfoot>
                </table>

        </div>

        <h1 className="text-xl">Selecciona un metodo de pago</h1>
        <div className="mt-3">
            <button className="mx-5 p-2 bg-main-color hover:bg-third-color rounded-md" onClick={() => setShowModal(true)}>Pago en linea</button>
            <button className="mx-5 p-2 bg-main-color hover:bg-third-color rounded-md"onClick={handleShowForm}>Pago en efectivo</button>
        </div>
        {showForm &&
        <div className='absolute top-0 w-screen h-screen bg-black/[.44] flex flex-col items-center justify-center z-50'>
           <div className="relative  bg-second-color rounded-lg w-1/2">
           <div className="flex flex-col items-center p-5 shadow-2xl ">
                    <IoMdClose className='absolute right-5 text-2xl hover:cursor-pointer' onClick={() => setShowForm(false)}/>
                    <form className=' flex flex-col mt-5 w-3/4' onSubmit={handleFormSubmit}>
                        <label htmlFor="codigoPostal" className='text-white py-1' >Codigo Postal</label>
                        <input type="text" name='codigoPostal'className='ps-1'value={formData.codigoPostal} required onChange={(e) => {
                          setFormData(prevValue => (
                            {
                              ...prevValue,
                              codigoPostal: e.target.value
                            }
                          ))
                        }}/>
                        <label htmlFor="estado" className='text-white py-1' >Estado</label>
                        <input type="text" name='estado'className='ps-1' required value={formData.estado} onChange={(e) => {
                          setFormData(prevValue => (
                            {
                              ...prevValue,
                              estado: e.target.value
                            }
                          ))
                        }}/>
                        <label htmlFor="municipio" className='text-white py-1'>Municipio</label>
                        <input type="text" name='municipio'className='ps-1'value={formData.municipio} required onChange={(e) => {
                          setFormData(prevValue => (
                            {
                              ...prevValue,
                              municipio: e.target.value
                            }
                          ))
                        }}/>
                        <label htmlFor="colonia" className='text-white py-1' >Colonia</label>
                        <input type="text" name='colonia'className='ps-1' value={formData.colonia} required onChange={(e) => {
                          setFormData(prevValue => (
                            {
                              ...prevValue,
                              colonia: e.target.value
                            }
                          ))
                        }}/>
                        <label htmlFor="calle" className='text-white py-1' >Calle</label>
                        <input type="text" name='calle'className='ps-1'value={formData.calle} required onChange={(e) => {
                          setFormData(prevValue => (
                            {
                              ...prevValue,
                              calle: e.target.value
                            }
                          ))
                        }}/>
                        <label htmlFor="numeroExterior" className='text-white py-1'>Numero exterior</label>
                        <input type="number" name='numeroExterior'className='ps-1' required value={formData.numeroExterior} onChange={(e) => {
                          setFormData(prevValue => (
                            {
                              ...prevValue,
                              numeroExterior: e.target.value
                            }
                          ))
                        }}/>
                        <label htmlFor="numero interior" className='text-white py-1' >Numero interior</label>
                        <input type="number" name='numeroInterior'className='ps-1' value={formData.numeroInterior} onChange={(e) => {
                          setFormData(prevValue => (
                            {
                              ...prevValue,
                              numeroInterior: e.target.value
                            }
                          ))
                        }}/>
                        <button type="submit" className="mx-5 mt-5 p-2 bg-main-color hover:bg-third-color rounded-md">Continuar</button>
                    </form>
                </div>
            </div>
        </div>}
        {showModal && <Modal handleCloseModal={handleCloseModal} icon={'alert'} showButtons={true} mensaje={'Por el momento no se cuenta con pagos en linea, seleccione otro metodo de pago'}/>}
        {showSuccessModal && <Modal handleCloseModal={handleCloseModal} icon={'success'} mensaje={'Pedido registrado con exito, el restaurante se pondra en contacto contigo'} />}
    </div>
  )
}
