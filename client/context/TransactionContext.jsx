import React, {useState, useEffect, Children} from 'react';
import { ethers } from 'ethers'; // Biblioteca para interação com Ethereum
import { contractABI, contractAddress } from '../lib/constants';

export const TransactionContext = React.createContext();

let eth;

if(typeof window !== 'undefined'){
    eth = window.ethereum;
}

const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress, contractABI, signer
    );

    return transactionContract;
}

// 0x04C03e57134A5A75C87dB656bbf423FA7519EC28

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: ''
    });

    useEffect(() => {
        checkIfWalletIsConnected();
        console.log('wallet is already connected');
    }, []);
    
    const connectWallet = async (metamask = eth) => {
        try{
            if(!metamask) return alert('Please install Metamask!');
            const accounts = await metamask.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        }catch(error) {
            console.error(error);
            throw new Error('No ethereum object!');
        }
    }

    const checkIfWalletIsConnected = async (metamask = eth) => {
        try {
            if(!metamask) return alert('Please install Metamask!');
            const accounts = await metamask.request('eth_accounts');
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                console.log(accounts[0]);
            }
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object!');
        }
    }

    const sendTransaction = async(
        metamask = eth,
        connectedAccount = currentAccount
    ) => {
        try {
            if(!metamask) return alert('Please install metamask');
            const { addressTo, amount } = formData;
            const transactionContract = await getEthereumContract();
            // 2. Conversão correta para Wei
            const parsedAmount = ethers.parseEther(
                Number(amount).toLocaleString('en-US', { useGrouping: false }) // Força formato 9.91
            );

            await metamask.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: "0x7EF40", // 21000 Gwei
                    value: ethers.toQuantity(parsedAmount), // Conversão segura para hex
                }]
            });

            const transactionHash = await transactionContract.publishTransaction(
                addressTo, 
                parsedAmount, 
                `Transfering ETH ${parsedAmount} to ${addressTo}`,
                'TRANSFER'
            );

            await transactionHash.wait();

            setIsLoading(true);

            /*
            Data Base
            await saveTransaction(
                transactionHash.hash, amount, connectedAccount, addressTo
            );
            */

            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    return (
        <TransactionContext.Provider
            value={{
                currentAccount,
                connectWallet,
                sendTransaction,
                handleChange,
                formData
            }}>
           {children}
        </TransactionContext.Provider>
    )
}