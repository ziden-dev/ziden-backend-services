import axios from "axios";
import env from '../../lib/env/index.js';
import { BadRequestError } from "../errors/http/BadRequestError.js";

const AUTHEN_SERVER = env.authenService.url;

export async function verifyTokenAdmin(token: string, verifierId: string) {
    try {
        if (!token || !verifierId) {
            return false;
        }
    
        let url = AUTHEN_SERVER + `/api/v1/auth/verify-token-admin/${verifierId}`;


        const response = await axios.request({
            method: "POST",
            url: url,
            data: {
                "token": token
            }
        });
    
        if (response.data["isValid"]) {
            return true;
        } else {
            return false;
        }
    } catch (err: any) {
        return false;
    }
    
}

export async function verfifyTokenWithRole(token: string, verifierId: string, role: number) {
    try {
        if (!token || !verifierId) {
            return false;
        }
    
        let url = AUTHEN_SERVER + `/api/v1/auth/verify-token/${verifierId}`;
        
        const response = await axios.request({
            method: "POST",
            url: url,
            data: {
                "token": token,
                "role": role
            }
        });
    
        if (response.data["isValid"]) {
            return true;
        } else {
            return false;
        }
    } catch (err: any) {
        return false;
    }
}

export async function login(data: any, verifierId: string) {
    if (!verifierId) {
        throw("Invalid issuerId");
    }

    try {
        let url = AUTHEN_SERVER + `/api/v1/auth/login/${verifierId}`;
        const respone = await axios.request({
            method: "POST",
            url: url,
            data: data
        });

        const token = respone.data["token"];
        if (token == undefined) {
            throw("Invalid request");
        }
        return token;

    } catch (err) {
        throw new BadRequestError("Invalid request");
    }
}

export async function registerNewVerifier(verifierId: string) {
    try {
        const url = AUTHEN_SERVER + "/api/v1/register";
        const response = await axios.request({
            method: "POST",
            url: url,
            data: {
                "userId": verifierId
            }
        });

        return {
            userId: response.data.userId,
            verifierId: response.data.adminId,
            operator: response.data.operator,
            claimId: response.data.claimId,
            version: response.data.version,
            revNonce: response.data.revNonce
        };
    } catch (err: any) {
        throw new BadRequestError("Invalid request");
    }
}

export async function createOperatorInAuthen(operatorId: string, verifierId: string, token: string) {
    try {
        const url = AUTHEN_SERVER + `/api/v1/${verifierId}/operators`;
        const response = await axios.request({
            method: "POST",
            url: url,
            data: {
                "operatorId": operatorId,
                "role": 2
            },
            headers: {
                "Authorization": token
            }
        });

        return {
            userId: response.data.userId,
            verifierId: response.data.adminId,
            operator: response.data.operator,
            claimId: response.data.claimId,
            version: response.data.version,
            revNonce: response.data.revNonce
        };
    } catch (err: any) {
        throw new BadRequestError("Invalid request");
    }
}

export async function revokeOperator(operatorId: string, verifierId: string, token: string) {
    try {
        const url = AUTHEN_SERVER + `/api/v1/${verifierId}/operators/${operatorId}`;
        const response = await axios.request({
            method: "DELETE",
            url: url,
            headers: {
                "Authorization": token
            }
        });

    } catch (err: any) {
        throw new BadRequestError("Invalid request");
    }
}

export async function getAuthenProof(claimId: string, type: string) {
    let url = AUTHEN_SERVER + `/api/v1/claims/${claimId}/proof?type=${type}`;
    const proof = await axios.request({
        method: "GET",
        url: url
    });
    return proof.data;
}

export async function getOperatorInforInAuthen(operatorId: string, verifierId: string) {
    let url = AUTHEN_SERVER + `/api/v1/${verifierId}/operators/${operatorId}`;
    const response = await axios.request({
        method: "GET",
        url: url
    });
    return {
        userId: response.data.userId,
        verifierId: response.data.adminId,
        operator: response.data.operator,
        claimId: response.data.claimId,
        version: response.data.version,
        revNonce: response.data.revNonce
    };
}