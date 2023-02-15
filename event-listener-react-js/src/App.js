import { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { contractAbi } from "./contract_abi";
function App() {
  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  let contract;
  const [signer, setSigner] = useState(null);
  const notify = () => console.log("hello");
  const connect = async () => {
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);

      await provider.getSigner().then((result) => {
        setSigner(result);
        showSuccess("Connected to Wallet ");
      });
    }
  };

  return (
    <>
      <div className="App">
        <h1>Events in Solidity</h1>
        <div className="function-buttons">
          <button className="btn" onClick={connect}>
            Connect to Wallet
          </button>
          <button
            className="btn"
            disabled={signer ? false : true}
            onClick={async () => {
              const contract = new ethers.Contract(
                process.env.REACT_APP_CONTRACT_ADDRESS,
                contractAbi,
                signer
              );

              contract.on(contract.filters.Call, (caller, message) => {
                showSuccess(
                  "Event triggered caller:" + caller + "message:" + message
                );
              });
              const transaction = await contract.add(4, 5);

              await transaction.wait().then((result) => {
                console.log(result);
              });
            }}
          >
            Add
          </button>
          <button
            className="btn"
            disabled={signer ? false : true}
            onClick={async () => {
              const contract = new ethers.Contract(
                process.env.REACT_APP_CONTRACT_ADDRESS,
                contractAbi,
                signer
              );

              contract.on(contract.filters.Call, (caller, message) => {
                showSuccess(
                  "Event triggered caller:" + caller + "message:" + message
                );
              });
              const transaction = await contract.subtract(4, 5);

              await transaction.wait().then((result) => {
                console.log(result);
              });
            }}
          >
            Subtract
          </button>
          <button
            className="btn"
            disabled={signer ? false : true}
            onClick={async () => {
              const contract = new ethers.Contract(
                process.env.REACT_APP_CONTRACT_ADDRESS,
                contractAbi,
                signer
              );

              contract.on(contract.filters.Call, (caller, message) => {
                showSuccess(
                  "Event triggered caller:" + caller + "message:" + message
                );
              });
              const transaction = await contract.multiply(4, 5);

              await transaction.wait().then((result) => {
                console.log(result);
              });
            }}
          >
            Multiply
          </button>
          <button
            className="btn"
            disabled={signer ? false : true}
            onClick={async () => {
              const contract = new ethers.Contract(
                process.env.REACT_APP_CONTRACT_ADDRESS,
                contractAbi,
                signer
              );

              contract.on(contract.filters.Call, (caller, message) => {
                showSuccess(
                  "Event triggered caller:" + caller + "message:" + message
                );
              });
              const transaction = await contract.divide(4, 5);

              await transaction.wait().then((result) => {
                console.log(result);
              });
            }}
          >
            Divide
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
