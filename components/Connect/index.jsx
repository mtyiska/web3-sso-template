import React, {useState} from 'react';
import styles from './Button.module.css';
import {ethers} from "ethers";
import {authRequest} from "../../utils/apiRequests"


const ConnectWallet = () => {
    const [{account, loggedIn}, setState] = useState({
        account: '',
        loggedIn: false
    });

    const handleAuth = async () =>{
        const {ethereum} = window;
        if(ethereum){
            console.log("ethereum exists", ethereum)
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
            setState((oldState) =>({
                ...oldState,
                account: accounts[0]
            }))

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            authRequest(accounts[0], signer, setState)
        }
        else{
            console.log('no wallet detected');
        }
    }
    return (
        <div className={styles.container}>
            <button
            className={styles.button}
            onClick={handleAuth}
            >Connect Wallet</button>
            {loggedIn && <p>You are logged in as { account }</p>}
        </div>
    )
}
export default ConnectWallet;