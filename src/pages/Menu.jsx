import { useState, useEffect } from 'react'
import MenuGeneralCard from '../components/MenuGeneralCard'
import useCategorias from '../custom hooks/useCategorias'
import MenuContainer from '../components/MenuContainer'
import { useLocation } from 'react-router-dom'
import useProductos from '../custom hooks/useProductos'
import MenuProductsCards from '../components/MenuProductsCards'

export default function Menu ({ handleCartProducts }) {
  const [productos] = useProductos()
  const [bebidas, setBebidas] = useState(null)
  const [brochetas, setBrochetas] = useState(null)
  const [bolasFuego, setBolasFuego] = useState(null)
  const [yakimeshis, setYakimeshis] = useState(null)
  const [rollos, setRollos] = useState(null)
  const [categorias] = useCategorias()
  const [location, setLocation] = useState('/menu')
  const locationHook = useLocation()

  useEffect(() => {
    if (productos) {
      const filteredCategories = categorias?.filter(categoria => categoria.data.Nombre === 'Bebidas')
      const filteredProducts = productos?.filter(producto => producto.data.categoria === filteredCategories[0].id)
      setBebidas(filteredProducts)
    } else {
      console.log('No hay productos')
    }
  }, [locationHook.pathname])

  useEffect(() => {
    if (productos) {
      const filteredCategories = categorias?.filter(categoria => categoria.data.Nombre === 'Brochetas')
      const filteredProducts = productos?.filter(producto => producto.data.categoria === filteredCategories[0].id)

      setBrochetas(filteredProducts)
    } else {
      console.log('No hay productos')
    }
  }, [locationHook.pathname])
  useEffect(() => {
    if (productos) {
      const filteredCategories = categorias?.filter(categoria => categoria.data.Nombre === 'Bolas de fuego')
      const filteredProducts = productos?.filter(producto => producto.data.categoria === filteredCategories[0].id)

      setBolasFuego(filteredProducts)
    } else {
      console.log('No hay productos')
    }
  }, [locationHook.pathname])
  useEffect(() => {
    if (productos) {
      const filteredCategories = categorias?.filter(categoria => categoria.data.Nombre === 'Yakimeshi')
      const filteredProducts = productos?.filter(producto => producto.data.categoria === filteredCategories[0].id)

      setYakimeshis(filteredProducts)
    } else {
      console.log('No hay productos')
    }
  }, [locationHook.pathname])
  useEffect(() => {
    if (productos) {
      const filteredCategories = categorias?.filter(categoria => categoria.data.Nombre === 'Rollos')
      const filteredProducts = productos?.filter(producto => producto.data.categoria === filteredCategories[0].id)

      setRollos(filteredProducts)
    } else {
      console.log('No hay productos')
    }
  }, [locationHook.pathname])

  useEffect(() => {
    if (locationHook.pathname === '/menu' || locationHook.pathname === '/menu/vertodo') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/menu/bebidas') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/menu/brochetas') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/menu/bolasdefuego') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/menu/yakimeshi') {
      setLocation(locationHook.pathname)
    }
    if (locationHook.pathname === '/menu/rollos') {
      setLocation(locationHook.pathname)
    }
  }, [locationHook.pathname])
  return (
    <>
        <div className='flex flex-col border-solid border-2 border-black m-5'>
            <div className='flex justify-between items-center p-5 bg-second-color '>
                <h2 className='text-2xl text-white'>Pide tus alimentos</h2>
                <div className='flex justify-between w-1/4 items-center'>
                    <span className='bg-main-color hover:bg-third-color hover:cursor-pointer p-1.5 rounded'>Pide a domicilio</span>
                    <span className='text-white text-2xl italic'>O</span>
                    <span className='bg-main-color hover:bg-third-color hover:cursor-pointer p-1.5 rounded'>Recoge en tienda</span>
                </div>
            </div>
            {location === '/menu'
              ? <MenuContainer>
                {categorias && categorias.map(categoria => {
                  return (
                    <MenuGeneralCard
                    key={categoria.id}
                    categoria={categoria.data.Nombre}
                    />
                  )
                })}
            </MenuContainer>
              : null}
            {location === '/menu/bebidas'
              ? <MenuContainer grid={true}>
                  {bebidas && bebidas.map((bebida) => <MenuProductsCards handleCartProducts={handleCartProducts} key={bebida.id} producto = {bebida}/>)}
                </MenuContainer>
              : null}
            {location === '/menu/brochetas'
              ? <MenuContainer grid={true}>
                {brochetas && brochetas.map((brocheta) => <MenuProductsCards key={brocheta.id} producto = {brocheta}/>)}
              </MenuContainer>
              : null}
            {location === '/menu/bolasdefuego'
              ? <MenuContainer grid={true}>
                {bolasFuego && bolasFuego.map((bolaFuego) => <MenuProductsCards key={bolaFuego.id} producto = {bolaFuego}/>)}
              </MenuContainer>
              : null}
            {location === '/menu/yakimeshi'
              ? <MenuContainer grid={true}>
                {yakimeshis && yakimeshis.map((yakimeshi) => <MenuProductsCards key={yakimeshi.id} producto = {yakimeshi}/>)}
               </MenuContainer>
              : null}
            {location === '/menu/rollos'
              ? <MenuContainer grid={true}>
                {rollos && rollos.map((rollo) => <MenuProductsCards key={rollo.id} producto = {rollo}/>)}
              </MenuContainer>
              : null}
        </div>
    </>

  )
}
