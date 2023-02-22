import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-400 flex flex-cols justify-between">
      <div className="mx-auto px-2 text-3xl py-5 mx-20 text-slate-100">
        Decentralized Bank
      </div>
      <div className="flex flex-row px-10">
        <div className=" flex items-center px-2">
          <button className="mx-auto py-2 rounded-md w-60 text-xl text-center cursor-pointer text-slate-100 hover:bg-white hover:text-slate-600 ">
            Connect to Wallet
          </button>
        </div>
        <div className="flex items-center px-2">
          <div className="mx-auto p-2 rounded-md w-60 text-xl cursor-pointer text-slate-100">
            <p>Account No:</p>
            <p>Balance:</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
