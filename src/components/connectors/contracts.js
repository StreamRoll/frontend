const { ethers } = require("ethers");
const { factoryAbi } = require("../../abis/CloneFactory.json");
const { RINKEBY_CLONE_FACTORY } = require("../../constants/constants");
const { provider } = require("./providers");


const readOnlyFactoryContract = () => {
    return new ethers.Contract(RINKEBY_CLONE_FACTORY, factoryAbi, provider);
}
export const factoryContract = readOnlyFactoryContract();

// standar way to create a new contract from ethers. 
export const baseContract = (address, abi) => {
    return new ethers.Contract(address, abi, provider);
}