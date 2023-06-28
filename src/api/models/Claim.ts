import { ClaimStatus } from "../../lib/constants"

export interface IClaim {
    claimId?: string,
    issuerId?: string,
    holderId?: string,
    schemaHash?: string,
    status?: ClaimStatus,
    entry?: Object,
    claimIndex: number
}