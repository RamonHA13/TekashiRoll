import { Link } from 'react-router-dom'
import { BsFillCartPlusFill, BsSearch } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { useState, useContext, useEffect, useRef } from 'react'
import Cart from './Cart.jsx'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { CarritoContext } from '../context/CarritoContext.jsx'
import { findProductByName, db } from '../firebase/cliente.js'

export default function ClienHeader ({ isAdmin, handleShowAdminHeader, handleSignOff, user }) {
  const [showCart, setShowCart] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showUserAlert, setShowUserAlert] = useState(false)
  const [results, setResults] = useState([])
  const [inputData, setInputData] = useState('')
  const { carritoData, cartItems, handleDeleteCartProduct, handleProductsQuantity, handleCartProducts } = useContext(CarritoContext)
  const [userOrdenes, setUserOrdenes] = useState([])
  const subscriptionRef = useRef(null)
  const { userId } = useContext(CarritoContext)

  const handlePayment = () => {
    setShowCart(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await findProductByName(inputData)
    setResults(data)
    setShowResults(true)
  }

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

        ordenes.forEach(orden => {
          if (orden.enPreparacion || orden.enviado || orden.completado) {
            setShowUserAlert(true)
          }
        })
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
            <li><Link to='/menu' className="px-5 text-slate-50 hover:text-main-color text-xl flex" onClick={() => setShowSearch(prevValue => !prevValue)}><BsSearch /></Link></li>
            <li className='flex flex-col relative'>
            {showSearch &&
            <form onSubmit={handleSubmit}>
              <input type='text' className='pl-1' value={inputData} onChange={(e) => {
                setInputData(e.target.value)
                setShowResults(false)
              }} />
            </form>}
            {showResults &&
              <ul className='absolute top-[25px] w-max z-50 '>
                {results && results.map((producto) => (
                  <li key={producto.id} onClick={() => handleCartProducts({ producto })} className='bg-white w-full p-1.5 flex justify-between items-center hover:cursor-pointer'>
                    <h2 className='text-lg'>{producto.data.nombre}</h2>
                    <span>${producto.data.precio}</span>
                  </li>
                ))
                }
              </ul>}
            </li>
            { isAdmin && <li><Link onClick={handleShowAdminHeader} to="/admin" state={{ isAdmin }} className="px-5 text-slate-50 hover:text-main-color ">Console</Link></li>}
            { user ? <li> <button onClick = {handleSignOff}className="px-5 text-slate-50 hover:text-main-color ">Sign off</button> </li> : <li><Link to="/login"className="px-5 text-slate-50 hover:text-main-color">Log in</Link></li>}
            <li className="px-5 mr-5 text-slate-50 ">
                <button onClick={() => setShowCart(!showCart)} className='hover:text-main-color text-xl hover:cursor-pointer flex'><BsFillCartPlusFill/> {carritoData && <span className='text-white absolute top-9 right-24 text-sm bg-third-color rounded-full w-5 flex justify-center'>{cartItems.current > 0 && cartItems.current }</span>} </button>
                {showCart && <Cart handleDeleteCartProduct={handleDeleteCartProduct} handleProductsQuantity={handleProductsQuantity} carritoData={carritoData} handlePayment={handlePayment}/>}
            </li>
            <li>
              <Link to="/user" className="px-5 text-slate-50 hover:text-main-color text-xl" onClick={() => setShowUserAlert(!showUserAlert)}>
                <FaUser/>
                {showUserAlert ? <span className='absolute top-9 right-9 bg-third-color rounded-full w-5 h-5 flex justify-center justify-self-center'></span> : null}
              </Link>
            </li>
        </ul>
    </nav>
    </header>
  )
}
