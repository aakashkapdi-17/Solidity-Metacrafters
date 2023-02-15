const hre = require("hardhat");

async function main() {
  const EventListener = await hre.ethers.getContractFactory("EventListener");
  const eventListener = await EventListener.deploy();

  await eventListener.deployed();

  console.log(`Contract deployed to ${eventListener.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
