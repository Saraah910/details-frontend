import { useMoralis, useWeb3Contract } from "react-moralis";
import { Button, Card, Form, Heart, Hero, Illustration, useNotification } from "web3uikit";
import {contractAbi,contractAddress} from "../Constants"
import { useEffect, useState } from "react";

export default function dataDisplay(){

    const {isWeb3Enabled} = useMoralis()
    const {dispatch} = useNotification()
    // const [name, setName} = useState("")
    // const {age, setAge} = useState("")
    // const {Id, setId} = useState("")
    // const {address, setAddress} = useState("")
    const [show, setShow] = useState(true)
    const [totalFund, setTotalFund] = useState("0")
    const [transaction, setTransaction] = useState("0")

    const {runContractFunction} = useWeb3Contract()

    const handleNewNotification = ()=>{
        dispatch({
            type: "info",
            message: "Details fetched sucessfully!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const {runContractFunction: getTotalFund} = useWeb3Contract({
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "ShowTotalFunds",
        params:{}
    })
    
    useEffect(()=>{
        if(isWeb3Enabled){
            updateUI()
        }
    },[])

    async function updateUI(){
        const transaction = (await getTotalFund()).toString()
        setTotalFund(transaction)
    }

    async function handleSubmit(data){
        const index = data.data[0].inputResult
        console.log(typeof index)

        const tx = await runContractFunction({
            params:{
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "ShowDetails",
                params:{
                    index: index - 1
                },
            },
            onError: (error)=>console.log(error)
        })
        console.log(tx)
        setTransaction(tx)
        // await tx.wait(1)

    }

    

      


    return(
        <div>
            <h1>Total fund is: {totalFund}</h1>
            <Form
            onSubmit={handleSubmit}
                buttonConfig={{
                    theme: "outline"
                }}
                title="Find the student details"
                data={[
                    {
                        inputWidth:"55%",
                        name: "Enter index",
                        type: "number",
                        value: "",
                        key: "NameToStore",
                    }
                ]}
            >

            </Form>
            {/* <Button
                buttonConfig={{
                    theme: "outline"
                }}
            /> */}
            {show ? (
                
                <Card title="Student details"
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        width:"30%",
                        textAlign: "center",
                        padding:"2%",
                        
                    }}
                    description="Student of Vishwakarma Institute of IT">
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:"0.5%",
                        alignItems:"flex-start"
                    }}>
                        {/* {transaction.map((item)=><div>name: {item.Name}</div>
                            
                            
                            
                        )} */}
                        
                    </div>
                    

                </Card>
            ):(
                <div>Data not found</div>
            )}
            
                
                
                
            
        </div>
    )
}