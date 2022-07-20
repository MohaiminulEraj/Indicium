## Overview

Marketplace has dependencies on multiple technologies.

* [Pinata](https://app.pinata.cloud/) - store images, and NFT metadata
* [Ganache](https://trufflesuite.com/ganache/) - private Blockchain, to run application localy

## How to setup
1. run `npm install` to install dependencies

2. Then install the frontend dependencies by changing your directory `cd frontend` and then run `npm install`

3. In the root folder of the application rename `.env.example` file to `.env` file and update the contents

4. In the frontend folder of the application rename `.env.development.local.example` file to `.env.development.local` and update the contents

    * (your api pinata key has to allow `pinFileToIPFS` and `pinJSONToIPFS` rules)

5. Then migrate a contract to Ganache, contract can be found in the `truffle/contracts` folder. It's called `NftMarket.sol`

    * To migrate the contract change your directory by using this command `cd truffle` then run `truffle compile` (for the first time) then run `truffle migrate` in the terminal while Ganache network is setup and running.

    * Do not forget to link `trufle-config.js` from `truffle` folder with Ganache, just go to `config` and click `Add Project`

    * `keys.json` must be created if you want to deploy to Ropsten, if not, just remove import of `keys.json` from `trufle-config.js` and also comment out `ropsten` configuration

*   Now everything is setup and you can test out the app.

## Start the application

*  Run `npm run dev` from root directory in the terminal. App will run at `localhost:3000`
