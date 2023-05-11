
import ProductosMasVendidosGraph from './Graficos/ProductosMasVendidos'
import ProductosVendidosPorMesGraph from './Graficos/ProductosVendidosPorMes'
import VentasPorMesGraph from './Graficos/VentasPorMes'
import VisitasPorMesGraph from './Graficos/VisitasPorMes'
export default function AdminStatistics () {
  return (
    <div className="h-screen">
      <h2 className='text-2xl text-center font-bold mt-5'>Estadisticas</h2>
      <ul className='grid grid-cols-2 place-items-center gap-5 h-full '>
        <li className='w-1/2 h-full'>
          <ProductosMasVendidosGraph />
        </li>
        <li className='w-3/4 h-full'>
          <VentasPorMesGraph titulo='Ventas por mes'/>
        </li>
        <li className='w-3/4 h-full'>
         <ProductosVendidosPorMesGraph titulo='Total de producto vendidos por mes'/>
        </li>
        <li className='w-3/4 h-full'>
          <VisitasPorMesGraph titulo='Visitas a la app por mes'/>
        </li>
      </ul>
    </div>
  )
}
