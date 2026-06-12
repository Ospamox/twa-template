// import { Address } from "ton-core";
// import { useJettonContract } from "../hooks/useJettonContract";
// import { useTonConnect } from "../hooks/useTonConnect";
// import {
//   Card,
//   FlexBoxCol,
//   FlexBoxRow,
//   Button,
//   Ellipsis,
// } from "./styled/styled";

// export function Jetton() {
//   const {connected, wallet} = useTonConnect()
//   const {jettonWalletAddress, balance, mint} = useJettonContract()

//   return (
//     <Card title="Jetton">
//       <FlexBoxCol>
//         <h3>Jetton</h3>
//         <FlexBoxRow>
//           Wallet
//           <Ellipsis>{ wallet ? Address.parse(wallet as string).toString() : "Loading..."}</Ellipsis>
//         </FlexBoxRow>
//         <FlexBoxRow>
//           Jetton Wallet
//           <Ellipsis>{jettonWalletAddress ? jettonWalletAddress : "Loading..."}</Ellipsis>
//         </FlexBoxRow>
//         <FlexBoxRow>
//           Balance
//           <div>{balance ?? "Loading..."}</div>
//         </FlexBoxRow>
//         <Button
//           disabled={!connected} onClick={mint}>
//           Mint jettons
//         </Button>
//       </FlexBoxCol>
//     </Card>
//   );
// }


import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4, fromNano, internal } from "ton";
import { useEffect, useState } from "react";
import { useTonBalance } from "../hooks/useTonBalance";


export function Jetton() {
  const {connected, wallet} = useTonConnect()
  // const {jettonWalletAddress, balance, mint} = useJettonContract()
  const {mint} = useJettonContract()


  //TON BALANS
  // const client = new TonClient({
  //   endpoint: "https://toncenter.com/api/v2/jsonRPC",   
  // });        //  - mainnet

  // const client = new TonClient({
  //   endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",   
  // });           //  - testnet
  

  // const [tonBalance, setTonBalance] = useState<string | null>(null);

  const tonBalance = useTonBalance()

  // useEffect(() => {
  //   const load = async () => {
  //     if (!wallet) return;
  
  //     try {
  //       const address = Address.parse(wallet);
  
  //       const balance = await client.getBalance(address); // баланс тонкоинов в кошельке
  
  //       setTonBalance((Number(balance) / 1e9).toFixed(4));
  //     } catch (e) {
  //       console.error(e);
  //       setTonBalance("Error");
  //     }
  //   };
  
  //   load();
  // }, [wallet]);

  return (
    <Card title="Jetton">
      <FlexBoxCol>
      <h3
        style={{
          fontSize: "14px",
          color: "#00d4ff",
          fontFamily: '"Comic Sans MS", cursive'
        }}
      >
        USDM token rewards for random Kokoronoki participants from our partners
        Monetrix. 🚀Airdrop: 100 USDMt tokens.
        Tokens will be credited to your TON wallet after two 0.1 Token transactions.
        Exchange rate: USDMt = USDM 💰💰💰
      </h3>
        {/* <FlexBoxRow>
          Wallet
          <Ellipsis>{ wallet ? Address.parse(wallet as string).toString() : "Loading..."}</Ellipsis>
        </FlexBoxRow> */}
        {/* <FlexBoxRow>
          Jetton Wallet
          <Ellipsis>{jettonWalletAddress ? jettonWalletAddress : "Loading..."}</Ellipsis>
        </FlexBoxRow> */}
        {/* <FlexBoxRow>
          Balance
          <div>{balance ?? "Loading..."}</div>
        </FlexBoxRow> */}

        <FlexBoxRow>
          TON Balance
          <div>{tonBalance ?? "Loading..."}</div>
        </FlexBoxRow>

        <FlexBoxRow style={{ justifyContent: "center" }}>
           <img src="/refer.gif" alt="TON animation" width="200" /> 
        </FlexBoxRow>
        
       
        <Button
          disabled={!connected} onClick={mint}>
          Get USDMt   
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
