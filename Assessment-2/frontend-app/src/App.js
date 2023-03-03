import React, { useState, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import { RotatingSquare } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

import CounterJson from "./ContractContext/Counter.json";
import "./App.css";

const App = () => {
  const [count, setcount] = useState(null);
  const [signer, setsigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    callShowCount();
  }, [contract]);

  useEffect(() => {
    connectWallet();
  }, []);

  const showError = (message) => {
    toast.error(message, {
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

  //Connect wallet function
  const connectWallet = async () => {
    let _provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      _provider = ethers.getDefaultProvider();
    } else {
      try {
        _provider = new ethers.BrowserProvider(window.ethereum);
        await _provider.getSigner().then((_signer) => {
          setsigner(_signer);
          connectContract(_signer);
        });
        showSuccess("Wallet Connected");
      } catch (error) {
        showError("Error while connecting to wallet");
      }
    }
  };

  //Fetching and initialising contract

  const connectContract = (_signer) => {
    try {
      const _contract = new Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        CounterJson["abi"],
        _signer
      );

      setContract(_contract);
    } catch (error) {
      showError("Error while connecting to contract");
    }
  };

  // CALLING showCount() FUNCTION

  const callShowCount = async () => {
    await contract.showCount().then((_count) => {
      setcount(Number(_count));
    });
  };

  // CALLING increment() FUNCTION

  const callIncrement = async () => {
    setloading(true);
    try {
      const transaction = await contract.increment();
      await transaction.wait().then(() => {
        //Show Success Toast
        showSuccess("Increment Done");
        callShowCount();
        setloading(false);
      });
    } catch (e) {
      showError("Error while Incrementing count");
    }
    setloading(false);
  };

  // CALLING DECREMENT() FUNCTION
  const callDecrement = async () => {
    setloading(true);
    try {
      const transaction = await contract.decrement();
      await transaction.wait().then(() => {
        //Show Success Toast
        showSuccess("Decrement Done");
        callShowCount();
      });
    } catch (e) {
      showError("Error while decrementing count");
    }
    setloading(false);
  };

  return (
    <div>
      <div className="connect-wallet">
        <button
          className="connect-wallet-btn"
          onClick={connectWallet}
          disabled={signer}
        >
          {signer ? signer.address : "Connect Wallet"}
        </button>
      </div>
      <div className="outer-box">
        {signer ? (
          <>
            <h2>Count= {count}</h2>
            {!loading ? (
              <>
                <button
                  className="btn"
                  onClick={() => {
                    callIncrement();
                  }}
                >
                  Increment
                </button>
                {count === 0 ? (
                  <></>
                ) : (
                  <button
                    className="btn"
                    onClick={() => {
                      callDecrement();
                    }}
                  >
                    Decrement
                  </button>
                )}
              </>
            ) : (
              <>
                <div>Processing the Transaction...</div>
                <div className="loader">
                  <RotatingSquare
                    height="100"
                    width="100"
                    color="#FF0000"
                    ariaLabel="rotating-square-loading"
                    strokeWidth="4"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    className="loader"
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
