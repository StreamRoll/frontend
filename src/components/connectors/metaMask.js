
// For rinkeby
const { ethers } = require("ethers");

export const connectMetaMaskAccount = async () => {
    await window.ethereum.enable();
    const metaMaskProvider = new ethers.providers.Web3Provider(
        window.ethereum,
        "rinkeby"
      );
    await metaMaskProvider.send("eth_requestAccounts");
  }

const metaMaskSigner = () => {
    const provider = new ethers.providers.Web3Provider(
        window.ethereum, 
        "rinkeby"
    );
    return provider.getSigner();
}

export const signer = metaMaskSigner();
