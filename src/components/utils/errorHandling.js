const { ethers } = require("ethers");

export const isSafeSelected = (safe) => {
    if (!ethers.utils.isAddress(safe)) {
        alert("You need to select a safe");
        return false;
    }
    return true;
}


