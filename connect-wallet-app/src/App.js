import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [accountAddress, setaccountAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = async () => {
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.getSigner().then((signer) => {
        setConnButtonText("Wallet Connected");
        setDefaultAccount(signer);
        setDefaultAccount(signer);
        setaccountAddress(signer.address);
        provider.getBalance(signer.address).then((balance) => {
          setUserBalance(balance.toString() + " " + "wei");
        });
      });
      try {
      } catch (e) {
        console.log(e);
      }
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", connectWalletHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="App">
      <div className="box-outer">
        <h1>Connection to Metamask</h1>
        <button className="btn" onClick={connectWalletHandler}>
          {connButtonText}
        </button>
        <h5>Address: {accountAddress}</h5>
        <h5>Balance: {userBalance} </h5>
      </div>
    </div>
  );
}

export default App;
