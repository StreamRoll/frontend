
const { ethers } = require("ethers");
const { cErcAbi, erc20Abi, cEthAbi } = require("../../abis/mainAbis.json");
const { baseContract } = require("../../components/connectors/contracts");
const { RINKEBY_C_ETH } = require("../../constants/constants");
const { RINKEBY_C_DAI } = require("../../constants/constants");
const { RINKEBY_DAI} = require("../../constants/constants");
const { provider } = require("../connectors/providers");

export const cEtherTotalBalance = async (address) => {
    const cEth = baseContract(RINKEBY_C_ETH, cErcAbi);
    const result = await cEth.callStatic.balanceOf(address) / 1e8; // 8 decimals
    return result.toString();
}

export const _ethBalance = async (address) => {
    const _balance = await provider.getBalance(address);
    const balance = ethers.utils.formatEther(_balance);
    return balance.toString();
}
//////////!WARNING /////////////////////////////
//Not precise, the approximations were done for the demonstration.. 
export const maxDaiToBorrow = async (address) => {
    const cEth = await cEtherTotalBalance(address);
    const borrowedDai = await daiBorrowedBalance(address);
    const collateralFactor = .7 //not true
    const ethToDai = 100 // not true
    const exRate = await exchangeRate(address);
    const totalEth = Number(cEth / exRate);
    const result = (Number(totalEth) * ethToDai) - Number(borrowedDai);
    return result;
}

export const daiTotalBalance = async (address) => {
    const contract = await baseContract(RINKEBY_DAI, cEthAbi, provider);
    const result = await contract.balanceOf(address) / 1e18;
    return result.toString();
}

export const daiBorrowedBalance = async (address) => {
    const contract = await baseContract(RINKEBY_C_DAI, cEthAbi, provider);
    const result = await contract.borrowBalanceStored(address) / 1e18;
    return result.toString();
}

export const etherBorrowedBalance = async (address) => {
    const contract = await baseContract(RINKEBY_C_ETH, cEthAbi, provider);
    const result = await contract.borrowBalanceStored(address) / 1e8;
    return result.toString();
}

// Compound exchange rate between the underlying asset
export const exchangeRate = async (address) => {
    const contract = await baseContract(RINKEBY_C_ETH, cEthAbi, provider);
    const result = await contract.exchangeRateStored() / 1e25;
    return result.toString();
}

// returns total amount supplied converted to eth.
export const etherSuppliedBalance = async (address) => {
    const contract = await baseContract(RINKEBY_C_ETH, cEthAbi, provider);
    const _result = await contract.getAccountSnapshot(address) ;
    const _exchangeRate = await exchangeRate(address);
    const result = (_result[1] / _exchangeRate) / 1e8;
    return result.toString();
}

export const daiSuppliedBalance = async (address) => {
    const contract = await baseContract(RINKEBY_C_DAI, cEthAbi, provider);
    const _result = await contract.getAccountSnapshot(address);
    const result = _result[1];
    return result.toString();
}

