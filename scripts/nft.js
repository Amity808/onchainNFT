const hre = require("hardhat");

async function main() {
    const OnChainNFt = await hre.ethers.getContractFactory("OnchainNft");

    const onChainNFt = await OnChainNFt.deploy();

    await onChainNFt.waitForDeployment();

    const nftAddress = await onChainNFt.getAddress();

    const contractdeployAddress = "0xD377C8688B7A9DBB62587A994Aa7e2e4aB897D21"

    console.log(`Deploy contract to ${nftAddress.toString()}`);

    const [owner, otherAccount] = await ethers.getSigners();
    const svgBase = "PHN2ZyBoZWlnaHQ9IjEwMCIgd2lkdGg9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIHI9IjQ1IiBjeD0iNTAiIGN5PSI1MCIgc3Ryb2tlPSJncmVlbiIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJyZWQiIC8+CiAgPHRleHQ+SSB3ZWIzYnJpZGdlPC90ZXh0Pgo8L3N2Zz4g"

    const mintNFt = await onChainNFt.mintNft(svgBase)

    await mintNFt.wait();
    console.log("NFT minted!", mintNFt);
}

main().catch((error) => {
    console.log(error);
    process.existCode = 1;
}) 