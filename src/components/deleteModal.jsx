import { TbAlertCircle } from 'react-icons/tb'
export default function DeleteModal ({ handleCloseDeleteModal, handleContinueDelete }) {
  return (
        <div className="absolute top-0 w-screen h-screen bg-black/[.44] flex flex-col items-center justify-center">
            <div className="relative w-1/4 bg-second-color rounded-lg">
                <div className="flex flex-col items-center p-10 shadow-2xl">
                    <TbAlertCircle className='text-main-color text-6xl mb-5' />
                    <h2 className='text-main-color'>¡ATENCION!</h2>
                    <p className='text-main-color'>Esta apunto de eliminar un producto</p>
                    <div >
                    <button onClick={handleContinueDelete} className='mr-5'> Continuar </button>
                    <button onClick={handleCloseDeleteModal}> Cancelar </button>
                    </div>
                </div>
            </div>
        </div>
  )
}
