/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { NFTContext } from '../context/NFTContext'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress } from '../config.js'
import data from '../utils/NFT.json'
import { useRouter } from 'next/router'

export default function Modal() {
  // const getEthereumContract = () => {
  //   const provider = new ethers.providers.Web3Provider(ethereum)
  //   const signer = provider.getSigner()
  //   const transactionContract = new ethers.Contract(
  //     marketplaceAddress,
  //     data.abi,
  //     signer,
  //   )
  //   return transactionContract
  // }
  // const [contract, setContract] = useState()

  // async function fetchData() {
  //   const myContract = await getEthereumContract()
  //   setContract(myContract)
  // }

  // useEffect(() => {
  //   fetchData()
  // })

  const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

  const { modal, setModal } = useContext(NFTContext)
  const [fileUrl, setFileUrl] = useState(null)
  const priceRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()

  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function uploadToIPFS() {
    if (
      !titleRef.current.value ||
      !descRef.current.value ||
      !priceRef.current.value ||
      !fileUrl
    )
      return
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      title: titleRef.current.value,
      description: descRef.current.value,
      image: fileUrl,
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    let contract = new ethers.Contract(marketplaceAddress, data.abi, signer)

    /* create the NFT */
    const price = ethers.utils.parseUnits(priceRef.current.value, 'ether')
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, {
      value: listingPrice,
    })
    await transaction.wait()
  }

  return (
    <>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl ">
              {/*content*/}
              <div className="w-full">
                <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-white text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Enter Title"
                      ref={titleRef}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-white text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Description
                    </label>
                    <input
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      placeholder="Enter Description"
                      ref={descRef}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-white text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      placeholder="Enter Price in ETH"
                      ref={priceRef}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="file"
                      name="Asset"
                      className="my-4 text-white"
                      onChange={onChange}
                    />
                    {fileUrl && (
                      <img
                        className="rounded mt-4"
                        width="100"
                        src={fileUrl}
                        alt=""
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={listNFTForSale}
                    >
                      Upload
                    </button>
                    <a
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      href="#"
                      onClick={() => {
                        setModal(false)
                      }}
                    >
                      Close
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
