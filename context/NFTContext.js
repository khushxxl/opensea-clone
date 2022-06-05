import React, { useState, useEffect } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { abi, marketplaceAddress } from '../config'

export const NFTContext = React.createContext()

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    marketplaceAddress,
    abi,
    signer,
  )
  return transactionContract
}

const NFTProvider = ({ children }) => {
  const [modal, setModal] = useState(false)
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: 'INFURA_ID', // required
      },
    },
  }

  const [account, setAccount] = useState('')

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        providerOptions,
        cacheProvider: true,
        disableInjectedProvider: false,
      })

      const instance = await web3Modal.connect().catch((e) => console.log(e))

      const provider = (await new ethers.providers.Web3Provider(instance)) || ''
      const signer = provider.getSigner()
      setAccount((await signer.getAddress()).toString()), console.log(account)
      console.log(account)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    connectWallet()
  })

  return (
    <NFTContext.Provider value={{ modal, setModal, connectWallet, account }}>
      {children}
    </NFTContext.Provider>
  )
}

export default NFTProvider
