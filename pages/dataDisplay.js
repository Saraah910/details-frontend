import { useWeb3Contract } from "react-moralis";
import { Button, Card, Form, Heart, Hero, Illustration, useNotification } from "web3uikit";
import {contractAbi,contractAddress} from "../Constants"
import { useState } from "react";

export default function dataDisplay(){

    const {runContractFunction} = useWeb3Contract()
    const {dispatch} = useNotification()
    const {name, setName} = useState("")
    const {age, setAge} = useState("")
    const {Id, setId} = useState("")
    const {address, setAddress} = useState("")
    const {show, setShow} = useState(false)

    const handleNewNotification = ()=>{
        dispatch({
            type: "info",
            message: "Details fetched sucessfully!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    async function handleSubmit(data){
        const indexToadd = parseInt(data.data[0].inputResult)
        console.log(typeof indexToadd)
        console.log(typeof contractAbi)
        console.log(typeof contractAddress)
        console.log(indexToadd - 1)
        let transaction = await runContractFunction({
            params: {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName:"ShowDetails",
                params:{
                    index: indexToadd - 1
                }, 
            },
            onError: (error)=>console.log(error),
            onSuccess: ()=>{
                handleSuccess(transaction.params.index)
            }
        })
        console.log(typeof transaction)
        await transaction.wait(1)
        
    }
    async function handleSuccess(index){
        console.log(`Fetching details of ${index + 1}th student.`)
        handleNewNotification()
        console.log("Data retrived!")
        setName(transactionReciept.name)
        setAge(transactionReciept.age)
        setId(transactionReciept.id)
        setAddress(transactionReciept.add)
        setShow(true)
    }


    return(
        <div>
            <Form
                buttonConfig={{
                    theme: "outline"
                }}
                onSubmit={handleSubmit}
                title="Let's find the student"
                data={[
                    {
                        inputWidth:"55%",
                        name: "Enter the index to find the student",
                        type: "number",
                        value: "",
                        key: "IndexToStore",
                        validation: {
                            required:true
                        }
                    }
                ]}
            
            />
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
                        <p>Name: {name}</p>
                        <p>Age: {age}</p>
                        <p>ID: {Id}</p>
                        <p>Address: {address}</p>
                    </div>
                    

                </Card>
            ):(
                <div>Data not found</div>
            )}
            
                
                
                
            
        </div>
    )
}