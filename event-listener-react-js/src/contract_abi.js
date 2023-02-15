export const contractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "Call",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "var1",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "var2",
        type: "uint8",
      },
    ],
    name: "add",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "var1",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "var2",
        type: "uint8",
      },
    ],
    name: "divide",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "var1",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "var2",
        type: "uint8",
      },
    ],
    name: "multiply",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "var1",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "var2",
        type: "uint8",
      },
    ],
    name: "subtract",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
