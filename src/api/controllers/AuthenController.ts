import { Request, Response, NextFunction } from "express";
import { ProofTypeQuery } from "../../common/enum/EnumType.js";
import { BadRequestError } from "../errors/http/BadRequestError.js";
import { sendRes } from "../responses/index.js";
import { getAuthenProof, getOperatorInforInAuthen, login, verfifyTokenWithRole, verifyTokenAdmin } from "../services/Authen.js";

export class AuthenController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {verifierId} = req.params;
      const token = await login(req.body, verifierId);

      sendRes(res, null, {'token': token});
      return token;
    } catch (err: any) {
      console.log(err);
      sendRes(res, err);
      return;
    }
  }

  public async authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const {verifierId} = req.params;
      if (!verifierId ) {
        throw new BadRequestError("Invalid token");

      }
      let token = req.headers.authorization;
      if (token == "1") {
        next();
        return;
      }
      if (typeof token != "string") {
        throw new BadRequestError("Invalid token");
      }
      let isValid = await verifyTokenAdmin(token, verifierId);
      if (!isValid) {
        isValid = await verfifyTokenWithRole(token, verifierId, 2);
      }
      if (!isValid) {
        throw new BadRequestError("Invalid token");
      } else {
        next();
        return;
      }
    } catch (err: any) {
      console.log(err);
      sendRes(res, err);
      return;
    }
  }

  public async authorizationAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const {verifierId} = req.params;
      if (!verifierId ) {
        throw new BadRequestError("Invalid token");
      }
      let token = req.headers.authorization;
      if (token == "1") {
        next();
        return;
      }
      if (typeof token != "string") {
        throw new BadRequestError("Invalid token");
      }
      const isValid = await verifyTokenAdmin(token, verifierId);
      if (!isValid) {
        throw new BadRequestError("Invalid token");
      } else {
        next();
        return;
      }
    } catch (err: any) {
      console.log(err);
      sendRes(res, err);
      return;
    }
  }

  public async verifyToken(req: Request, res: Response) {
    try {
      const {verifierId} = req.params;
      if (!verifierId || typeof verifierId != "string") {
        throw new BadRequestError("Invalid token");
      }
      let {token} = req.body;
      if (!token || typeof token != "string") {
        throw new BadRequestError("Invalid token");
      }

      let isValid = await verifyTokenAdmin(token, verifierId);
      if (!isValid) {
        isValid = await verfifyTokenWithRole(token, verifierId, 2);
      }
      sendRes(res, null, {'isValid': isValid})

    } catch (err: any) {
      sendRes(res, null, {'isValid': false})
      return;
    }
  }

  public async generateProofInput(req: Request, res: Response) {
    try {
      const claimId = req.params["claimId"];
      const type = req.query["type"];

      if (!claimId) {
        throw new BadRequestError("Invalid claimId");
      }

      if (type != ProofTypeQuery.MTP && type != ProofTypeQuery.NON_REV_MTP) {
        throw new BadRequestError("Invalid type");
      }

      const response = await getAuthenProof(claimId, type);
      sendRes(res, null, response);

    } catch(err: any) {
      console.log(err);
      sendRes(res, err);
    }
  }
}