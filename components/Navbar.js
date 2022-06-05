import React, { useContext } from 'react'
import Image from 'next/image'
import { MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Modal from './Modal'
import { NFTContext } from '../context/NFTContext'

const Navbar = () => {
  const { modal, setModal, account, connectWallet } = useContext(NFTContext)
  const shortenAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
  }

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
          <p
            onClick={() => {
              if (modal == true) {
                setModal(false)
              } else if (modal === false) {
                setModal(true)
              }
            }}
            className=" text-gray-400 font-bold cursor-pointer hover:text-white"
          >
            Create
          </p>
          {/* <UserCircleIcon className="h-8 w-8 text-gray-400 cursor-pointer hover:text-white " /> */}

          <div className="">
            {account ? (
              <div className="p-2 bg-black text-white rounded-full">
                <p className="cursor-pointer">{shortenAddress(account)}</p>
              </div>
            ) : (
              <p
                onClick={connectWallet}
                className="text-gray-400 font-bold cursor-pointer hover:text-white"
              >
                {'Connect Wallet'}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <MenuIcon className="h-8 w-8 text-white lg:hidden cursor-pointer" />
      </div>

      <Modal />
    </div>
  )
}

export default Navbar
