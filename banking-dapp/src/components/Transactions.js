import React from "react";

const Transactions = () => {
  return (
    <div className=" flex justify-center">
      <div className="bg-slate-200 flex flex-col px-10 my-4 text-slate-800">
        <h2 className="flex justify-center my-6 text-2xl font-bold">
          Transactions
        </h2>
        <p className="text-red-700">**Connect to Wallet to make transactions</p>
        <div className="flex flex-row justify-center my-4 p-2 border-2 border-gray-400 ">
          <input
            className="mx-4 rounded-sm p-2"
            type="text"
            placeholder="Enter Amount"
          />
          <button
            className="px-4 border-transparent border-2 rounded-lg enabled:hover:border-gray-700 enabled:hover:bg-gray-400 disabled:hover:cursor-not-allowed  text-2xl "
            disabled={true}
          >
            Deposit Balance
          </button>
        </div>
        <div className="flex flex-row justify-center my-4 p-2 border-2 border-gray-400 ">
          <input
            className="mx-4 rounded-sm p-2"
            type="text"
            placeholder="Enter Amount"
          />
          <button
            className="px-4 border-transparent border-2 rounded-lg enabled:hover:border-gray-700 enabled:hover:bg-gray-400 disabled:hover:cursor-not-allowed text-2xl "
            disabled={true}
          >
            Withdraw Balance
          </button>
        </div>
        <div className="flex flex-row justify-center my-4 p-2 border-2 border-gray-400 ">
          <input
            className="mx-4 rounded-sm p-2"
            type="text"
            placeholder="Enter Amount"
          />
          <input
            className="mx-4 rounded-sm p-2"
            type="text"
            placeholder="Enter Recipient Account"
          />
          <button
            className="px-4 border-transparent border-2 rounded-lg enabled:hover:border-gray-700 enabled:hover:bg-gray-400 disabled:hover:cursor-not-allowed text-2xl "
            disabled={true}
          >
            Transfer Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
