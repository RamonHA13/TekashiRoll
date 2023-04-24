import { Link } from 'react-router-dom'
import { BsFillCartPlusFill, BsSearch } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { getCartByUser, getProductById } from './../firebase/cliente.js'

import CartButtons from './CartButtons'
export default function ClienHeader ({ isAdmin, handleShowAdminHeader, handleSignOff, user }) {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState()
  const [carritoData, setCarritoData] = useState({})
  useEffect(() => {
    user && getCartByUser(user.uid).then((carro) => {
      if (carro !== null) {
        Promise.all(carro[0].productos.map(async (producto) => {
          const productoById = await getProductById(producto.productId)
          return { nombre: productoById.nombre, precio: productoById.precio, id: producto.productId, cantidad: producto.cantidad }
        })).then((productosConInfo) => {
          setCarritoData({ productos: productosConInfo })
          setCartItems(productosConInfo.length)
        })
      } else {
        setCarritoData(null)
      }
    })
  }, [user, carritoData])

  return (
    <header className="flex justify-between bg-second-color px-5 py-5 h-16 items-center">
    <a href="/"><img src="/logo2.png" alt="brand logo"className="w-52 self-center"/></a>
    <nav className="flex ">
        <ul className="flex">
            <li>
            <Link to="/" className="px-5 border-r-2 border-black text-slate-50 hover:text-main-color">Home</Link>
            </li>
            <li>
            <Link to="/menu" className="px-5 border-r-2 border-black text-slate-50 hover:text-main-color">Menu</Link>
            </li>
            <li>
            <Link to="/contact" className="px-5 text-slate-50 hover:text-main-color">Contact</Link>
            </li>
        </ul>
    </nav>
    <nav>
        <ul className="flex items-center">
            <li><button className="px-5 text-slate-50 hover:text-main-color text-xl"><BsSearch /></button></li>
            { isAdmin && <li><Link onClick={handleShowAdminHeader} to="/admin" state={{ isAdmin }} className="px-5 text-slate-50 hover:text-main-color ">Console</Link></li>}
            { user ? <li> <button onClick = {handleSignOff}className="px-5 text-slate-50 hover:text-main-color ">Sign off</button> </li> : <li><Link to="/login"className="px-5 text-slate-50 hover:text-main-color">Log in</Link></li>}
            <li className="px-5 mr-5 text-slate-50 ">
                <button onClick={() => setShowCart(!showCart)} className='hover:text-main-color text-xl hover:cursor-pointer flex'><BsFillCartPlusFill/> {carritoData && <span className='text-white absolute top-9 right-11 text-sm bg-third-color rounded-full w-5 flex justify-center'>{cartItems > 0 && cartItems}</span>} </button>
                {showCart &&
                    <div className='absolute right-20 bg-white text-black flex flex-col z-50 bg-second-color/[.95] border-2 border-solid border-black'>
                        <h2 className='text-center p-2 text-white text-xl'>Mi Carrito</h2>
                        {carritoData &&
                            carritoData.productos.map(producto => {
                              return (
                                    <div className='p-1 flex flex-col items-center' key={producto.id}>
                                        <h3 className='text-center p-1 text-white'>{producto.nombre}</h3>
                                        <CartButtons cantidad={Number(producto.cantidad)} />
                                        <button className='text-black bg-main-color w-1/4 my-5 hover:bg-third-color rounded-md'>Delete</button>
                                    </div>)
                            })
                        }
                        <Link to='/cart' className='bg-main-color hover:bg-third-color hover:cursor-pointer p-1.5 text-center'>Pagar</Link>
                    </div>}
            </li>
        </ul>
    </nav>
    </header>
  )
}
