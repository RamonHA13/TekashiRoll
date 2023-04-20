
import useForm from '../custom hooks/useForm'
import { userLogin } from '../firebase/cliente'
import { Link, useNavigate } from 'react-router-dom'

export default function Login () {
  const { value, handleChange } = useForm({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    userLogin(value)
    navigate('/')
  }

  return (
    <div className="flex flex-col bg-second-color h-screen justify-center items-center">
        <img src="/footerLogo.png" alt="TEKASHI LOGO" className="w-1/6" />
        <div className="mt-5 border-solid border-2 border-third-color flex flex-col items-center p-5 text-white ">
            <h2>Log in</h2>
            <form action="" className="flex flex-col mt-5 " onSubmit={handleSubmit}>

                <label htmlFor="emailInput">Email</label>
                <input type="email" name="emailInput" required value={value.email} onChange={handleChange} className="text-black p-0.5 ps-1.5"/>
                <label htmlFor="passwordInput">Password</label>
                <input type="password" name="passwordInput" required value={value.password} onChange={handleChange} className="text-black p-0.5 ps-1.5"/>
                <input type="submit" value="Continue" className="mt-5 hover:cursor-pointer" />
                <Link to="/signup" className=''>create account</Link>
            </form>
        </div>
    </div>
  )
}
