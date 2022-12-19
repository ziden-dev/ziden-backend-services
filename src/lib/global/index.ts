import { global as zidenGlobal } from "zidenjs";
import logger from "../logger/index.js";

export class GlobalVariables {

    private static instance: GlobalVariables = new GlobalVariables();

    private setup: boolean = false;
    private hasher: zidenGlobal.Hasher | undefined;
    private F: zidenGlobal.SnarkField | undefined;
    private hash0: zidenGlobal.Hash0 | undefined;
    private hash1: zidenGlobal.Hash1 | undefined;
    private hashFunction: { (left: BigInt, right: BigInt): BigInt; } | undefined;
    private eddsa: zidenGlobal.EDDSA | undefined;

    private constructor() {}

    private static async initialize() {
        if (!GlobalVariables.instance.setup) {
            await zidenGlobal.setupParams();
            GlobalVariables.instance.setup = true;
        }
        if (!GlobalVariables.instance?.hasher) GlobalVariables.instance.hasher = await zidenGlobal.buildHasher();
        if (!GlobalVariables.instance?.F) GlobalVariables.instance.F = await zidenGlobal.buildSnarkField();
        if (!GlobalVariables.instance?.hash0) GlobalVariables.instance.hash0 = zidenGlobal.buildHash0Hash1(GlobalVariables.instance.hasher, GlobalVariables.instance.F).hash0;
        if (!GlobalVariables.instance?.hash1) GlobalVariables.instance.hash1 = zidenGlobal.buildHash0Hash1(GlobalVariables.instance.hasher, GlobalVariables.instance.F).hash1;
        if (!GlobalVariables.instance?.hashFunction) GlobalVariables.instance.hashFunction = zidenGlobal.buildFMTHashFunction(GlobalVariables.instance.hash0, GlobalVariables.instance.F);
        if (!GlobalVariables.instance?.eddsa) GlobalVariables.instance.eddsa = await zidenGlobal.buildSigner();
    }
    
    public static async getInstance(): Promise<GlobalVariables | undefined> {
        try {
            
            await GlobalVariables.initialize();
            return GlobalVariables.instance;
        } catch (error: any) {
            // console.error(error);
            logger.error(new Error(error));
        }
    }
}