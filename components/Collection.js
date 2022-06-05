/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { apesData } from '../utils/data'

const Collection = () => {
  return (
    <div className="mt-10">
      <div className=" grid grid-cols-1 lg:grid-cols-3 space-y-5 place-items-center place-content-center">
        {apesData.map((data) => {
          return (
            <div key={data.img}>
              <div className="">
                <img
                  src={data.img}
                  alt=""
                  className="w-[30wh] h-[300px]  rounded-t-xl cursor-pointer"
                />
                <div className="bg-[#2F3238] p-3 rounded-b-xl flex justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-gray-400">HAPE PRIME</p>
                      <img
                        src={'https://www.linkpicture.com/q/verify.png'}
                        alt=""
                        className="h-3 w-3"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-white font-bold tracking-wider">
                        {data.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold tracking-wider mt-5 text-blue-800 cursor-pointer hover:text-blue-300">
                        Buy Now
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 text-center">Price</p>
                    <div className="flex items-center">
                      <img
                        src="https://www.linkpicture.com/q/ethereum-3.png"
                        alt=""
                        className="h-5 w-5"
                      />
                      <p className="text-xs text-white font-bold tracking-wider">
                        {data.bid}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Collection
