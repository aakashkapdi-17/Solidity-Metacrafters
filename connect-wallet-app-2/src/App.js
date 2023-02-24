import "./App.css";

import HomePage from "./Home/HomePage";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";

import {
  useAccount,
  useDisconnect,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";

import { goerli } from "wagmi/chains";

function App() {
  const chains = [goerli];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "d61a1412efc71085289de26fd168834d" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: "d61a1412efc71085289de26fd168834d",
      version: "1", // or "2"
      appName: "web3Modal",
      chains,
    }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal
        projectId="d61a1412efc71085289de26fd168834d"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default App;
