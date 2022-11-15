// import { utils as zidenjsUtils, claim as zidenjsClaim, claim } from 'zidenjs/build';
// import { entry } from 'zidenjs/build/claim/index.js';
// import { keccak256 } from 'ethers/lib/utils.js';
// import { ISchema } from '../api/models/Schema';

// export function serializaData(data: Object): Object {
//     return JSON.stringify(data, (key, value) =>
//         typeof value === 'bigint'
//             ? value.toString()
//             : value
//     );
// }

// export function serializaDataClaim(claim: zidenjsClaim.entry.Entry): Array<string> {
//     let dataResponse = new Array<string>;
//     claim.elements.forEach(function (value: Buffer) {
//         dataResponse.push(zidenjsUtils.bufferToHex(value));
//     });

//     return dataResponse;
// }

// export function deserializaDataClaim(claim: Array<string>): zidenjsClaim.entry.Entry {
//     let data = new Array<Buffer>;
//     claim.forEach(function (value: string) {
//         data.push(zidenjsUtils.hexToBuffer(value, 32));
//     });
//     return new zidenjsClaim.entry.Entry(data);
// }

// export function dataToBuffer(data: any, begin: number, end: number): BigInt {
//     const length = Math.floor(end - begin + 1) / 8;
//     if (typeof data == 'string') {
//         let hashData = (GlobalVariables.F.toObject(GlobalVariables.hasher([BigInt(zidenjsUtils.stringToHex(data))]))).toString(2);
//         let bitRemove = hashData.length < end - begin + 1? 0: hashData.length - (end - begin + 1);
        
//         let hashDataFixed = BigInt('0b' + hashData.slice(0, hashData.length - bitRemove));
    
//         // return zidenjsUtils.hexToBuffer(zidenjsUtils.stringToHex(data), length);
//         return BigInt(hashDataFixed);

//     }
//     if (typeof data == 'number') {
//         return BigInt(data);
//     }

//     throw ('Not correct claim data!');
// }

// export function addValueToBuffer(data: BigInt, begin: number, end: number, value: BigInt): BigInt {
    
//     return zidenjsUtils.setBits(data, begin, value);
// }


// export function FloatToBuffer(f: number): Buffer {
//     let buf = new ArrayBuffer(8);
//     (new Float64Array(buf))[0] = f;

//     var buffer = Buffer.alloc(8);
//     var view = new Uint8Array(buf);
//     for (var i = 0; i < buffer.length; ++i) {
//         buffer[i] = view[i];
//     }

//     return buffer;
// }

// export function BufferToFloat(buffer: Buffer): number {
//     const buf = new ArrayBuffer(buffer.length);
//     const view = new Uint8Array(buf);
//     for (let i = 0; i < buffer.length; ++i) {
//         view[i] = buffer[i];
//     }
//     var float = new Float64Array(buf);
//     return float[0];
// }

// export function uint8ArrayToArray(uint8Array: Uint8Array) {
//     var array = [];

//     for (var i = 0; i < uint8Array.byteLength; i++) {
//         array[i] = uint8Array[i];
//     }

//     return array;
// }

// export function generateEntry(data: any, schema: ISchema): zidenjsClaim.entry.Entry {
//     let id = data['userId'];
//     if (id == undefined) {
//         throw ('Required userId');
//     }

//     schema.index.forEach(element => {
//         let val = data[element];
//         if (val == undefined) {
//             throw ('Required ' + element);
//         }
//     });

//     // userId
//     let userId = zidenjsUtils.hexToBuffer(id.toString(), 31);
    
//     let indexSlot : Array<BigInt> = dataSlot(data, schema.index, schema.properties);
//     let valueSlot : Array<BigInt> = dataSlot(data, schema.value, schema.properties);

