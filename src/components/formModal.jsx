import { IoMdClose } from 'react-icons/io'
import { getCategorias, uploadProductImage, addProduct, editProductById } from '../firebase/cliente'
import { useEffect, useState } from 'react'
import useForm from './../custom hooks/useForm'
import createEditData from '../utils/createEditData'

export default function FormModal ({ handleCloseModal, isEditing, id }) {
  const [categorias, setCategorias] = useState([])
  const [categoriaSelected, setCategoriaSelected] = useState()
  const [imgSelected, setImgSelected] = useState(null)
  const { value, handleChange } = useForm({
    nombreProductoInput: '',
    precioProductoInput: '',
    subcategoriaProductoInput: '',
    descripcionProductoInput: ''
  })

  useEffect(() => {
    getCategorias()
      .then((data) => setCategorias(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing === true) {
      const data = createEditData({
        nombre: value.nombreProductoInput,
        precio: value.precioProductoInput,
        subcategoria: value.subcategoriaProductoInput,
        descripcion: value.descripcionProductoInput,
        imgUrl: imgSelected,
        categoria: categoriaSelected
      })
      editProductById({ id, data }).then(handleCloseModal)
    } else {
      addProduct({
        nombre: value.nombreProductoInput,
        precio: value.precioProductoInput,
        subcategoria: value.subcategoriaProductoInput,
        descripcion: value.descripcionProductoInput,
        imgUrl: imgSelected,
        categoria: categoriaSelected
      }).then(handleCloseModal)
    }
  }
  const selectHandleChange = (e) => {
    const categoria = e.target.value
    setCategoriaSelected(categoria)
  }
  const fileHandleChange = (e) => {
    const file = e.target.files[0]
    const fileType = file.type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']

    if (!validImageTypes.includes(fileType)) {
      alert('El archivo seleccionado no es una imagen.')
      file.value = '' // Limpiar el input file para que el usuario pueda volver a seleccionar un archivo válido
    } else {
      try {
        uploadProductImage(file, value.nombreProductoInput).then(url => {
          setImgSelected(url)
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
        <div className="absolute top-0 w-screen h-screen bg-black/[.44] flex flex-col items-center justify-center">
            <div className="relative  bg-second-color rounded-lg">
                <div className="flex flex-col items-center p-5 shadow-2xl ">
                    <IoMdClose className='absolute right-5 text-2xl hover:cursor-pointer' onClick={handleCloseModal}/>
                    <h2 className='text-white'>{isEditing ? 'Editar producto' : 'Agrega un producto'}</h2>
                    <form action="" className=' flex flex-col mt-5' onSubmit={handleSubmit}>
                        <label htmlFor="nombreProducto" className='text-white py-1' >Nombre del producto</label>
                        <input type="text" name='nombreProducto'className='ps-1'onChange={handleChange} value={value.nombreProductoInput} />
                        <label htmlFor="precioProducto" className='text-white py-1'>Precio del producto</label>
                        <input type="text" name='precioProducto'className='ps-1'onChange={handleChange} value={value.precioProductoInput} />
                        <label htmlFor="categoriaProducto" className='text-white py-1'>Categoria del producto</label>
                        <select name="categoriaProducto" onChange={selectHandleChange} >
                            <option value=''>Selecciona una categoria</option>
                            {categorias.map((categoria) => {
                              return <option value={categoria.id} key={categoria.id}>{categoria.data.Nombre}</option>
                            })}
                        </select>
                        <label htmlFor="subcategoriaProducto" className='text-white py-1'>Subcategoria del producto</label>
                        <input type="text" name='subcategoriaProducto'className='ps-1' onChange={handleChange} value={value.subcategoriaProductoInput}/>
                        <label htmlFor="imagenProducto" className='text-white py-1'>Seleccione una imagen del producto</label>
                        <input type="file" name="imagenProducto" onChange={fileHandleChange} />
                        <label htmlFor="descripcionProducto" className='text-white py-1'>Descripción del producto</label>
                        <textarea name="descripcionProducto" id="" cols="40" rows="10" className='resize-none ps-1' onChange={handleChange} value={value.descripcionProductoInput}></textarea>
                        <input type="submit" value={isEditing ? 'Editar producto' : 'Añadir Producto'} className='text-white hover:cursor-pointer mt-5'/>
                    </form>
                </div>
            </div>
        </div>
  )
}
