import { drizzleConnect } from "@drizzle/react-plugin";
import MainComponent from "./MainComponent";

const mapStateToProps = (state) => (
    {
        accounts: state.accounts,
        accountBalances: state.accountBalances,
        drizzleStatus: state.drizzleStatus
    }
);

const MainContainer = drizzleConnect(MainComponent, mapStateToProps);

export default MainContainer;
