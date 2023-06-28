import fs from "fs-extra";

export type ABI = {
    address: string,
    interface: string[]
}

const queryMtpValidatorAbi = JSON.parse(fs.readFileSync("abis/queryMtpValidator.json", "utf-8"));

export const ABIS: {[key: string] : ABI} = {
    'QUERY_MTP_VALIDATOR': {
        "address": "",
        "interface": queryMtpValidatorAbi
    }
}