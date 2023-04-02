import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import {contractAbi,contractAddress} from "../Constants"
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Headers from '@/components/Header'
import Link from 'next/link'
import { Button,Information,Loading } from 'web3uikit'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {account, isWeb3Enabled} = useMoralis()

  console.log(account)
  console.log(typeof contractAbi)
  console.log(typeof contractAddress)
  const [currentBalance, setCurrentBalance] = useState("0")
  const [entranceAmount, setEntranceAmount] = useState("0")
  const [count, setCount] = useState("0")

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

  const {runContractFunction: getTotalCount} = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: "getDetailCount",
    params: {}
  })
  

  useEffect(()=>{
    if(isWeb3Enabled){
      updateUIValues()
    }    
  },[account,isWeb3Enabled])
  
  function handleClick(){
    return(
      <Loading
        fontSize={12}
        size={12}
        spinnerColor="#2E7DAF"
        spinnerType="wave"
        text="Loading..."
      />
    )
  }

  async function updateUIValues(){
    const balanceFunctionCall = (await getBalanceOf({onError: (error)=>console.log(error)})).toString()
    console.log(balanceFunctionCall)
    const formattedValue = ethers.utils.formatUnits(balanceFunctionCall,"ether")
    setCurrentBalance(formattedValue)

    const entranceFeesFromcall = (await getEntranceFees({onError: (error)=>console.log(error)})).toString()
    const formattedEntranceFees = ethers.utils.formatUnits(entranceFeesFromcall,"ether")
    console.log(`Entrance amount is ${formattedEntranceFees}`)
    setEntranceAmount(formattedEntranceFees)

    const getTotalCountFromCall = (await getTotalCount({onError: (error)=>console.log(error)})).toString()
    console.log(`Total number of players is ${getTotalCountFromCall}`)
    setCount(getTotalCountFromCall)


  }
  return (
    <div>
          {isWeb3Enabled ?(
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
              
                      <Information
                      topic='Current balance of the account {account} is'
                      information={<h4>{currentBalance} ETH</h4>}
                      
                      /> 
                      <br></br>
                      <Information
                      topic='Entrance fees is'
                      information={<b>{entranceAmount} WEI</b>}
                      /> 
                      <br></br>
                      <p>Total number of players is <b>{count}</b></p>
                      <br></br>
                      <Link href={"/dataDisplay"} style={{display:"flex", flexDirection:"row", gap:"0.5%",alignItems:"center"}}>
                        Click to get the Student details
                          <Button
                            text="Outline Button"
                            theme="outline"
                          />
                          
                      </Link>
            </div>
      
     </div>
          ):(
            <h3>Please connect to your wallet</h3>
          )}
      
          
      
    
  
    </div>
    
        
  )
}

