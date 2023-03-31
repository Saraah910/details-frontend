import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import {contractAbi,contractAddress} from "../Constants"
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Headers from '@/components/Header'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {account, isWeb3Enabled} = useMoralis()

  console.log(account)
  console.log(typeof contractAbi)
  console.log(typeof contractAddress)
  const [currentBalance, setCurrentBalance] = useState("0")
  const [entranceAmount, setEntranceAmount] = useState("0")

  const {runContractFunction: getBalanceOf} = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: "balanceOf",
    params: {
      account: account
    }
  })

  const {runContractFunction: getEntranceFees} = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: "getEntranceFees",
    params: {}
  })
  

  useEffect(()=>{
    if(isWeb3Enabled){
      updateUIValues()
    }    
  },[account,isWeb3Enabled])
  

  async function updateUIValues(){
    const balanceFunctionCall = (await getBalanceOf({onError: (error)=>console.log(error)})).toString()
    console.log(balanceFunctionCall)
    const formattedValue = ethers.utils.formatUnits(balanceFunctionCall,"ether")
    setCurrentBalance(formattedValue)

    const entranceFeesFromcall = (await getEntranceFees({onError: (error)=>console.log(error)})).toString()
    const formattedEntranceFees = ethers.utils.formatUnits(entranceFeesFromcall,"ether")
    console.log(`Entrance amount is ${formattedEntranceFees}`)
    setEntranceAmount(formattedEntranceFees)


  }
  return (
    <div>
          
       <div style={{
        margin: "1.3%",
        fontFamily: "sans-serif",
        alignContent: "center"
       }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          padding: "1.5%"
        }}>

          <p>Current balance of the account {account} is {currentBalance} ETH</p>
          <br></br>
          <p>Entrance fees is {entranceAmount} ETH</p> 
          
        </div>
        
       </div>
    </div>
        
  )
}
