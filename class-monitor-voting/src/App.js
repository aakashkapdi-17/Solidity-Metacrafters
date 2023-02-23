import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
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
      <div className="flex h-96 justify-center items-center gap-2 text-center">
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
      />
    </>
  );
}

export default App;
