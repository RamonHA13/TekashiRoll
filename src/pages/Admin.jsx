
import AddProductCard from '../components/addProductCard'
import { getProductos, deleteProductById } from '../firebase/cliente'
import FormModal from '../components/formModal'
import ProductsCards from '../components/ProductsCards'
import { useEffect, useState } from 'react'
import DeleteModal from '../components/deleteModal'
import useAdminRol from '../custom hooks/useAdminRol'
export default function Admin () {
  const [showModal, setShowModal] = useState(false)
  const [isEmpty, setIsEmpty] = useState()
  const [productos, setProductos] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [productId, setProductId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { isAdmin } = useAdminRol()
  useEffect(() => {
    getProductos().then(productos => {
      if (productos.length > 0) {
        setProductos(productos)
        setIsEmpty(false)
      } else {
        setIsEmpty(true)
      }
    })
  }, [showModal, showDeleteModal])

  const handleContinueDelete = () => {
    deleteProductById(productId)
    setShowDeleteModal(false)
  }
  const handleCloseModal = () => {
    setIsEditing(false)
    setShowModal(false)
  }
  const handleAddProduct = () => {
    setShowModal(true)
  }

  const handleDeleteProduct = (id) => {
    setProductId(id)
    setShowDeleteModal(true)
  }
  const handleEditProduct = (id) => {
    setProductId(id)
    setIsEditing(true)
    setShowModal(true)
  }
  return (
    <>
    { !isAdmin
      ? <h1>No cuenta con permisos de administrador</h1>
      : <>

        {isEmpty
          ? <> <AddProductCard handleAddProduct = {handleAddProduct} isEmpty={isEmpty} isEditing={isEditing} /></>
          : <main className='box-border overflow-auto p-10 h-screen'>

            <ul className="  grid grid-cols-3  gap-5">
              {productos.map((producto) => (
                <ProductsCards key={producto.id} id={producto.id} data={producto.data} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct}/>
              ))}
              <AddProductCard handleAddProduct={handleAddProduct} isEmpty={isEmpty} isEditing={isEditing} />
            </ul>

        </main>
        }
        {showDeleteModal && <DeleteModal handleCloseDeleteModal = {() => setShowDeleteModal(false)} handleContinueDelete = {handleContinueDelete}/>}
        {showModal && <FormModal isEditing={isEditing} handleCloseModal = {handleCloseModal} id={productId}/>}
    </>
    }
    </>

  )
}
