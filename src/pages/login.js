import React, { useState } from 'react';
import Web3 from 'web3';

import contractABI from '../abis/Dmusic.json';

function LoginPage() {
  const [account, setAccount] = useState('');

  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545/");
  const contract = new web3.eth.Contract(contractABI.abi);
  contract.setProvider(web3.currentProvider);

  async function connectMetamask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Metamask not detected.');
    }
  }

  return (
    <div>
      <h1>Login with Metamask</h1>
      {account ? (
        <p>Connected with {account}</p>
      ) : (
        <button onClick={connectMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
}

export default LoginPage;
