
import { FaCheckCircle } from 'react-icons/fa'
import { TbAlertCircle } from 'react-icons/tb'

export default function Modal ({ data, mensaje, icon, showButtons = false, handleCloseModal }) {
  return (
        <div className="absolute top-0 w-screen h-screen bg-black/[.44] flex flex-col items-center justify-center">
            <div className="relative w-1/4 bg-second-color rounded-lg">
                <div className="flex flex-col items-center p-10 shadow-2xl">
                    {icon === 'success' && <FaCheckCircle className='text-main-color text-6xl mb-5' /> }
                    {icon === 'alert' && <TbAlertCircle className='text-main-color text-6xl mb-5' /> }
                    <h2 className='text-main-color text-center'>{mensaje}</h2>
                    {data &&
                    <ul>
                        {console.log(data.orden.productos)}
                        {data.orden.productos.map((ref) => {
                          return <li className='text-white' key={ref.id}>{ref.nombre}</li>
                        })}
                    </ul>
                        }
                </div>
                {showButtons &&
                <div className='grid'>
                <button className="p-2 m-3 bg-main-color hover:bg-third-color rounded-md" onClick={() => handleCloseModal()}>Aceptar</button>
            </div>}
            </div>
        </div>
  )
}
