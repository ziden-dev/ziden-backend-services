// @ts-ignore
// const snarkjs = require('snarkjs');
import * as snarkjs from "snarkjs";


export interface Proof {
  pi_a: string[],
  pi_b: string[][],
  pi_c: string[],
  protocol: string
}

export interface ZKProof {
  proof: Proof,
  public_signals: string[]
}

export interface Header {
  algorithm: string,
  circuitId: string,
  schema: string,
  iat: number
}

export class JWZ {
  zkProof: ZKProof = {} as ZKProof;
  header: Header;
  payload: string;
  constructor(_algorithm: string, _circuitId: string, _schema: string, _payload: string) {
    this.header = {
      algorithm: _algorithm,
      circuitId: _circuitId,
      schema: _schema,
      iat: Date.now()
    };
    this.payload = _payload;
  }

  static parse(base64Token: string): JWZ {
    let part = base64Token.split(".");
    if (part.length != 3) {
      throw Error("Token must contain 3 part");
    }
    else {
      let header = JSON.parse(Buffer.from(part[0], 'base64').toString('utf-8'));
      let payload = Buffer.from(part[1], 'base64').toString('utf-8');
      let zkp = JSON.parse(Buffer.from(part[2], 'base64').toString('utf-8'));
      let token = new JWZ(header.algorithm, header.circuitId, header.schema, payload);
      token.zkProof = zkp;
      return token
    }
  }
  /**
   * Compress the JWZ to a base64 format token
   * @returns 
   */
  compress(): string {
    if (!this.header || !this.payload || !this.zkProof) {
      throw Error("Missing component")
    }
    else {
      let base64Header = Buffer.from(JSON.stringify(this.header), 'utf-8').toString('base64');
      let base64Payload = Buffer.from(this.payload, 'utf-8').toString('base64');
      let base64ZKP = Buffer.from(JSON.stringify(this.zkProof), 'utf-8').toString('base64');
      return base64Header + "." + base64Payload + "." + base64ZKP;
    }
  }

  compareValue(value: string): boolean {
    if (this.zkProof.public_signals[7] == value) {
      return true;
    } else
      return false
  }

  verifyPubSig(_value: string, _schemaHash: string, _issuerID: string): boolean {
    if (!this.zkProof.proof || !this.zkProof.public_signals) {
      throw Error("Invalid zkProof")
    }
    else {
      const schemaHash = BigInt("0b" + BigInt(this.zkProof.public_signals[6]).toString(2).padStart(198, "0").slice(64, 192)).toString();
      if (_schemaHash != schemaHash || this.zkProof.public_signals[7] != _value || this.zkProof.public_signals[4] != _issuerID) {
        return false;
      }
      else return true;
    }
  }

  /**
   * Verify the correctness of the zkp
   * @param verification_key 
   * @returns 
   */
  async verifyProof(verification_key: Object): Promise<boolean> {
    if (!this.zkProof.proof || !this.zkProof.public_signals) {
      throw Error("Invalid zkProof");
    } else {
      try {
        return await snarkjs.groth16.verify(verification_key, this.zkProof.public_signals, this.zkProof.proof);
      } catch (err) {
        throw err
      }
    }
  }

  compareSchemaHash(_schemaHash: string): boolean {
    if (!this.zkProof.proof || !this.zkProof.public_signals) {
      throw Error("Invalid zkProof")
    } else {
      const schemaHash = BigInt("0b" + BigInt(this.zkProof.public_signals[6]).toString(2).padStart(198, "0").slice(64, 192)).toString();
      if (schemaHash == _schemaHash)
        return true;
      else return false;
    }
  }

  async verifyToken(verification_key: Object, _value: string, _schemaHash: string, _issuerID: string, timeLimit: number): Promise<boolean> {
    if (!this.zkProof.proof || !this.zkProof.public_signals) {
      throw Error("Invalid zkProof");
    }
    else {
      if (!(await this.verifyProof(verification_key)) || !this.verifyExpiration(timeLimit) || !this.verifyPubSig(_value, _schemaHash, _issuerID)) {
        return false;
      } else return true;
    }
  }

  verifyExpiration(timeLimit: number): boolean {
    if (!this.zkProof.proof || !this.zkProof.public_signals) {
      throw Error("Invalid zkProof")
    } else {
      const createdAt = BigInt("0b" + BigInt(this.zkProof.public_signals[6]).toString(2).padStart(198, "0").slice(0, 64))
      if (BigInt(Date.now()) - createdAt > BigInt(timeLimit)) {
        return false;
      }
      else return true;
    }
  }
}