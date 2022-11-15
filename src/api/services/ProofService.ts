import * as ethers from 'ethers';

import abi from "../../static/abi";

export class ProofService {

    constructor(){}

    public async verifyProof(proof: any, publicSignals: any): Promise<any> {
        
        const address = "0x06eE03dbb5551681F73CBA2E4FEb8f1c0bf056a1";
        const jsonProviderUrl: string = "https://data-seed-prebsc-1-s1.binance.org:8545/";
        
        let queryMTP = new ethers.Contract(
            address,
            abi.queryMtp.interface,
            new ethers.providers['JsonRpcProvider'](jsonProviderUrl)
        );
        console.log(queryMTP);

        const circuitQuery = {
            schema: publicSignals[7],
            slotIndex: publicSignals[8],
            operator: publicSignals[9],
            circuitId: "credentialAtomicQueryMTP",
            values: publicSignals.slice(10, 74)
        }

        return queryMTP.verify(proof, publicSignals, circuitQuery);
    }

}