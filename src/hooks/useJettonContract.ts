import { useEffect, useState } from "react";
import { Address, beginCell, fromNano, OpenedContract, toNano } from "ton-core";

// import {TokenMaster} from "../../build/TokenMaster/tact_TokenMaster";
// import {TokenWallet} from "../../build/TokenMaster/tact_TokenWallet";

import {TokenMaster} from "../../output/sample_TokenMaster";
import {TokenWallet} from "../../output/sample_TokenWallet";

import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [balance, setBalance] = useState<string | null>()

    const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const contract = TokenMaster.fromAddress(Address.parse("EQCNSx5XwnfLzIepfg_N4_xWna3sotzhdUgqPPbW09LUKlwa"))
       
       
        return client.open(contract) as OpenedContract<TokenMaster>
    }, [client, wallet]) //wallet - это нативный кошелек

    const jettonWalletContract = useAsyncInitialize(async()=>{
        if(!jettonContract || !client) return; //проверка есть ли клиент

        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet!).toString())
        )
        //client это как в тестах blockechain в blueprint
        return client.open(TokenWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])

    useEffect(()=>{
        async function getBalance() {
            if(!jettonWalletContract) return 
            setBalance(null)
            const balance = (await jettonWalletContract.getGetWalletData()).balance
            setBalance(fromNano(balance))
            await sleep(5000)
            getBalance()
        }

        getBalance()

    }, [jettonWalletContract])

    return {
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        balance: balance,
        mint: () => {
            // const message: Mint = {
            //     $$type: "Mint",
            //     amount: 150n
            // }

            // jettonContract?.send(sender, {
            //     value: toNano("0.05")
            // }, message)
            
               
            // jettonContract?.send(sender, {value: toNano("0.2")}, {$$type: 'Transfer', query_id: 5n, amount: toNano(100), destination: Address.parse("0QA2Vt1jJnQZ3YsKr0di2xzOOHrhzWOZQekFsLGNWdgidlS-"), response_destination: Address.parse("EQDs9Q2M03o7WFa2Y7yEuLUpsB0nCjghhb49xizpoZh46wq8"), custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.000000001"), forward_payload: beginCell().storeUint(0,32).storeStringTail("hello ogiy !!!").endCell()});
            jettonContract?.send(sender, {value: toNano("0.2")}, {$$type: 'Transfer', query_id: 5n, amount: toNano(5), destination: Address.parse("EQDs9Q2M03o7WFa2Y7yEuLUpsB0nCjghhb49xizpoZh46wq8"), response_destination: Address.parse("EQDs9Q2M03o7WFa2Y7yEuLUpsB0nCjghhb49xizpoZh46wq8"), custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.000000001"), forward_payload: beginCell().storeUint(0,32).storeStringTail("hello ogriy !!!").endCell()});
            // sender - тот кто подвязался кошельком к приложению
            
        }
          
        
    }
}