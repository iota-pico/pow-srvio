Object.defineProperty(exports, "__esModule", { value: true });
const arrayHelper_1 = require("@iota-pico/core/dist/helpers/arrayHelper");
const numberHelper_1 = require("@iota-pico/core/dist/helpers/numberHelper");
const objectHelper_1 = require("@iota-pico/core/dist/helpers/objectHelper");
const cryptoError_1 = require("@iota-pico/crypto/dist/error/cryptoError");
const hash_1 = require("@iota-pico/data/dist/data/hash");
const trytes_1 = require("@iota-pico/data/dist/data/trytes");
/**
 * ProofOfWork implementation using Remote https://powsrv.io.
 */
class ProofOfWorkSrvIo {
    /**
     * Create an instance of ProofOfWork.
     * @param networkClient The network client to communicate through.
     * @param apiKey The API key to access the pow box.
     */
    constructor(networkClient, apiKey) {
        if (objectHelper_1.ObjectHelper.isEmpty(networkClient)) {
            throw new cryptoError_1.CryptoError("The networkClient must be defined");
        }
        this._networkClient = networkClient;
        this._apiKey = apiKey;
    }
    /**
     * Allow the proof of work to perform any initialization.
     * Will throw an exception if the implementation is not supported.
     * @returns Promise.
     */
    async initialize() {
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
    async pow(trunkTransaction, branchTransaction, trytes, minWeightMagnitude) {
        if (!objectHelper_1.ObjectHelper.isType(trunkTransaction, hash_1.Hash)) {
            throw new cryptoError_1.CryptoError("The trunkTransaction must be an object of type Hash");
        }
        if (!objectHelper_1.ObjectHelper.isType(branchTransaction, hash_1.Hash)) {
            throw new cryptoError_1.CryptoError("The branchTransaction must be an object of type Hash");
        }
        if (!arrayHelper_1.ArrayHelper.isTyped(trytes, trytes_1.Trytes)) {
            throw new cryptoError_1.CryptoError("The trytes must be an array of type Trytes");
        }
        if (!numberHelper_1.NumberHelper.isInteger(minWeightMagnitude) || minWeightMagnitude <= 0) {
            throw new cryptoError_1.CryptoError("The minWeightMagnitude must be > 0");
        }
        const attachToTangleRequest = {
            command: "attachToTangle",
            trunkTransaction: trunkTransaction.toTrytes().toString(),
            branchTransaction: branchTransaction.toTrytes().toString(),
            minWeightMagnitude,
            trytes: trytes.map(t => t.toString())
        };
        const additionalHeaders = {};
        if (this._apiKey) {
            additionalHeaders.Authorization = `powsrv-token ${this._apiKey}`;
        }
        const attachToTangleResponse = await this._networkClient.postJson(attachToTangleRequest, undefined, additionalHeaders);
        if (objectHelper_1.ObjectHelper.isEmpty(attachToTangleResponse) || arrayHelper_1.ArrayHelper.isEmpty(attachToTangleResponse.trytes)) {
            throw new cryptoError_1.CryptoError("The attachToTangleRequest did not return a response");
        }
        else {
            return attachToTangleResponse.trytes.map(t => trytes_1.Trytes.fromString(t));
        }
    }
}
exports.ProofOfWorkSrvIo = ProofOfWorkSrvIo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvb2ZPZldvcmtTcnZJby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9vZk9mV29ya1NydklvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBdUU7QUFDdkUsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUV6RSwwRUFBdUU7QUFFdkUseURBQXNEO0FBQ3RELDZEQUEwRDtBQUkxRDs7R0FFRztBQUNIO0lBTUk7Ozs7T0FJRztJQUNILFlBQVksYUFBNkIsRUFBRSxNQUFlO1FBQ3RELElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDckMsTUFBTSxJQUFJLHlCQUFXLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLFVBQVU7UUFDbkIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFzQixFQUFFLGlCQUF1QixFQUFFLE1BQWdCLEVBQUUsa0JBQTBCO1FBQzFHLElBQUksQ0FBQywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxXQUFJLENBQUMsRUFBRTtZQUM5QyxNQUFNLElBQUkseUJBQVcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsSUFBSSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLFdBQUksQ0FBQyxFQUFFO1lBQy9DLE1BQU0sSUFBSSx5QkFBVyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDakY7UUFDRCxJQUFJLENBQUMseUJBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGVBQU0sQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sSUFBSSx5QkFBVyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDdkU7UUFDRCxJQUFJLENBQUMsMkJBQVksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLEVBQUU7WUFDeEUsTUFBTSxJQUFJLHlCQUFXLENBQUMsb0NBQW9DLENBQUMsQ0FBQztTQUMvRDtRQUVELE1BQU0scUJBQXFCLEdBQTJCO1lBQ2xELE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3hELGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMxRCxrQkFBa0I7WUFDbEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDeEMsQ0FBQztRQUVGLE1BQU0saUJBQWlCLEdBQTZCLEVBQUcsQ0FBQztRQUV4RCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxpQkFBaUIsQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNwRTtRQUVELE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBa0QscUJBQXFCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFeEssSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLHlCQUFXLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BHLE1BQU0sSUFBSSx5QkFBVyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7U0FDaEY7YUFBTTtZQUNILE9BQU8sc0JBQXNCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7Q0FDSjtBQXhFRCw0Q0F3RUMifQ==