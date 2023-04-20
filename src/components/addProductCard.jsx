import { CiCirclePlus } from 'react-icons/ci'
export default function AddProductCard ({ handleAddProduct, isEmpty }) {
  return (
    <div className={isEmpty ? 'h-screen flex justify-center items-center ' : null}>
      <div onClick={handleAddProduct} className={isEmpty ? 'h-3/4 w-1/6 border-solid border-2 border-third-color hover:cursor-pointer hover:bg-main-color/[.25] flex flex-col items-center justify-center' : 'rounded-xl w-full h-[305px]  place-content-center justify-items-center border-solid border-2 border-third-color hover:cursor-pointer hover:bg-main-color/[.25] flex flex-col items-center justify-center'}>
        <CiCirclePlus className='text-6xl text-third-color' />
        <h2>Add product</h2>
    </div>
</div>)
}
