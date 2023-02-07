import { ClaimStatus } from "../../lib/constants"

export interface IClaim {
    claimId?: string,
    issuerId?: string,
    holderId?: string,
    status?: ClaimStatus,
    entry?: Object
}