
import { ethers } from "ethers";
// import { NextApiRequest, NextApiResponse } from "next";
// import { withIronSession, Session } from "next-iron-session";
import * as util from "ethereumjs-util";
import contract from "../contracts/MyNft.json";
// import { NftMarketContract } from "@_types/nftMarketContract";

const NETWORKS = {
    "5777": "Ganache",
    "3": "Ropsten"
}

// type NETWORK = typeof NETWORKS;

const abi = contract.abi;
const targetNetwork = process.env.REACT_NETWORK_ID;

export const contractAddress = contract["networks"][targetNetwork]["address"];
export const pinataApiKey = process.env.REACT_PINATA_API_KEY;
export const pinataSecretApiKey = process.env.REACT_PINATA_SECRET_API_KEY;

// export function withSession(handler) {
//     return withIronSession(handler, {
//         password: process.env.SECRET_COOKIE_PASSWORD,
//         cookieName: "nft-auth-session",
//         cookieOptions: {
//             secure: process.env.NODE_ENV === "production" ? true : false
//         }
//     })
// }

const url = process.env.NODE_ENV === "production" ?
    process.env.INFURA_ROPSTEN_URL :
    "http://127.0.0.1:7545";

export const addressCheckMiddleware = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        const message = req.session.get("message-session");
        const provider = new ethers.providers.JsonRpcProvider(url);
        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider
        );

        let nonce =
            "\x19Ethereum Signed Message:\n" +
            JSON.stringify(message).length +
            JSON.stringify(message);

        nonce = util.keccak(Buffer.from(nonce, "utf-8"));
        const { v, r, s } = util.fromRpcSig(req.body.signature);
        const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
        const addrBuffer = util.pubToAddress(pubKey);
        const address = util.bufferToHex(addrBuffer);

        if (address === req.body.address) {
            resolve("Correct Address");
        } else {
            reject("Wrong Address");
        }
    })
}

