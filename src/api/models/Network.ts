import { NetworkType } from "../../lib/constants"

export interface INetwork {
    chainId: number,
    name: string,
    type: NetworkType
}