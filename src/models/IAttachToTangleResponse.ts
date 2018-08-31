/**
 * Represents the response for powsrv.io attach to tangle command.
 * @interface
 */
export interface IAttachToTangleResponse {
    /**
     * The trytes from the pow.
     */
    trytes: string[];
}
