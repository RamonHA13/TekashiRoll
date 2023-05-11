import { Link } from 'react-router-dom'

export default function AdminHeader () {
  return (
    <header className="flex justify-between bg-second-color px-5 py-5 h-16 items-center">
      <div className="flex items-center">
        <a href="/">
          <img src="/logo2.png" alt="brand logo" className="w-52 self-center" />
        </a>
      </div>
      <div>
        <Link to="/admin/statistics" className="text-white mr-5 hover:text-main-color">
          Estadisticas
        </Link>
        <Link to="/admin/products" className="text-white mr-5 hover:text-main-color">
          Productos
        </Link>
        <Link to="/admin/orders" className="text-white mr-20 hover:text-main-color">
          Ordenes
        </Link>
      </div>
    </header>
  )
}
