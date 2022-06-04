/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Strap = () => {
  return (
    <div className="ml-8 mt-4 w-fit flex items-center space-x-10">
      <div className="flex items-center flex-col ">
        <p className="text-2xl font-bold text-white">8.2k</p>
        <p className="text-normal font-semibold text-gray-400 tracking-wide">
          items
        </p>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-2xl font-bold text-white">4.8k</p>
        <p className="text-normal font-semibold text-gray-400 tracking-wide">
          owners
        </p>
      </div>
      <div className="flex items-center flex-col">
        <div className="flex items-center">
          <img
            src="https://www.linkpicture.com/q/ethereum-3.png"
            alt=""
            className="h-5 w-5"
          />
          <p className="text-2xl font-bold text-white">8.2k</p>
        </div>
        <p className="text-normal font-semibold text-gray-400 tracking-wide">
          floor price
        </p>
      </div>
      <div className="lg:flex items-center flex-col hidden ">
        <div className="flex items-center">
          <img
            src="https://www.linkpicture.com/q/ethereum-3.png"
            alt=""
            className="h-5 w-5"
          />
          <p className="text-2xl font-bold text-white">54.4k</p>
        </div>
        <p className="text-normal font-semibold text-gray-400 tracking-wide">
          total volume
        </p>
      </div>
    </div>
  )
}

export default Strap
