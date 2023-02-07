import * as ethers from 'ethers';
import { ABIS } from './abi/index.js';

export function getContract(contractName: string, address: string) {
    const jsonProviderUrl: string = "https://data-seed-prebsc-1-s1.binance.org:8545/";
    if (ABIS[contractName] === undefined)
        throw ('Invalid contract');
    return new ethers.Contract(
        address,
        ABIS[contractName]?.interface,
        new ethers.providers['JsonRpcProvider'](jsonProviderUrl)
    )
}