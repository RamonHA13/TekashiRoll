import { useEffect, useState } from 'react'
import { getCategorias, getProductos } from '../firebase/cliente'

export default function useProductos (categoria) {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])

  useEffect(() => {
    getProductos().then(producto => setProductos(producto))
    getCategorias().then(categoria => setCategorias(categoria))
    const formatedProductos = productos.map(producto => {
      const categoria = categorias.find(cat => cat.id === producto.data.categoria)
      const categoriaNombre = categoria ? categoria.data.Nombre : ''
      return {
        ...producto,
        data: {
          ...producto.data,
          categoria: categoriaNombre
        }
      }
    })

    setProductos(formatedProductos)
  }, [])

  return [productos]
}
