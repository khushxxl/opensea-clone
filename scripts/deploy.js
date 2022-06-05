const hre = require('hardhat')
const fs = require('fs')

async function main() {
  const NFT = await hre.ethers.getContractFactory('NFTMarketplace')
  const nft = await NFT.deploy()

  await nft.deployed()

  console.log('NFT Contract deployed to:', nft.address)

  fs.writeFileSync(
    './config.js',
    `
  export const marketplaceAddress = "${nft.address}"
  `,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
