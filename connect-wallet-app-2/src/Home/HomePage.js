import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import Navbar from "../components/Navbar/Navbar";

import { useBalance } from "wagmi";

export default function CustomButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  const address = useAccount().address;
  const Balance = useBalance({ address: address });
  console.log();
  return (
    <>
      <Navbar />
      {isConnected ? (
        <>
          <h2>Wallet Address:{address} </h2>
          <h2>Balance:{Balance.data.formatted} </h2>
        </>
      ) : (
        <h2>Not Connected to Wallet</h2>
      )}
    </>
  );
}
