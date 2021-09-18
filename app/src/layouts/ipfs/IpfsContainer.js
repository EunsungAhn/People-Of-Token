import { drizzleConnect } from '@drizzle/react-plugin'
import IpfsImgUpload from './IpfsImgUpload'

const mapStateToProps = state => {
    return {
        deedIPFSToken: state.contracts.DeedIPFSToken,
        accounts: state.accounts,
        drizzleStatus: state.drizzleStatus
    }
}

export default drizzleConnect(IpfsImgUpload, mapStateToProps);
