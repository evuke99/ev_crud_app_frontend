import * as React from "react";
import SignInForm from "./SignInForm";

const SignInModal = ({ logginIn }) => {
  return (
    <>
      <button
        className="text-white hover:text-blue-600 bg-base-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
        onClick={() => document.getElementById("SignInModal").showModal()}
      >
        Sign In
      </button>
      <dialog id="SignInModal" className="modal">
        <div className="modal-box">
          <SignInForm logginIn={logginIn} />
        </div>
      </dialog>
    </>
  );
};

export default SignInModal;
