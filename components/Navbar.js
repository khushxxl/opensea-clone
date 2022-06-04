import React from 'react'
import Image from 'next/image'
import { MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="bg-[#05111D] p-4 flex items-center justify-between sticky top-0 z-50 shadow-2xl ">
      <Link href={'/'}>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image
            src={require('../public/favicon.ico')}
            alt=""
            height={50}
            width={50}
          />
          <p className="text-white font-bold text-2xl ">OpenSea</p>
        </div>
      </Link>
      <div className="lg:flex items-center justify-evenly space-x-10 hidden">
        <div className="flex w-[600px]  bg-[#4C505C] text-gray-400 rounded-md items-center p-2 space-x-2">
          <SearchIcon className="h-5 w-5 " />
          <input
            type="text"
            placeholder="Search items,collections,and accounts"
            className=" flex bg-transparent flex-1  text-sm outline-none"
          />
        </div>

        <div className="flex items-center space-x-10">
          <Link href={'/explore'}>
            <p className=" text-gray-400 font-bold cursor-pointer hover:text-white">
              Explore
            </p>
          </Link>
          <p className=" text-gray-400 font-bold cursor-pointer hover:text-white">
            Stats
          </p>
          <p className=" text-gray-400 font-bold cursor-pointer hover:text-white">
            Resources
          </p>
          <p className=" text-gray-400 font-bold cursor-pointer hover:text-white">
            Create
          </p>
          <UserCircleIcon className="h-8 w-8 text-gray-400 cursor-pointer hover:text-white " />
        </div>
      </div>

      <div>
        <MenuIcon className="h-8 w-8 text-white lg:hidden cursor-pointer" />
      </div>
    </div>
  )
}

export default Navbar
