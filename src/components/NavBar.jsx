import React, { useEffect, useState } from 'react'
import logo from '../assets/images/tdm_icon.svg'
import { IoMdCloseCircleOutline, IoMdSearch } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

const NavBar = () => {

  const [navToggle, setNavToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchClose, setSearchClose] = useState(false)
  const { signOut, searchInput, setSearchInput, render, setRender } = useAuth()
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(null);
  const navigate = useNavigate()

  const handleScroll = () => {

    const currentScrollPos = window.scrollY

    if (currentScrollPos > prevScrollPos) {
      setVisible(false)
    } else {
      setVisible(true)
    }

    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
  })

  function handleSearch(e) {
    setSearchInput(e.target.value)
  }

  function handleEnterClick(e) {
    if (e.key === "Enter") {
      setRender(!render)

      navigate("searchresult")
    }

  }

  return (
    <>
      <section className={`hidden md:block sticky duration-500 z-10 ${visible ? 'top-0' : '-top-40 sticky'}`}>
        <nav className={`mainNav bg-[#15213A] h-20 flex justify-center items-center`}>
          <div className='max-w-[1280px] w-full h-full px-8 py-4 flex justify-between items-center gap-8 text-white'>
            <img onClick={() => navigate("/")} className='cursor-pointer' src={logo} alt="tandem-logo" width={50} height={50} />

            <div method='post' className='flex items-center justify-between md:w-[540px] h-full px-3 bg-white border border-1 border-gray-300 rounded-full'>
              <IoMdSearch className='text-xl text-gray-400 font-semibold mr-2' />
              <input
                className='bg-transparent h-10 outline-none w-full text-black'
                type="text"
                value={searchInput}
                onKeyDown={handleEnterClick}
                placeholder="Search for amazing products deals & more"
                onChange={handleSearch}
                name="search"
                id="search"
              />

              {
                searchInput && <button onClick={() => { setSearchInput("") }}>
                  <IoMdCloseCircleOutline className='text-lg text-gray-600 font-semibold' />
                </button>
              }
            </div>

            <div className='flex text-sm hover:text-gray-500 duration-100'>
              <NavLink to={"/profile"} className='hover:text-white duration-300 font-light px-5'> Profile <br /> <span className='font-semibold'>& Account</span> </NavLink>
              <NavLink to={"/saved"} className='hover:text-white duration-300 font-light px-5'> Save <br /> <span className='font-semibold'>Favorite</span> </NavLink>
              <NavLink to={"/weekly-reward"} className='hover:text-white duration-300 font-light px-5'> Weekly <br /> <span className='font-semibold'>Rewards</span> </NavLink>
            </div>

            <button type='button' onClick={signOut} className='text-sm duration-300 hover:text-gray-300 font-semibold border border-white hover:border-gray-300 rounded-full py-3 px-14'>Log Out</button>

          </div>
        </nav>
      </section>


      {/* responsive NavBar */}
      <section className='block md:hidden'>
        <nav className={`sticky bg-[#15213A] h-20 flex justify-center items-center duration-500 z-10`}>
          <div className='max-w-[1280px] w-full h-full p-4 flex justify-between items-center gap-8 text-white'>
            <img onClick={() => navigate("/")} className='cursor-pointer' src={logo} alt="tandem-logo" width={50} height={50} />

            <div className='flex justify-center items-center gap-2'>
              <div className='flex items-center justify-between md:w-[540px] h-fit p-2 bg-white border border-1 border-gray-300 rounded-full'>
                <IoMdSearch onClick={() => { setSearchToggle(true); setSearchClose(true) }} className='text-xl text-gray-400 font-semibold' />
                <input
                  className={`${searchToggle ? "w-auto ml-2" : "w-0"} bg-transparent duration-500 ease-in-out h-fit outline-none text-black placeholder:text-sm`}
                  type="text"
                  value={searchInput}
                  placeholder="Search for amazing products deals & more"
                  onKeyDown={() => { navigate("/search-results") }}
                  onChange={handleSearch}
                  name="search"
                  id="search"
                />

                {
                  searchClose && <button onClick={() => { setSearchToggle(false); setSearchClose(false) }}>
                    <IoMdCloseCircleOutline className='text-lg text-gray-400 font-semibold' />
                  </button>
                }

                {
                  searchInput && <button onClick={() => { setSearchInput(""); setSearchClose(false); setSearchToggle(false) }}>
                    <IoMdCloseCircleOutline className='text-lg text-gray-400 font-semibold' />
                  </button>
                }
              </div>

              {
                navToggle ? <AiOutlineClose onClick={() => setNavToggle(!navToggle)} className='text-white text-4xl' /> : <BiMenuAltRight onClick={() => setNavToggle(!navToggle)} className='text-white text-4xl' />
              }

            </div>


            <section className={`fixed flex flex-col gap-12 justify-center items-center text-xl top-20 duration-300 ${navToggle ? "right-0" : "-right-[600px]"} z-40 bg-blue-950/95 w-full h-[calc(100vh-5rem)]`}>
              <div className='flex flex-col gap-12 hover:text-gray-500 duration-100'>
                <NavLink to={"/profile"} className='hover:text-white duration-300 font-light px-5'> Profile <br /> <span className='font-semibold'>& Account</span> </NavLink>
                <NavLink to={"/saved"} className='hover:text-white duration-300 font-light px-5'> Save <br /> <span className='font-semibold'>Favorite</span> </NavLink>
                <NavLink to={"/weekly-reward"} className='hover:text-white duration-300 font-light px-5'> Weekly <br /> <span className='font-semibold'>Rewards</span> </NavLink>
              </div>

              <button type='button' onClick={signOut} className='duration-300 hover:text-gray-300 font-semibold border border-white hover:border-gray-300 rounded-full py-3 w-32'>Log Out</button>
            </section>

          </div>
        </nav>
      </section>

    </>
  )
}

export default NavBar