import * as React from "react";
import CreateItemForm from "./CreateItemForm";

const CreateItemModal = ({ creating, newItem }) => {
  return (
    <>
      <button
        data-theme="dark"
        className="text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center bg-base-300"
        onClick={() => document.getElementById("CreateItemModal").showModal()}
      >
        Create Item
      </button>
      <dialog id="CreateItemModal" className="modal">
        <div className="modal-box">
          <CreateItemForm creating={creating} newItem={newItem} />
        </div>
      </dialog>
    </>
  );
};

export default CreateItemModal;
