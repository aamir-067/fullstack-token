// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const contract1 = await ethers.getContractFactory("MyToken");
    const contract2 = await ethers.getContractFactory("PreSale");
    const contract3 = await ethers.getContractFactory("Stacking");
    const mytoken = await contract1.deploy(); 
    const presale = await contract2.deploy(mytoken.target); 
    const stacking = await contract3.deploy(mytoken.target);


    console.log("MyToken address : ", mytoken.target);
    console.log("presale address : ",presale.target);
    console.log("stacking address : ",stacking.target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
