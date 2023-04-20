import { useState, useEffect } from 'react'
import useForm from '../custom hooks/useForm'
import Modal from '../components/Modal'
import { createUser } from '../firebase/cliente'
import { useNavigate } from 'react-router-dom'

export default function SignUp () {
  const [isValid, setValidation] = useState(true)
  const [isRegistered, setRegister] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const { value, handleChange } = useForm({
    name: '',
    lastNames: '',
    email: '',
    password: '',
    secondPassword: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRegistered) {
        setShowModal(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        setShowModal(false)
        return null
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [isRegistered])

  const validatePassword = () => {
    if (typeof value.password !== 'string' && typeof value.secondPassword !== 'string') {
      throw new Error('Invalid password')
    }
    value.password.includes(value.secondPassword) ? setValidation(true) : setValidation(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    validatePassword()

    if (isValid) {
      setRegister(true)
      createUser(value)
    }
  }

  return (
        <div className="flex flex-col bg-second-color h-screen justify-center items-center">
            <img src="/footerLogo.png" alt="TEKASHI LOGO" className="w-1/6" />
            <div className="mt-5 border-solid border-2 border-third-color flex flex-col items-center p-5 text-white ">
                <h2>Create Account</h2>
                <form action="" className="flex flex-col mt-5 " onSubmit={handleSubmit}>
                    <label htmlFor="nombreInput">Nombre</label>
                    <input type="text"name="nombreInput" required value={value.name} onChange={handleChange} className="text-black p-0.5 ps-1.5"/>
                    <label htmlFor="apellidosInput">Apellidos </label>
                    <input type="text"name="apellidosInput" required value={value.lastNames} onChange={handleChange} className="text-black p-0.5 ps-1.5"/>
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" name="emailInput" required value={value.email} onChange={handleChange} className="text-black p-0.5 ps-1.5"/>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password"name="passwordInput" required value={value.password} onChange={handleChange} className="text-black p-0.5 ps-1.5"/>
                    <label htmlFor="passwordValidationInput">Enter the password again</label>
                    <input type="password" required name="passwordValidationInput" value={value.secondPassword} onChange={handleChange} className="text-black p-0.5 ps-1.5"/>
                    {!isValid && <span className='text-yellow-300'>Contraseña incorrecta!!!</span>}
                    <input type="submit" value="Continue" className="mt-5 hover:cursor-pointer" />
                </form>
                {showModal ? <Modal /> : null }

            </div>
        </div>
  )
}
