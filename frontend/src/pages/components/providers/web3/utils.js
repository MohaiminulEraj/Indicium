import { Contract, ethers, providers } from "ethers";

export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        //   hooks: setupHooks({ethereum, provider, contract, isLoading})
    }
}

export const createWeb3State = ({
    ethereum, provider, contract, isLoading
}) => {
    return {
        ethereum,
        provider,
        contract,
        isLoading,
        //   hooks: setupHooks({ethereum, provider, contract, isLoading})
    }
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
    name,  // NftMarket
    provider = providers.Web3Provider
) => {
    if (!NETWORK_ID) {
        return Promise.reject("Network ID is not defined!");
    }

    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();

    if (Artifact.networks[NETWORK_ID].address) {
        const contract = new ethers.Contract(
            Artifact.networks[NETWORK_ID].address,
            Artifact.abi,
            provider
        )

        return contract;
    } else {
        return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
}
