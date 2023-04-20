import { FaCheckCircle } from 'react-icons/fa'
export default function Modal () {
  return (
        <div className="absolute top-0 w-screen h-screen bg-black/[.44] flex flex-col items-center justify-center">
            <div className="relative w-1/4 bg-second-color rounded-lg">
                <div className="flex flex-col items-center p-10 shadow-2xl">
                    <FaCheckCircle className='text-main-color text-6xl mb-5' />
                    <h2 className='text-main-color'>Usuario registrado exitosamente</h2>
                </div>
            </div>
        </div>
  )
}