//     let claim = zidenjsClaim.entry.newClaim(
//         zidenjsClaim.entry.schemaHashFromBigInt(BigInt(schema.registry?.schemaHash?? '123456')),
//             zidenjsClaim.entry.withID(userId, (schema.registry?.idPosition ?? 1)),
//             zidenjsClaim.entry.withIndexData(zidenjsUtils.numToBits(indexSlot[0], 32), zidenjsUtils.numToBits(indexSlot[1], 32)),
//             zidenjsClaim.entry.withValueData(zidenjsUtils.numToBits(valueSlot[0], 32), zidenjsUtils.numToBits(valueSlot[1], 32)),
//             zidenjsClaim.entry.withFlagExpirable(true),
//             zidenjsClaim.entry.withExpirationDate(BigInt(Date.now() + (schema.registry?.expiration ?? 2592000000))),
//             zidenjsClaim.entry.withFlagUpdatable((schema.registry?.updatable ?? false))
//     )

//     generateDataFromEntry(claim, schema);

//     return claim;
// }

// export function generateDataFromEntry(entry: zidenjsClaim.entry.Entry, schema: ISchema) {
//     let data: any = {};
//     data['userId'] = zidenjsUtils.bufferToHex(entry.getID());
//     let indexData: Array<BigInt> = [zidenjsUtils.bitsToNum(entry.getSlotData(3)), zidenjsUtils.bitsToNum(entry.getSlotData(4))];
//     let valueData: Array<BigInt> = [zidenjsUtils.bitsToNum(entry.getSlotData(6)), zidenjsUtils.bitsToNum(entry.getSlotData(7))];

//     let index = entryToData(indexData, schema.index, schema.properties);
//     let value = entryToData(valueData, schema.value, schema.properties);

//     for (let i in index) {
//         data[i] = index[i];
//     }

//     for (let i in value) {
//         data[i] = value[i];
//     }

//     return data;
// }

// function dataSlot(data: any, index: Array<string>, properties: any) {
//     let ans: Array<BigInt> = [BigInt(0), BigInt(0)];
//     let slotNumber = 0;
//     let bitStart = 0;
//     let bitEnd = 0;
//     index.forEach(element => {
//         let property = properties[element];
//         let value: BigInt = BigInt(0);
//         switch (property['type']) {
//             case 'string': // 128 bit
//                 bitEnd = bitStart + 127;
//                 let hashData = (GlobalVariables.F.toObject(GlobalVariables.hasher([BigInt(zidenjsUtils.stringToHex(data[element]?? ''))]))).toString(2);
//                 let bitRemove = hashData.length < 128? 0: hashData.length - 128;
//                 let hashDataFixed = BigInt('0b' + hashData.slice(0, hashData.length - bitRemove));
//                 value = BigInt(hashDataFixed);
//                 break;
//             case 'float': // 64 bit
//                 bitEnd = bitStart + 63;
//                 value = zidenjsUtils.bitsToNum(FloatToBuffer(data[element]?? 0));
//                 break;
//             case 'boolean': // 4 bit
//                 bitEnd = bitStart + 3;
//                 if (data[element]) {
//                     value = BigInt(1);
//                 } else {
//                     value  = BigInt(0);
//                 }
//                 break;
//             case 'date': // 32bit
//                 bitEnd = bitStart + 31;
//                 value = BigInt((data[element]?? 0).toString());
//                 break;
//             case 'datetime': // 48 bit
//                 bitEnd = bitStart + 47;
//                 value = BigInt((data[element]?? 0).toString());
//                 break;
//             case 'integer':
//                 let length = Math.ceil(Math.log2(property['maximum']?? 1));
//                 length = length + 8 - length%8;
//                 bitEnd = bitEnd + length - 1;
//                 value = BigInt((data[element]?? 0).toString());
//                 break;
//             default:
//                 throw('Not have type: ' + property['type'] + ' in ' + element);
//         }

//         if (bitEnd > 253) {
//             bitEnd = bitEnd - bitStart;
//             bitStart = 0;
//             slotNumber = 1;
//         }
//         ans[slotNumber] = zidenjsUtils.setBits( ans[slotNumber], bitStart, value );
//         bitStart = bitEnd + 1;
//     });

//     return ans;
// }

