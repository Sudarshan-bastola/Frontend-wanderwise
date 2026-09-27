import CustomButton from "./CustomButton"


const Navbar = () => {
  return (
      <header className='flex items-center justify-between border border-green-500 py-3.5 px-19 bg-purple-400' >
          {/* left part */}
          <div>
              <h1 className=' text-fuchsia-900 text-4xl font-bold'>Wanderwise</h1>
          </div>
          {/* right part */}
          <div className='flex items-center justify-between gap-10 '>
              <nav className='space-x-10 font-semibold text-lg transition [&>a]:hover:text-purple-500'>
                  <a href="">Home</a>
                  <a href="/about">About</a>
                  <a href="/contact">Contact</a>
              </nav>

             <CustomButton text= "log in" link="/login" />

          </div>
     </header>
  )
}

export default Navbar