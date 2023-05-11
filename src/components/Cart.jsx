import { useContext } from 'react'
import CartButtons from './CartButtons'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../context/CarritoContext'
export default function Cart ({ handlePayment, handleProductsQuantity, handleDeleteCartProduct }) {
  const { carritoData } = useContext(CarritoContext)
  return (
    <div className='absolute right-20  text-black flex flex-col z-50 bg-second-color/[.95] border-2 border-solid border-black'>
        <h2 className='text-center p-2 text-white text-xl'>Mi Carrito</h2>
        {carritoData &&
        carritoData.productos?.map(producto => {
          return (
                <div className='p-1 flex flex-col items-center' key={producto.id}>
                    <h3 className='text-center p-1 text-white'>{producto.nombre}</h3>
                    <CartButtons cantidad={Number(producto.cantidad)} handleProductsQuantity={handleProductsQuantity} productId={producto.id} cartId={carritoData.carroId}/>
                    <button className='text-black bg-main-color w-1/4 my-5 hover:bg-third-color rounded-md' onClick={() => handleDeleteCartProduct(carritoData.carroId, producto.id)}>Delete</button>
                </div>)
        })

        }
            <Link to='/payment' onClick={handlePayment} className='bg-main-color hover:bg-third-color hover:cursor-pointer p-1.5 text-center'>Pagar</Link>
        </div>
  )
}
