import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { ContractABI } from "./abi";
import Error from "./Error";
import "./App.css";

function App() {
  //USE STATES
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);
  const [contractLoaded, setContractLoaded] = useState(false);
  const [contract, setContract] = useState(null);

  //WALLET CONNECTION
  const connectWalletHandler = async () => {
    let provider1;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider1 = ethers.getDefaultProvider();
    } else {
      provider1 = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider1);
      await provider1.getSigner().then((signer) => {
        setSigner(signer);
      });
      try {
      } catch (e) {
        console.log(e);
      }
      connectToContract();
    }
  };

  const connectToContract = () => {
    const contract = new ethers.Contract(
      "0x18143a0A602E8A84564eF7163d9c6CBa93CD5F45",
      ContractABI,
      provider
    );
    console.log(contract);
  };

  useEffect(() => connectWalletHandler, []);

  const showError = () => {
    toast.error("error", {
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
  const showSuccess = () => {
    toast.success("Success", {
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
  return (
    <>
      <Error errorMessage={"Contract Not Found"} />
      {/* <div className="flex h-96 justify-center items-center gap-2 text-center">
        <div className="border-2 border-red-400 w-80 h-80">
          <h1 className="p-2 m-2 font-semibold text-red-700">Add Student</h1>
          <div className="flex flex-col justify-center">
            <input
              type="text"
              className="m-2 p-2 border-2 border-slate-400"
              placeholder="Enter the name"
            />
            <input
              type="text"
              className="m-2 p-2 border-2 border-slate-400"
              placeholder="Enter roll number"
            />
            <button className="bg-red-200 p-2 px-5 m-2 rounded-md hover:bg-red-300 hover:font-semibold">
              Submit
            </button>
          </div>
        </div>
        <div className="border-2 border-blue-400 w-80 h-80">
          <h1 className="p-2 m-2 font-semibold text-blue-700">Vote</h1>
          <div className="flex flex-col justify-center">
            <input
              type="text"
              className="m-2 p-2 border-2 border-slate-400"
              placeholder="Enter Account No"
            />

            <button className="bg-blue-200 p-2 px-5 m-2 rounded-md hover:bg-blue-300 hover:font-semibold">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="bg-red-200 p-2 px-5 m-2 rounded-md hover:bg-red-300 hover:font-semibold"
          onClick={showSuccess}
        >
          Winner
        </button>
        <div className="font-semibold">
          <p>Name:</p>
          <p>Roll No:</p>
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
      /> */}
    </>
  );
}

export default App;
