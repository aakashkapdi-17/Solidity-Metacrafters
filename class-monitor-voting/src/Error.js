import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div className="flex h-96 justify-center items-center gap-2 text-center">
      {`Error...${errorMessage}.`}
    </div>
  );
};

export default Error;
