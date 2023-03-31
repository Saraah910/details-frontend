import { Card, Illustration } from "web3uikit";

export default function dataDisplay(){

    return(
        <div style={{
            height: "30%",
            width: "20%",
            justifyContent: "center",
            margin: "1.3%",
            marginLeft: "38%"
        }}>
            <Card 
                description="Click to create a dApp"
                onClick={function noRefCheck(){}}
                setIsSelected={function noRefCheck(){}}
                title="dApp"
                tooltipText={<span style={{width: 200}}>'Lorem Ipsum Dole met sai souni lokomit anici trenicid'</span>}
            >
                <div>
                <Illustration
                    height="5%"
                    logo="wallet"
                    width="100%"
                />
                </div>
            </Card>
        </div>
    )
}