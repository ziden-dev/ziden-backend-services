export default {
    "queryMtp": {
        "address": "",
        "interface": [
            'event Initialized(uint8 version)',
            'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
            'function getChallengeInputIndex() pure returns (uint256 index) @29000000',
            'function getCircuitId() pure returns (string id) @29000000',
            'function getUserIdInputIndex() pure returns (uint256 index) @29000000',
            'function initialize(address _verifierContractAddress, address _stateContractAddress) @29000000',
            'function owner() view returns (address) @29000000',
            'function renounceOwnership() @29000000',
            'function revocationStateExpirationTime() view returns (uint256) @29000000',
            'function setRevocationStateExpirationTime(uint256 expirationTime) @29000000',
            'function state() view returns (address) @29000000',
            'function transferOwnership(address newOwner) @29000000',
            'function verifier() view returns (address) @29000000',
            'function verify(uint256[2] a, uint256[2][2] b, uint256[2] c, uint256[9] inputs, tuple(uint256 deterministicValue, uint256 compactInput, uint256 mask, string circuitId) query) view returns (bool r) @29000000'
        ]
    }
}