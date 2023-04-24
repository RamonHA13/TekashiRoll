import { Link } from 'react-router-dom'
import useCategorias from '../custom hooks/useCategorias'

export default function IndexMenu () {
  const [categorias] = useCategorias()
  return (
        <ul className="flex relative p-3 bg-fourth-color">
          <li className='px-3 border-r-2 border-black hover:cursor-pointer hover:text-white'><Link to='/menu'>Ver Todos</Link></li>
          {categorias && categorias.map((categoria) => <li key={categoria.id} className='px-3 border-r-2 border-black last:border-r-0 hover:cursor-pointer hover:text-white'><Link to={`/menu/${categoria.data.Nombre.toLowerCase().replaceAll(' ', '')}`}>{categoria.data.Nombre}</Link></li>)}
        </ul>
  )
}
