import * as ethers from 'ethers';
import { ABIS } from './abis/index.js';
import { addressConfig } from './addresses/index.js';
import { CHAINS, CHAIN_IDS } from './chains.js';

export function useContract(contractName: string, address: string, providerUrl: string): ethers.Contract | undefined {
    if (ABIS[contractName] === undefined) return;
    return new ethers.Contract(
        address,
        ABIS[contractName]?.interface,
        new ethers.providers['JsonRpcProvider'](providerUrl)
    )
}

export function useQueryMtpValidator(chainId: number, address: string = '', providerUrl: string = ''): ethers.Contract | undefined {
    if (!Object.values(CHAIN_IDS).includes(chainId)) return undefined;
    
    const ADDRESS = addressConfig[chainId]!.QUERY_MTP_VALIDATOR ?? address;
    const PROVIDER = CHAINS[chainId]!.rpcUrls[0] ?? providerUrl;

    return useContract('QUERY_MTP_VALIDATOR', ADDRESS, PROVIDER);
}