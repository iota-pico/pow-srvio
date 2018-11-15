[@iota-pico/pow-srvio](../README.md) > [ProofOfWorkSrvIo](../classes/proofofworksrvio.md)

# Class: ProofOfWorkSrvIo

ProofOfWork implementation using Remote [https://powsrv.io](https://powsrv.io).

## Hierarchy

**ProofOfWorkSrvIo**

## Implements

* `IProofOfWork`

## Index

### Constructors

* [constructor](proofofworksrvio.md#constructor)

### Methods

* [initialize](proofofworksrvio.md#initialize)
* [pow](proofofworksrvio.md#pow)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ProofOfWorkSrvIo**(networkClient: *`INetworkClient`*, apiKey?: *`string`*): [ProofOfWorkSrvIo](proofofworksrvio.md)

*Defined in [proofOfWorkSrvIo.ts:19](https://github.com/iota-pico/pow-srvio/tree/master/src/proofOfWorkSrvIo.ts#L19*

Create an instance of ProofOfWork.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| networkClient | `INetworkClient` |  The network client to communicate through. |
| `Optional` apiKey | `string` |  The API key to access the pow box. |

**Returns:** [ProofOfWorkSrvIo](proofofworksrvio.md)

___

## Methods

<a id="initialize"></a>

###  initialize

▸ **initialize**(): `Promise`<`void`>

*Defined in [proofOfWorkSrvIo.ts:39](https://github.com/iota-pico/pow-srvio/tree/master/src/proofOfWorkSrvIo.ts#L39*

Allow the proof of work to perform any initialization. Will throw an exception if the implementation is not supported.

**Returns:** `Promise`<`void`>
Promise.

___
<a id="pow"></a>

###  pow

▸ **pow**(trunkTransaction: *`Hash`*, branchTransaction: *`Hash`*, trytes: *`Trytes`[]*, minWeightMagnitude: *`number`*): `Promise`<`Trytes`[]>

*Defined in [proofOfWorkSrvIo.ts:51](https://github.com/iota-pico/pow-srvio/tree/master/src/proofOfWorkSrvIo.ts#L51*

Perform a proof of work on the data.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| trunkTransaction | `Hash` |  The trunkTransaction to use for the pow. |
| branchTransaction | `Hash` |  The branchTransaction to use for the pow. |
| trytes | `Trytes`[] |  The trytes to perform the pow on. |
| minWeightMagnitude | `number` |  The minimum weight magnitude. |

**Returns:** `Promise`<`Trytes`[]>
The trytes produced by the proof of work.

___

