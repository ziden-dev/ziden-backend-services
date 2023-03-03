type BasicChainInformation = {
    name: string;
    blockExplorerUrls?: string[];
    rpcUrls: string[];
    isTestnet?: boolean;
}

const CHAIN_IDS = {
    ETH_MAINNET: 1,
    BNB_MAINNET: 56,
    BNB_TESTNET: 97,
    ORAICHAIN_PRO: 66666
};

const CHAINS: { [chainId: number]: BasicChainInformation } = {
    [CHAIN_IDS.ETH_MAINNET]: {
        name: 'ETH Mainnet',
        blockExplorerUrls: ['https://etherscan.io'],
        rpcUrls: [
            process.env.INFURA_KEY ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` : '',
            'https://cloudflare-eth.com',
        ].filter((url) => url !== '')
    },
    [CHAIN_IDS.BNB_MAINNET]: {
        name: 'BSC Mainnet',
        blockExplorerUrls: ['https://bscscan.com'],
        rpcUrls: [
            'https://bsc-dataseed.binance.org/',
            'https://bsc-dataseed1.binance.org/',
            'https://bsc-dataseed1.defibit.io/',
            'https://bsc-dataseed2.defibit.io/',
            'https://bsc-dataseed1.ninicoin.io/',
            'https://bsc-dataseed2.ninicoin.io/',
        ]
    },
    [CHAIN_IDS.BNB_TESTNET]: {
        name: 'BSC Testnet',
        blockExplorerUrls: ['https://testnet.bscscan.com'],
        rpcUrls: [
            'https://data-seed-prebsc-1-s1.binance.org:8545/',
            'https://data-seed-prebsc-2-s1.binance.org:8545/',
            'https://data-seed-prebsc-1-s2.binance.org:8545/',
            'https://data-seed-prebsc-2-s2.binance.org:8545/',
            'https://data-seed-prebsc-1-s3.binance.org:8545/',
            'https://data-seed-prebsc-2-s3.binance.org:8545/',
        ],
        isTestnet: true
    },
    [CHAIN_IDS.ORAICHAIN_PRO]: {
        name: 'Oraichain Pro',
        blockExplorerUrls: ['https://scan.orai.us/'],
        rpcUrls: [
            'https://ethrpc.pro.orai.us/',
        ]
    },
};

export { CHAINS, CHAIN_IDS };