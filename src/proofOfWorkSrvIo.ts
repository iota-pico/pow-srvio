import { ArrayHelper } from "@iota-pico/core/dist/helpers/arrayHelper";
import { NumberHelper } from "@iota-pico/core/dist/helpers/numberHelper";
import { ObjectHelper } from "@iota-pico/core/dist/helpers/objectHelper";
import { INetworkClient } from "@iota-pico/core/dist/interfaces/INetworkClient";
import { CryptoError } from "@iota-pico/crypto/dist/error/cryptoError";
import { IProofOfWork } from "@iota-pico/crypto/dist/interfaces/IProofOfWork";
import { Hash } from "@iota-pico/data/dist/data/hash";
import { Trytes } from "@iota-pico/data/dist/data/trytes";
import { IAttachToTangleRequest } from "./models/IAttachToTangleRequest";
import { IAttachToTangleResponse } from "./models/IAttachToTangleResponse";

/**
 * ProofOfWork implementation using Remote https://powsrv.io.
 */
export class ProofOfWorkSrvIo implements IProofOfWork {
    /* @internal */
    private readonly _networkClient: INetworkClient;
    /* @internal */
    private readonly _apiKey: string;

    /**
     * Create an instance of ProofOfWork.
     * @param networkClient The network client to communicate through.
     * @param apiKey The API key to access the pow box.
     */
    constructor(networkClient: INetworkClient, apiKey?: string) {
        if (ObjectHelper.isEmpty(networkClient)) {
            throw new CryptoError("The networkClient must be defined");
        }
        this._networkClient = networkClient;
        this._apiKey = apiKey;
    }

    /**
     * Allow the proof of work to perform any initialization.
     * Will throw an exception if the implementation is not supported.
     * @returns Promise.
     */
    public async initialize(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Perform a proof of work on the data.
     * @param trunkTransaction The trunkTransaction to use for the pow.
     * @param branchTransaction The branchTransaction to use for the pow.
     * @param trytes The trytes to perform the pow on.
     * @param minWeightMagnitude The minimum weight magnitude.
     * @returns The trytes produced by the proof of work.
     */
    public async pow(trunkTransaction: Hash, branchTransaction: Hash, trytes: Trytes[], minWeightMagnitude: number): Promise<Trytes[]> {
        if (!ObjectHelper.isType(trunkTransaction, Hash)) {
            throw new CryptoError("The trunkTransaction must be an object of type Hash");
        }
        if (!ObjectHelper.isType(branchTransaction, Hash)) {
            throw new CryptoError("The branchTransaction must be an object of type Hash");
        }
        if (!ArrayHelper.isTyped(trytes, Trytes)) {
            throw new CryptoError("The trytes must be an array of type Trytes");
        }
        if (!NumberHelper.isInteger(minWeightMagnitude) || minWeightMagnitude <= 0) {
            throw new CryptoError("The minWeightMagnitude must be > 0");
        }

        const attachToTangleRequest: IAttachToTangleRequest = {
            command: "attachToTangle",
            trunkTransaction: trunkTransaction.toTrytes().toString(),
            branchTransaction: branchTransaction.toTrytes().toString(),
            minWeightMagnitude,
            trytes: trytes.map(t => t.toString())
        };

        const additionalHeaders: { [id: string]: string } = { };

        if (this._apiKey) {
            additionalHeaders.Authorization = `powsrv-token ${this._apiKey}`;
        }

        const attachToTangleResponse = await this._networkClient.postJson<IAttachToTangleRequest, IAttachToTangleResponse>(attachToTangleRequest, undefined, additionalHeaders);

        if (ObjectHelper.isEmpty(attachToTangleResponse) || ArrayHelper.isEmpty(attachToTangleResponse.trytes)) {
            throw new CryptoError("The attachToTangleRequest did not return a response");
        } else {
            return attachToTangleResponse.trytes.map(t => Trytes.fromString(t));
        }
    }
}
