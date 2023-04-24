import { getCategorias } from '../firebase/cliente'
import { useState, useEffect } from 'react'

export default function useCategorias () {
  const [categorias, setCategorias] = useState()

  useEffect(() => {
    getCategorias().then((categorias) => setCategorias(categorias))
  }, [])

  return [categorias]
}
