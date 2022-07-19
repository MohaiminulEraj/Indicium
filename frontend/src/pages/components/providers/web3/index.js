import { ethers } from "ethers";
import { initializeProvider } from "@metamask/providers";
import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import LocalMessageDuplexStream from 'post-message-stream';
import { createDefaultState, createWeb3State, loadContract } from "./utils";

// Create a stream to a remote provider:
const metamaskStream = new LocalMessageDuplexStream({
    // name: 'metamask-inpage',
    // target: 'metamask-contentscript',
    name: 'inpage',
    target: 'contentscript',
});

// this will initialize the provider and set it as window.ethereum
initializeProvider({
    connectionStream: metamaskStream,
});
const Web3Provider = () => {

    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    const [web3Api, setWeb3Api] = useState();

    useEffect(() => {
        async function initWeb3() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = await loadContract("NftMarket", provider);

                const signer = provider.getSigner();
                const signedContract = contract.connect(signer);

                setTimeout(() => setGlobalListeners(window.ethereum), 500);
                setWeb3Api(createWeb3State({
                    ethereum: window.ethereum,
                    provider,
                    contract: signedContract,
                    isLoading: false
                }))
            } catch (e) {
                console.error("Please, install web3 wallet");
                setWeb3Api((api) => createWeb3State({
                    ...api,
                    isLoading: false,
                }))
            }
        }

        initWeb3();

    }, [])

}
const pageReload = () => { window.location.reload(); }

const handleAccount = (ethereum = initializeProvider) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked());
    if (isLocked) { pageReload(); }
}

const setGlobalListeners = (ethereum = initializeProvider) => {
    ethereum.on("chainChanged", pageReload);
    ethereum.on("accountsChanged", handleAccount(ethereum));
}

const removeGlobalListeners = (ethereum = initializeProvider) => {
    ethereum?.removeListener("chainChanged", pageReload);
    ethereum?.removeListener("accountsChanged", handleAccount);
}

