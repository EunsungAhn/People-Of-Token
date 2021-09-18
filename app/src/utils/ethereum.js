// https://github.com/makerdao/mcd-cdp-portal/blob/c5ef74ea35540e7000f6c94746b4b8a9019c8fa3/src/utils/ethereum.js

export const isValidAddressString = addressString =>
    /^0x([A-Fa-f0-9]{40})$/.test(addressString);

export const isValidTxString = txString =>
    /^0x([A-Fa-f0-9]{64})$/.test(txString);

export const etherscanLink = (string, network = 'mainnet') => {
    const pathPrefix = network === 'mainnet' ? '' : `${network}.`;
    if (isValidAddressString(string))
        return `https://${pathPrefix}etherscan.io/address/${string}`;
    else if (isValidTxString(string))
        return `https://${pathPrefix}etherscan.io/tx/${string}`;
    else throw new Error(`Can't create Etherscan link for "${string}"`);
};
