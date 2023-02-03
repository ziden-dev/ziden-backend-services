import Network, { INetwork } from '../models/Network.js';

export class NetworkService {

    constructor() {}

    public async findAllNetworks(): Promise<INetwork[]> {
        return (await Network.find()).map(e => e.toObject());
    }

    public async findNetworksById(chainIds: string[]): Promise<INetwork[]> {
        return (await Network.find({
            _id: { $in: chainIds }
        })).map(e => e.toObject());
    }

    public async findNetworkById(chainId: string): Promise<INetwork | undefined> {
        return (await Network.findById(chainId))?.toObject();
    }

    public async saveNetwork(network: INetwork): Promise<INetwork> {
        if (!network._id) Object.assign(network, { _id: network.chainId });

        return (await Network.findByIdAndUpdate(
            network._id,
            network,
            {upsert: true, new: true}
        ))
    }
}