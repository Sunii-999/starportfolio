export default function Navigation() {
  return (
    <div className='flex pl-5 pr-5 items-center justify-between h-16 bg-zinc-950 text-white w-full '>
        <p className="font-semibold"> Linda Zaeske. </p>

        <ul className='flex gap-5'>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
    </div>
  )
}
