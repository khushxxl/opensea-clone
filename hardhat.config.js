require('@nomiclabs/hardhat-waffle')

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url:
        'https://eth-rinkeby.alchemyapi.io/v2/84QznWTEamOBgmDEEUnqZhZ4SUhZQF73',
      accounts: [
        '5957a3cd3e4c8f220ed43435153eab787d35c1bb10263932d515241d5baa5ccd',
      ],
    },
    hardhat: {
      chainId: 31337,
    },
    //  unused configuration commented out for now
    // mumbai: {
    //   url: 'https://rpc-mumbai.maticvigil.com',
    //   accounts: [
    //     '5957a3cd3e4c8f220ed43435153eab787d35c1bb10263932d515241d5baa5ccd',
    //   ],
    // },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

// PRIVATE_KEY = 5957a3cd3e4c8f220ed43435153eab787d35c1bb10263932d515241d5baa5ccd
// CONTRACT_URL=https://eth-ropsten.alchemyapi.io/v2/84QznWTEamOBgmDEEUnqZhZ4SUhZQF73
