import { Link } from 'react-router-dom'
export default function MenuGeneralCard ({ categoria }) {
  return (
        <Link to={`/menu/${categoria.toLowerCase().replaceAll(' ', '')}`}className='p-5 hover:cursor-pointer my-2 mx-2 border-2 flex items-center'>
            <img src={categoria.replaceAll(' ', '') + 'Icon.png'} className='w-16'/>
            <h3 className="text-3xl ml-5">{categoria}</h3>
        </Link>
  )
}
