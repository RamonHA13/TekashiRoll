import { useState } from 'react'

export default function useForm (initialValues) {
  const [value, setValue] = useState(initialValues)

  const handleChange = (e) => {
    const targetName = e.target.name
    const newValue = e.target.value

    if (targetName === 'descripcionProducto') {
      setValue(prevValue => ({
        ...prevValue,
        descripcionProductoInput: newValue
      }))
      return
    }
    if (targetName === 'nombreProducto') {
      setValue(prevValue => ({
        ...prevValue,
        nombreProductoInput: newValue
      }))
      return
    }
    if (targetName === 'precioProducto') {
      setValue(prevValue => ({
        ...prevValue,
        precioProductoInput: newValue
      }))
      return
    }
    if (targetName === 'subcategoriaProducto') {
      setValue(prevValue => ({
        ...prevValue,
        subcategoriaProductoInput: newValue
      }))
      return
    }
    if (targetName === 'nombreInput') {
      setValue(prevValue => ({
        ...prevValue,
        name: newValue
      }))
      return
    }
    if (targetName === 'apellidosInput') {
      setValue(prevValue => ({
        ...prevValue,
        lastNames: newValue
      }))
      return
    }
    if (targetName === 'emailInput') {
      setValue(prevValue => ({
        ...prevValue,
        email: newValue
      }))
      return
    }
    if (targetName === 'passwordInput') {
      setValue(prevValue => ({
        ...prevValue,
        password: newValue
      }))
      return
    }
    if (targetName === 'passwordValidationInput') {
      setValue(prevValue => ({
        ...prevValue,
        secondPassword: newValue
      }))
      return
    }
    if (targetName === 'phoneNumberInput') {
      setValue(prevValue => ({
        ...prevValue,
        phoneNumber: newValue
      }))
    }
  }

  return { value, handleChange }
}
