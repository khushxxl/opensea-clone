import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='bg-[url("../images/nike-bg.jpeg")] h-fit'>
      <div className="h-screen blue-glassmorphism lg:-mt-10  flex flex-col lg:flex-row items-center justify-center lg:justify-evenly space-y-10 lg:space-y-0 ">
        <div className="space-y-5 lg:space-y-10 mt-20 text-center lg:text-left">
          <p className="text-white text-2xl lg:text-5xl font-bold">
            Discover, collect, and sell <br /> extraordinary NFTs
          </p>

          <p className="text-gray-400 text-xl font-semibold">
            OpenSea is the {"world's"} first <br /> and largest NFT marketplace
          </p>
          <div className="flex items-center space-x-10 justify-center lg:justify-start">
            <Link href={'/explore'}>
              <div className=" bg-blue-500 w-[150px] text-center p-3 rounded-lg cursor-pointer">
                <p className="text-white">Explore</p>
              </div>
            </Link>
            <div className=" bg-gray-500 w-[150px] border-2 border-black text-center p-3 rounded-lg cursor-pointer">
              <p className="text-white">Create</p>
            </div>
          </div>
        </div>

        <div className="mr-10 ml-10">
          <div className="flex flex-col bg-gray-600 rounded-lg">
            <Image
              src={require('../images/nike-bg.jpeg')}
              alt=""
              height={400}
              width={450}
              className="rounded-t-lg"
            />

            <div className="p-2 flex items-center space-x-2">
              <Image
                src={
                  'https://lh3.googleusercontent.com/-j4h0B8cXDX2PqNlKf5DQQU9BJpJKv-FuW2q9zx2RNlG1cbgpBSsGck1UlZ2Z86Cm-ciw69OwstV_dH79HZ-idPunP9mkoSdxvABHU4=s168'
                }
                alt=""
                height={50}
                width={50}
                className="rounded-full w-fit"
              />

              <div>
                <p className="text-white font-bold">Nike #1894</p>
                <p className="text-blue-400 text-sm font-semibold">
                  Nike CryptoKicks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
