import { INetwork } from '../models/Network.js';
import Network from '../../lib/networks/index.js';
import { NetworkType } from '../../lib/constants/index.js';

export class NetworkService {

    constructor() {}

    public findAllNetworks(): INetwork[]{
        return Object.entries(Network).map(([TYPE, NETWORKS]) => {
            switch (TYPE) {
                case NetworkType.Evm:
                    return Object.values(NETWORKS.CHAIN_IDS).map((id) => {
                        return {
                            chainId: id,
                            name: NETWORKS.CHAINS[id].name,
                            type: TYPE
                        }
                    })
                case NetworkType.Cosmwasm:
                    break;
                case NetworkType.Hyperledger:
                    break;
                default:
                    break;
            }
            return {
                chainId: -1,
                name: '',
                type: NetworkType.Unknown
            }
        }).flat().filter(e => e.chainId >= 0);
    }

    // public async findNetworksById(chainIds: string[]): Promise<INetwork[]> {
    //     return (await Network.find({
    //         _id: { $in: chainIds }
    //     })).map(e => e.toObject());
    // }

    public findOneById(chainId: number): INetwork | undefined {
        const filtered = Object.entries(Network).map(([TYPE, NETWORKS]) => {
            switch (TYPE) {
                case NetworkType.Evm:
                    const id = Object.values(NETWORKS.CHAIN_IDS).filter(e => e == chainId)[0];
                    if (id == undefined) break;
                    return {
                        chainId: id,
                        name: NETWORKS.CHAINS[id].name,
                        type: TYPE
                    }
                case NetworkType.Cosmwasm:
                    break;
                case NetworkType.Hyperledger:
                    break;
                default:
                    break;
            }
            return;
        }).flat().filter(e => e !== undefined)
        return filtered[0];
    }
}