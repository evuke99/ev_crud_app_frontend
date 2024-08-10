import * as React from "react";
import RegisterForm from "./RegisterForm";

const RegisterModal = () => {
  return (
    <div>
      <button
        data-theme="dark"
        className="text-white bg-blue-100 md:bg-primary hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary"
        onClick={() => document.getElementById("RegisterModal").showModal()}
      >
        Register
      </button>
      <dialog id="RegisterModal" className="modal">
        <div className="modal-box">
          <RegisterForm />
        </div>
      </dialog>
    </div>
  );
};

export default RegisterModal;
