import { OPERATOR } from "@zidendev/zidenjs";

// FIXME
export enum ClaimStatus {
    Pending = "PENDING",
    Active = "ACTIVE",
    Reviewing = "REVIEWING",
    Rejected = "REJECTED",
    PendingRevoke = "PENDING_REVOKE",
    Revoked = "REVOKED",
    Claimed = "CLAIMED",
    Unclaimed = "UNCLAIMED"
}

export enum Portal {
    Holder = 'HOLDER',
    Issuer = 'ISSUER',
    Veifier = 'VERIFIER'
}

export enum OperatorRole {
    Operator = 'OPERATOR',
    Admin = 'ADMIN'
}

export enum PropertyType {
    String = 'STRING',
    Integer	= 'INTEGER',
    Double = 'DOUBLE',
    Date = 'DATE',
    Datetime = 'DATETIME',
    Boolean = 'BOOLEAN',
    Object = 'OBJECT'
}

export enum ZkCircuit {
    QueryMtp = 'credentialAtomicQueryMTP',
    QuerySig = 'credentialAtomicQuerySig',
    QueryMtpRelay = 'credentialAtomicQueryMTPWithRelay',
}

export enum ZkOperator {
    None = OPERATOR.NOOP,
    Equal = OPERATOR.EQUAL,
    LessThan = OPERATOR.LESS_THAN,
    GreaterThan = OPERATOR.GREATER_THAN,
    Membership = OPERATOR.IN,
    NonMemberShip = OPERATOR.NOT_IN,
    InRange = OPERATOR.IN_RANGE
}

export enum NetworkType {
    Evm = 'EVM',
    Cosmwasm = 'COSMWASM',
    Hyperledger = 'HYPERLEDGER',
    Unknown = 'UNKNOWN'
}

export enum Contract {
    State = 'State',
    QuerySigValidator = 'QuerySigValidator',
    QueryMTPValidator = 'QueryMTPValidator',
    QuerySigVerifier = 'QuerySigVerifier',
    QueryMTPVerifier = 'QueryMTPVerifier',
    StateTransitionVerifier = 'StateTransitionVerifier'
}

export enum DefaultEndpoint {
    Issuer = 'http://<hostname>/api/v1',
    SchemaRegistry = 'http://<hostname>/api/v1/registries/<registryId>',
    Service = 'http://<hostname>/api/v1/services/<serviceId>'
}

export const IMAGE_TYPES = /jpeg|jpg|png/;
export const IMAGE_MAX_SIZE = 10 * 1000 * 1000;
