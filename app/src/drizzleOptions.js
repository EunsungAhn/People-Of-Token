import DeedIPFSToken from "./contracts/DeedIPFSToken.json";

const options = {
    
    contracts: [DeedIPFSToken],
    events: {
        DeedIPFSToken: ["Transfer", "Approval", "ApprovalForAll"]
    },
    polls: {
        accounts: 1500,
    },
};

export default options;
