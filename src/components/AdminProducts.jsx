import FormModal from '../components/formModal'
import ProductsCards from '../components/ProductsCards'
import AddProductCard from '../components/addProductCard'
import DeleteModal from '../components/deleteModal'
import { getProductos, deleteProductById } from '../firebase/cliente'
import { useEffect, useState } from 'react'

export default function AdminProducts () {
  const [isEmpty, setIsEmpty] = useState()
  const [productos, setProductos] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [productId, setProductId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  const handleEditProduct = (id) => {
    setProductId(id)
    setIsEditing(true)
    setShowModal(true)
  }
  const handleDeleteProduct = (id) => {
    setProductId(id)
    setShowDeleteModal(true)
  }
  const handleAddProduct = () => {
    setShowModal(true)
  }
  const handleContinueDelete = () => {
    deleteProductById(productId)
    setShowDeleteModal(false)
  }
  const handleCloseModal = () => {
    setIsEditing(false)
    setShowModal(false)
  }
  return (
        <>
        {isEmpty
          ? <> <AddProductCard handleAddProduct = {handleAddProduct} isEmpty={isEmpty} isEditing={isEditing} /></>
          : <main className='box-border overflow-auto p-10 h-screen'>

            <ul className="grid grid-cols-3 gap-5">
            <AddProductCard handleAddProduct={handleAddProduct} isEmpty={isEmpty} isEditing={isEditing} />
              {productos.map((producto) => (
                <ProductsCards key={producto.id} id={producto.id} data={producto.data} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct}/>
              ))}

            </ul>

        </main>
        }
        {showDeleteModal && <DeleteModal handleCloseDeleteModal = {() => setShowDeleteModal(false)} handleContinueDelete = {handleContinueDelete}/>}
        {showModal && <FormModal isEditing={isEditing} handleCloseModal = {handleCloseModal} id={productId}/>}
    </>
  )
}
