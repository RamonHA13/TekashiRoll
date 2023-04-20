import { Link } from 'react-router-dom'
export default function IntroSection () {
  return (
    <section className="flex flex-col content-center items-center m-16 p-10 relative border-solid border-2 border-third-color">
      <h2 className="text-xl">WELCOME TO</h2>
      <h1 className="text-7xl">TEKASHI ROLL</h1>
      <section className="p-6 flex flex-col relative ">
        <p className="w-3/4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, vitae. Possimus deserunt vero natus exercitationem praesentium dolorum ducimus necessitatibus obcaecati facilis ipsa vitae at provident voluptatibus recusandae, labore velit nulla. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et cumque quae consequuntur nostrum esse iure voluptas ea illum rem. Nisi sapiente illum odit voluptas tenetur consequatur accusamus laudantium. Saepe, in!</p>
        <button className="self-center p-3 mt-6 rounded-md border-main-color border-solid border-2 w-100 hover:bg-main-color" type="button"><Link to="/menu">Menu</Link></button>
      </section>
      <img src="/image1.png" alt="sushi promo" className="absolute w-1/6 opacity-70 right-10 top-32 " />
    </section>
  )
}
