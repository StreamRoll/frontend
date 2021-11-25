
const { ethers } = require("ethers");

const { cErcAbi, erc20Abi } = require("../../abis/mainAbis.json");
const { baseContract } = require("../../components/connectors/contracts");
const { RINKEBY_C_ETH } = require("../../constants/constants");
const { RINKEBY_DAI} = require("../../constants/constants");


export const cEthBalance = async (address) => {
    const cEth = baseContract(RINKEBY_C_ETH, cErcAbi);
    const result = await cEth.callStatic.balanceOf(address) / 1e8;
    return result.toString();
}

export const daiBalance = async (address) => {
    const dai = baseContract(RINKEBY_DAI, erc20Abi);
    const result = await dai.callStatic.balanceOf(address) / 1e18;
    return result.toString();
}
