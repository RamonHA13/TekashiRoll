import { Link } from 'react-router-dom'
import { BsFillCartPlusFill, BsSearch } from 'react-icons/bs'
export default function ClienHeader ({ isAdmin, handleShowAdminHeader, handleSignOff, user }) {
  return (
    <header className="flex justify-between bg-second-color px-5 py-5 h-16 items-center">
    <a href="/"><img src="/logo2.png" alt="brand logo"className="w-52 self-center"/></a>
    <nav className="flex ">
        <ul className="flex">
            <li>
            <Link to="/" className="px-5 border-r-2 border-black text-slate-50 hover:text-main-color">Home</Link>
            </li>
            <li>
            <Link to="/menu" className="px-5 border-r-2 border-black text-slate-50 hover:text-main-color">Menu</Link>
            </li>
            <li>
            <Link to="/contact" className="px-5 text-slate-50 hover:text-main-color">Contact</Link>
            </li>
        </ul>
    </nav>
    <nav>
        <ul className="flex items-center">
            <li><button className="px-5 text-slate-50 hover:text-main-color text-xl"><BsSearch /></button></li>
            {isAdmin && <li><Link onClick={handleShowAdminHeader} to="/admin" state={{ isAdmin }} className="px-5 text-slate-50 hover:text-main-color ">Console</Link></li>}
            { user ? <li> <button onClick = {handleSignOff}className="px-5 text-slate-50 hover:text-main-color ">Sign off</button> </li> : <li><Link to="/login"className="px-5 text-slate-50 hover:text-main-color">Log in</Link></li>}
            <li><Link to="/cart" className="px-5 mr-5 text-slate-50 hover:text-main-color text-xl"><BsFillCartPlusFill /></Link></li>
        </ul>
    </nav>
</header>
  )
}
