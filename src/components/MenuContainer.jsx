export default function MenuContainer ({ children, grid }) {
  return (
        <div className={grid ? 'grid grid-cols-3 auto-rows-auto justify-items-center' : 'flex flex-col m-1.5'}>
            {children}
        </div>
  )
}
