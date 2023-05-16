import { createContext, useState, useRef, useEffect } from 'react'
import useAuth from '../custom hooks/useAuth'
import { createCartForUser, deleteCartById, updateCartProductById, deleteCartProductById, getProductById, getCartByUser, addProductToCart } from '../firebase/cliente'
export const CarritoContext = createContext()

export const CarritoProvider = ({ children }) => {
  const { user } = useAuth()
  const [isCarritoDataUpdated, setIsCarritoDataUpdated] = useState(false)
  const [carritoData, setCarritoData] = useState({})
  const cartItems = useRef(null)
  const [totalPedido, setTotalPedido] = useState()
  const [cantidadProductos, setCantidadProductos] = useState()
  const userId = user?.uid

  const handleProductsQuantity = (cartId, productId, newQuantity) => {
    updateCartProductById(cartId, productId, newQuantity)
    setIsCarritoDataUpdated(!isCarritoDataUpdated)
  }
  const handleDeleteCartProduct = (cartId, productId) => {
    deleteCartProductById(cartId, productId)
    setIsCarritoDataUpdated(!isCarritoDataUpdated)
  }
  const handleCartProducts = ({ producto }) => {
    console.log(producto)
    getCartByUser(userId)
      .then((cart) => {
        console.log(cart)
        if (cart) {
          setIsCarritoDataUpdated(!isCarritoDataUpdated)
          return addProductToCart(cart[1], producto.id, producto.data.precio)
        } else {
          setIsCarritoDataUpdated(!isCarritoDataUpdated)
          return createCartForUser(userId)
            .then((cart) => addProductToCart(cart[1], producto.id, producto.data.precio), console.log(cart))
        }
      })
  }

  useEffect(() => {
    const getCarritoData = async () => {
      if (!user) return

      try {
        const carro = await getCartByUser(user.uid)

        if (carro !== null) {
          const productosConInfo = await Promise.all(
            carro[0].productos.map(async (producto) => {
              const productoById = await getProductById(producto.productId)
              return {
                nombre: productoById.nombre,
                precio: productoById.precio,
                id: producto.productId,
                cantidad: producto.cantidad,
                total: producto.total
              }
            })
          )
          const total = productosConInfo.reduce((total, producto) => {
            return total + (producto.precio * producto.cantidad)
          }, 0)

          setCarritoData({ carroId: carro[1], productos: productosConInfo })
          setTotalPedido(total)
          setCantidadProductos(productosConInfo.length)
          cartItems.current = carritoData.productos?.length
        } else {
          createCartForUser(userId)
          setCarritoData({})
        }

        setIsCarritoDataUpdated(true)
      } catch (error) {
        console.log(error)
      }
    }

    getCarritoData()
  }, [isCarritoDataUpdated])

  const handleDeleteCart = (carroId) => {
    deleteCartById(carroId)
    setIsCarritoDataUpdated(true)
    setCarritoData({})
  }
  return (<CarritoContext.Provider value={{ handleDeleteCart, setIsCarritoDataUpdated, handleCartProducts, cartItems, carritoData, handleDeleteCartProduct, totalPedido, cantidadProductos, handleProductsQuantity, userId }}>
            {children}
        </CarritoContext.Provider>)
}