// function entryToData(slotData: Array<BigInt>, index: Array<string>, properties: any) {
//     let ans: any = {};
//     let slotNumber = 0;
//     let bitStart = 0;
//     let bitEnd = 0;
//     index.forEach(element => {
//         let property = properties[element];
//         switch (property['type']) {
//             case 'string': // 128 bit
//                 bitEnd = bitStart + 127;
//                 break;
//             case 'float': // 64 bit
//                 bitEnd = bitStart + 63;
//                 break;
//             case 'boolean': // 4 bit
//                 bitEnd = bitStart + 3;
//                 break;
//             case 'date': // 32bit
//                 bitEnd = bitStart + 31;
//                 break;
//             case 'datetime': // 48 bit
//                 bitEnd = bitStart + 47;
//                 break;
//             case 'integer':
//                 let length = Math.ceil(Math.log2(property['maximum']?? 1));
//                 length = length + 8 - length%8;
//                 bitEnd = bitEnd + length - 1;
//                 break;
//             default:
//                 throw('Not have type: ' + property['type'] + ' in ' + element);
//         }

//         if (bitEnd > 253) {
//             bitEnd = bitEnd - bitStart;
//             bitStart = 0;
//             slotNumber = 1;
//         }
//         ans[element] = zidenjsUtils.getPartialValue(slotData[slotNumber], bitStart, bitEnd);
//         switch (property['type']) {
//             case 'string': // 128 bit
//                 ans[element] = ans[element].toString();
//                 break;
//             case 'float': // 64 bit
//                 ans[element] = BufferToFloat(zidenjsUtils.numToBits(ans[element], 8));
//                 break;
//             case 'boolean': // 4 bit
//                 ans[element] = ans[element]? true: false;
//                 break;
//             case 'date': // 32bit
//                 ans[element] = parseInt(ans[element].toString());
//                 break;
//             case 'datetime': // 48 bit
//                 ans[element] = parseInt(ans[element].toString());
//                 break;
//             case 'integer':
//                 ans[element] = parseInt(ans[element].toString());
//                 break;
//             default:
//                 throw('Not have type: ' + property['type'] + ' in ' + element);
//         }

//         bitStart = bitEnd + 1;
//     });
//     return ans;
// }

// export function schemaPropertiesSlot(schema: SchemaRegistry2) {
//     let propertiesSlot: Array<any> = [];
//     let indexSlot = propertiesToSlot(3, schema.index, schema.properties);
//     let valueSlot = propertiesToSlot(6, schema.value, schema.properties);
//     indexSlot.forEach(element => {
//         propertiesSlot.push(element);
//     })

//     valueSlot.forEach(element => {
//         propertiesSlot.push(element);
//     })

//     return propertiesSlot;
// }

// function propertiesToSlot(pos: number, index: Array<string>, properties: any) {
//     let ans: Array<any> = [];
//     let bitStart = 0;
//     let bitEnd = 0;
//     index.forEach(element => {
//         let property = properties[element];
//         let value: BigInt = BigInt(0);
//         switch (property['type']) {
//             case 'string': // 128 bit
//                 bitEnd = bitStart + 127;
//                 break;
//             case 'float': // 64 bit
//                 bitEnd = bitStart + 63;
//                 break;
//             case 'boolean': // 4 bit
//                 bitEnd = bitStart + 3;
//                 break;
//             case 'date': // 32bit
//                 bitEnd = bitStart + 31;
//                 break;
//             case 'datetime': // 48 bit
//                 bitEnd = bitStart + 47;
//                 break;
//             case 'integer':
//                 let length = Math.ceil(Math.log2(property['maximum']?? 1));
//                 length = length + 8 - length%8;
//                 bitEnd = bitEnd + length - 1;
//                 break;
//             default:
//                 throw('Not have type: ' + property['type'] + ' in ' + element);
//         }

//         if (bitEnd > 253) {
//             bitEnd = bitEnd - bitStart;
//             bitStart = 0;
//             pos = pos + 1;
//         }

//         ans.push({
//             'propertyName': element,
//             'propertyType': property['type'],
//             'slot': pos,
//             'begin': bitStart,
//             'end': bitEnd
//         });

//         bitStart = bitEnd + 1;
//     });

//     return ans;
// }

// export function hashSchema(schema: ISchema) {
//     return keccak256(zidenjsUtils.stringToHex(JSON.stringify(schema))).slice(0, 34);
// }