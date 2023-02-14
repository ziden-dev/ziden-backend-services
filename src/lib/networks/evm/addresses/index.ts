import { CHAIN_IDS } from '../chains.js';
import bnbMainnetAddresses from './bnbMainnet.js';
import bnbTestnetAddresses from './bnbTestnet.js';
import oraichainPro from './oraichainPro.js';

export const addressConfig: {[chainId: number]: any} = {
    [CHAIN_IDS.BNB_MAINNET]: bnbMainnetAddresses,
    [CHAIN_IDS.BNB_TESTNET]: bnbTestnetAddresses,
    [CHAIN_IDS.ORAICHAIN_PRO]: oraichainPro
}