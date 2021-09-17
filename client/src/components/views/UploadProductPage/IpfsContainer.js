import { drizzleConnect } from "@drizzle/react-plugin";
import UploadProductPage from "./UploadProductPage";

const mapStateToProps = (state) => {
  return {
    deedIPFSToken: state.contracts.DeedIPFSToken,
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
  };
};

export default drizzleConnect(UploadProductPage, mapStateToProps);
