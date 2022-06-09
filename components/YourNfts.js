/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress } from '../config.js'
import myData from '../utils/NFT.json'
import axios from 'axios'
import { useRouter } from 'next/router'

const YourNfts = () => {
  const shortenAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
  }
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      myData.abi,
      signer,
    )
    const data = await marketplaceContract.fetchMyNFTs()

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenURI)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          tokenURI,
        }
        return item
      }),
    )
    setNfts(items)
    setLoadingState('loaded')
  }
  function listNFT(nft) {
    router.push(`/resellNFT?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }
  return (
    <div className="">
      <div>
        <p className="text-2xl font-bold text-white ml-20 mt-10">
          NFTs owned by you 👇
        </p>

        <div className=" grid grid-cols-1 mt-5 lg:grid-cols-3 space-y-5 place-items-center place-content-center">
          {nfts.length > 0 ? (
            nfts.map((data) => {
              return (
                <div key={data.image}>
                  <div className="">
                    <img
                      src={data.image}
                      alt=""
                      className="w-[30wh] h-[300px]  rounded-t-xl cursor-pointer"
                    />
                    <div className="bg-[#2F3238] p-3 rounded-b-xl flex justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-400">Hape Prime</p>
                          <img
                            src={'https://www.linkpicture.com/q/verify.png'}
                            alt=""
                            className="h-3 w-3"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-white font-bold tracking-wider">
                            {data.title}
                          </p>
                          <p className="text-xs text-white font-bold tracking-wider">
                            {data.description}
                          </p>
                        </div>

                        <div className="">
                          <p
                            onClick={() => listNFT(data)}
                            className="text-sm cursor-pointer  font-bold tracking-wider mt-1  text-blue-300"
                          >
                            List this to Marketplace
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400 text-center">
                          Price
                        </p>
                        <div className="flex items-center">
                          <img
                            src="https://www.linkpicture.com/q/ethereum-3.png"
                            alt=""
                            className="h-5 w-5"
                          />
                          <p className="text-xs text-white font-bold tracking-wider">
                            {data.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>
              <p className="text-xl font-bold text-white">No NFTs purchased</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default YourNfts
