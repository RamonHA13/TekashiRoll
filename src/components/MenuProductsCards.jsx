import useAuth from '../custom hooks/useAuth'
import { addProductToCart, createCartForUser, getCartByUser } from '../firebase/cliente'
export default function MenuProductsCards ({ producto }) {
  const { user } = useAuth()

  const handleCartProducts = () => {
    const userId = user.uid

    getCartByUser(userId)
      .then((cart) => {
        if (cart) {
          return addProductToCart(cart[1], producto.id)
        } else {
          return createCartForUser(userId)
            .then((cart) => addProductToCart(cart[1], producto.id), console.log(cart))
        }
      })
  }

  return (
        <div className='flex flex-col items-center bg-second-color w-1/2 my-5 rounded-md' key={producto.id}>
            <div className='h-3/4 overflow-hidden'>
                <img src={producto.data.imgUrl} alt={producto.data.nombre + ' imagen'} className='object-cover rounded-md'/>
            </div>
            <h2 className='text-white p-0.5 text-xl'>{producto.data.nombre}</h2>
            <p onClick={() => console.log('Info del producto')} className='text-white hover:text-third-color hover:cursor-pointer'>Ver info</p>
            <div className='flex items-center justify-center text-lg'>
                <button onClick={handleCartProducts}className='bg-main-color hover:bg-third-color hover:cursor-pointer p-1.5 rounded m-5'>Añadir al carrito</button>
            </div>
        </div>
  )
}
