import { Form } from "web3uikit"
import { useWeb3Contract } from "react-moralis"
import { contractAbi, contractAddress } from "../Constants"
import { useState } from "react"

export default function addDetails(){
    const {runContractFunction} = useWeb3Contract()
    const [entranceFees, setEntranceFees] = useState("0")

    async function handleSubmit(data){
        const nameToAdd = data.data[0].inputResult
        const ageToAdd = data.data[1].inputResult
        const IDToAdd = data.data[2].inputResult
        const AddressToAdd = data.data[3].inputResult
        
        
        const detailsFromContract = await runContractFunction({
            params:{
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "EntreDetails",
                msgValue: entranceFees,
                params:{
                    name: nameToAdd,
                    age: ageToAdd,
                    id: IDToAdd,
                    add: AddressToAdd
                },
            },
            onError: (error) => console.log(error),    
        })
        handleSuccess(detailsFromContract)
        

        
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            console.log("Details added sucessfully.")
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <div style={{
            
            margin:"2%",
            marginLeft: "35%",
            marginRight: "15%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Form
                buttonConfig={{
                    onClick: function noRefCheck(){},
                    theme: 'primary'
                }}
                onSubmit={handleSubmit}
                title="Entre the details"
                data={
                        [
                            {
                                inputWidth:"55%",
                                name: "Enter your name",
                                type: "text",
                                value: "",
                                key: "NameToStore",
                            },
                            {
                                inputWidth:"55%",
                                name: "Enter your Age",
                                type: "number",
                                value: "",
                                key: "ageToStore",
                            },
                            {
                                inputWidth:"55%",
                                name: "Enter your ID number",
                                type: "number",
                                value: "",
                                validation:{
                                    required:true,
                                    numberMax:100,
                                    numberMin:1
                                },
                                key: "IDToStore",
                            },
                            {
                                inputWidth:"55%",
                                name: "Enter your permanant address",
                                type: "textarea",
                                validation:{
                                    characterMaxLength:250
                                },
                                value: "",
                                key: "AddressToStore",
                            }

                        ]
                    }
            />
            
        </div>
            
        </>
    )
}

