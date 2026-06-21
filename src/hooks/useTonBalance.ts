// import { Address } from "ton-core";
// import { TonClient} from "ton";
// import { useEffect, useState } from "react";
// import { useTonConnect } from "../hooks/useTonConnect";


//  function transferTon(){

// const {connected, wallet} = useTonConnect()
// //TON BALANS
//   // const client = new TonClient({
//   //   endpoint: "https://toncenter.com/api/v2/jsonRPC",   
//   // });        //  - mainnet

//   const client = new TonClient({
//     endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",   
//   });           //  - testnet
  
 
//   const [tonBalance, setTonBalance] = useState<string | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       if (!wallet) return;
  
//       try {
//         const address = Address.parse(wallet);
  
//         const balance = await client.getBalance(address); // баланс тонкоинов в кошельке
  
//         setTonBalance((Number(balance) / 1e9).toFixed(4));
//       } catch (e) {
//         console.error(e);
//         setTonBalance("Error");
//       }
//     };
  
//     load();
//   }, [wallet]);

//   return balance 
// }

import { Address } from "ton-core";
import { TonClient } from "ton";
import { useEffect, useState } from "react";
import { useTonConnect } from "./useTonConnect";

// // Настраиваем клиент TON (лучше вынести за пределы хука, чтобы не пересоздавать при каждом рендере)
// const client = new TonClient({
//   endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC", // testnet
// });

  const client = new TonClient({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",   
  });   //  - mainnet

// Переименовали в хук useTonBalance согласно правилам React
export function useTonBalance(): string | null {
  const { wallet } = useTonConnect();

  
  const [tonBalance, setTonBalance] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      // Если кошелек не подключен, сбрасываем баланс в null
      if (!wallet) {
        setTonBalance(null);
        return;
      }

      try {
        const address = Address.parse(wallet);
        const balance = await client.getBalance(address); // получаем баланс в нано-TON

        // Делим на 10^9, чтобы перевести в TON, и оставляем 4 знака после запятой
        setTonBalance((Number(balance) / 1e9).toFixed(4));
      } catch (e) {
        console.error(e);
        setTonBalance("Error");
      }
    };

    load();
  }, [wallet]);

  // Возвращаем переменную состояния баланса кошелька, которая доступна во всем хуке
  return tonBalance;
}
