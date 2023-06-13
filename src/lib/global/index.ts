import { params as zidenParams, EDDSA, Hash0, Hash1, Hasher, SnarkField} from "@zidendev/zidenjs";
import logger from "../logger/index.js";

export class GlobalVariables {

    private static instance: GlobalVariables = new GlobalVariables();

    private setup: boolean = false;
    private hasher: Hasher | undefined;
    private F: SnarkField | undefined;
    private hash0: Hash0 | undefined;
    private hash1: Hash1 | undefined;
    private hashFunction: { (left: BigInt, right: BigInt): BigInt; } | undefined;
    private eddsa: EDDSA | undefined;

    private constructor() {}

    private static async initialize() {
        if (!GlobalVariables.instance.setup) {
            await zidenParams.setupParams();
            GlobalVariables.instance.setup = true;
        }
        let params = zidenParams.getZidenParams();
        if (!GlobalVariables.instance?.hasher) GlobalVariables.instance.hasher = params.hasher;
        if (!GlobalVariables.instance?.F) GlobalVariables.instance.F = params.F;
        if (!GlobalVariables.instance?.hash0) GlobalVariables.instance.hash0 = params.hash0;
        if (!GlobalVariables.instance?.hash1) GlobalVariables.instance.hash1 = params.hash1;
        if (!GlobalVariables.instance?.hashFunction) GlobalVariables.instance.hashFunction = params.fmtHash;
        if (!GlobalVariables.instance?.eddsa) GlobalVariables.instance.eddsa = params.eddsa;
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