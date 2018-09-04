[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/iota-pico/pow-srvio/master/LICENSE) [![Build Status](https://travis-ci.org/iota-pico/pow-srvio.svg?branch=master)](https://travis-ci.org/iota-pico/pow-srvio) 
[![Coveralls](https://img.shields.io/coveralls/iota-pico/pow-srvio.svg)](https://coveralls.io/github/iota-pico/pow-srvio)

# IOTA Pico Framework Proof Of Work Remote for powsrv.io

The library contains the Curl proof of work algorithm using the remote service at https://powsrv.io

# Example

```typescript
const networkClientPowSrv = new NetworkClient(new NetworkEndPoint("https", "api.powsrv.io", 443));
const pow = new ProofOfWorkSrvIo(networkClientPowSrv, /* api key if you have one */);

const networkClientApi = new NetworkClient(new NetworkEndPoint("https", "nodes.iota.fm", 443));
const apiClient = new ApiClient(networkClientApi);
const transactionClient = new TransactionClient(apiClient, pow);

await transactionClient.sendTransfer(....);
```

# Installation

```shell
npm install @iota-pico/pow-srvio --save
```

# Documentation

Documentation for the code can be found in [docs](https://github.com/iota-pico/pow-srvio/blob/master/docs/README.md) folder.

# Library

The IOTA Pico Framework is a multi-layered set of object oriented JavaScript libraries for use with the IOTA tangle.

If you don't want to use the layered versions of the libraries consider using the  ready bundled versions:

* [@iota-pico/lib-browser](https://github.com/iota-pico/lib-browser)
* [@iota-pico/lib-nodejs](https://github.com/iota-pico/lib-nodejs)

Each layer is fully abstracted allowing you to replace components with your own implementations very easily.

The layered libraries are written in TypeScript so are all strongly typed. The modules are generated as ES6 so you may need to transpile them when including them for use in older JavaScript eco-systems. The code will run without transpilation in all modern browsers and when used by NodeJs.

# Tutorials

Some tutorials can be found in the following repo [@iota-pico/tutorials](https://github.com/iota-pico/tutorials)

# Contributing

Contributions are always welcome to the project. Feel free to raise issues, create pull requests or just make suggestions.

# Authors

Come and find us on the IOTA [Discord](https://discord.gg/JJysqe9) development channels

* **Martyn Janes** - *obany* - ([https://github.com/obany](https://github.com/obany))

# Donations

IOTA donations are always welcome :smile:

![pico@tngl-me](https://cdn.tngl.me/tngl-me/pico/qr.svg)

# License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/iota-pico/pow-srvio/blob/master/LICENSE) file for details.
