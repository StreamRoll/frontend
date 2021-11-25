
const { ethers } = require("ethers");

const url = "https://rinkeby.infura.io/v3/2598d2302edb4d26914e38c5759fbbcb";

const ethersProvider = () => {
    const result = new ethers.providers.JsonRpcProvider(url);
    return result;
}

export const provider = ethersProvider();

