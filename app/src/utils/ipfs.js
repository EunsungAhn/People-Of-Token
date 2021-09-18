import IPFSClient from 'ipfs-http-client';

const ipfs = new IPFSClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;
