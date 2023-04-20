import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function Footer () {
  return (
        <footer className="px-5 pt-5 bg-orange-800 relative w-full botton-full z-10">
            <section className="flex flex-col items-center">
                <div className='flex flex-col items-center'>
                    <img src="./footerLogo.png" alt="brand logo" className="w-1/5"/>
                </div>
                <ul className='flex h-14'>
                    <li className='flex items-center'><Link className="text-3xl text-slate-50 hover:text-main-color mx-2"><FaInstagram /></Link></li>
                    <li className='flex items-center'><Link className="text-3xl text-slate-50 hover:text-main-color mx-2"><FaFacebook /></Link></li>
                </ul>
            </section>
            <nav className='flex justify-center pt-5 pb-2'>
                <ul className='flex'>
                    <li><Link className='px-5 border-r-2 border-black text-slate-50 hover:text-main-color'to='/'>Home</Link></li>
                    <li><Link className='px-5 border-r-2 border-black text-slate-50 hover:text-main-color'>About us</Link></li>
                    <li><Link className='px-5 border-r-2 border-black text-slate-50 hover:text-main-color'>Privacity</Link></li>
                    <li><Link className='px-5 border-r-2 border-black text-slate-50 hover:text-main-color'>Terms and conditions</Link></li>
                    <li><Link className='px-5  text-slate-50 hover:text-main-color'>Contact</Link></li>
                </ul>
            </nav>
        </footer>
  )
}
