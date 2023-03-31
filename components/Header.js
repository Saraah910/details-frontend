import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { ENSAvatar } from "web3uikit";

export default function Headers(){
    return (
        <nav style={{
            padding: "1.3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}>
            <h1>Storage details</h1>
            <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}>
                <Link href={"/"}>
                    Home page  |
                </Link>
                
                <Link href={"/dataDisplay"}>
                    |  Display page  |
                </Link>

                <Link href={"/addDetails"}>
                    |  Add Details
                </Link>
                
                <ConnectButton moralisAuth={false}></ConnectButton>
            </div>
            
        </nav>
        
        
    )
}