
export default function ProductsCards ({ id, data, handleEditProduct, handleDeleteProduct }) {
  const handleClickEdit = () => {
    handleEditProduct(id)
  }
  const handleClickDelete = () => {
    handleDeleteProduct(id)
  }
  return (
    <>
        <li className="bg-second-color h-[305px] rounded-xl shadow-lg shadow-second-color">
            <div className="overflow-hidden h-1/2">
                <img src={data.imgUrl} alt="productImg" className="h-full w-full object-cover rounded-t-xl" />
            </div>
            <div className="p-2 ">
                <h2 className="text-center text-lg text-white ">{data.nombre}</h2>
                <h3 className="text-neutral-300">${data.precio}</h3>
                <p className="text-neutral-300">{data.descripcion}</p>
                <span>more info</span>
                <div className=" flex justify-end text-black">
                    <button onClick={handleClickDelete}className="mr-5 p-1 w-1/6 rounded border-solid border-2 border-third-color bg-main-color hover:bg-main-color/[.90]">DELETE</button>
                    <button onClick={handleClickEdit} className="mr-5 p-1 w-1/6 rounded border-solid border-2 border-third-color bg-main-color hover:bg-main-color/[.90]">EDIT</button>
                </div>
            </div>
        </li>

    </>

  )
}
