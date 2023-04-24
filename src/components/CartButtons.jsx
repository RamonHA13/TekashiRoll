import { useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

export default function CartButtons ({ cantidad }) {
  const [counter, setCounter] = useState(cantidad)
  return (
        <div className='flex justify-center items-center'>
          <button className='text-main-color mx-1 text-2xl hover:text-third-color hover:cursor-pointer 'onClick={() => setCounter(counter - 1)}><AiOutlineMinusCircle /></button>
                          <input onChange={() => {}} type='number' value={counter < 0 ? 0 && setCounter(0) : counter} className='appearance-none bg-white text-lg m-1 p-1 h-1/3 w-1/6 text-center' />
          <button onClick={() => setCounter(counter + 1)} className='text-main-color mx-1 text-2xl hover:text-third-color hover:cursor-pointer'><AiOutlinePlusCircle /></button>
        </div>
  )
}
