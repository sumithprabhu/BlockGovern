import React from "react";

function TransactionPopUp({
  setLoading,
  transactionUpdates,
  setTransactionUpdates,
}) {
  return (
    <div>
      <div
        className="popup-2 relative rounded-md overflow-hidden "
        id="notification-box"
      >
        <div className="flex justify-center w-full text-[#1E4DD8] p-4 font-[700]  ">
          {/* <h1 className=" text-[1.5rem]">STAKE</h1> */}
          <svg
            className="cursor-pointer absolute"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#ffffff"
            onClick={() => {
              setTransactionUpdates();

              setLoading(false);
            }}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        </div>

        <>
          <div
            className="m-auto p-2 max-w-max rounded-xl"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div class="lds-roller my-[20px]">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <h1
            className="max-w-[50%] text-center mx-auto text-[#ffffff] "
            style={{ color: "white", fontSize: "35px" }}
          >
            Waiting for the transaction to get confirmed...
          </h1>
          <p
            className="max-w-[70%] my-4 text-center mx-auto text-[#ffffffc7] font-[600] text-[1.1rem]"
            style={{ color: "white", fontSize: "20px", fontStyle: "italic" }}
          >
            {transactionUpdates}
          </p>
        </>
      </div>
      <div
        className="overlay"
        onClick={() => {
          setTransactionUpdates();
          setLoading(false);
        }}
      ></div>
    </div>
  );
}

export default TransactionPopUp;
