/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from 'react'

import { apesData } from '../utils/data'

import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress } from '../config.js'
import myData from '../utils/NFT.json'
import axios from 'axios'
import YourNfts from './YourNfts.js'
import { useRouter } from 'next/router'
import { NFTContext } from '../context/NFTContext'

const Collection = () => {
  const router = useRouter()

  const { account } = useContext(NFTContext)
  const shortenAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
  }
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
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

    const contract = new ethers.Contract(marketplaceAddress, myData.abi, signer)
    const data = await contract.fetchMarketItems()

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          title: meta.data.title,
          description: meta.data.description,
        }
        return item
      }),
    )

    setNfts(items)
    setLoadingState('loaded')

    console.log(items)
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, myData.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    })
    await transaction.wait()
    router.reload()
    loadNFTs()
  }
  return (
    <div className="mt-10">
      <p className="text-2xl font-bold text-white ml-20 mt-10">
        All NFTs Listed on the Marketplace👇
      </p>
      <div className=" grid grid-cols-1 mt-3 lg:grid-cols-3 space-y-5 place-items-center place-content-center">
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
                        {account != data.seller && (
                          <p
                            onClick={() => buyNft(data)}
                            className="text-sm font-bold tracking-wider mt-5 cursor-pointer text-blue-300"
                          >
                            Buy Now
                          </p>
                        )}
                        <p className="text-sm font-light tracking-wider text-white ">
                          Seller:{shortenAddress(data.seller)}
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
            <p className="text-xl font-light text-white m-5">
              No NFTs Listed in the Marketplace
            </p>
          </div>
        )}
      </div>
      <YourNfts />
    </div>
  )
}

export default Collection
