import * as React from "react";
import ItemForm from "./ItemForm";

const ItemModal = ({ Item }) => {
  return (
    <>
      <button
        data-theme="dark"
        className="text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
        onClick={() => document.getElementById("ItemModal").showModal()}
      >
        View Item
      </button>
      <dialog id="ItemModal" className="modal">
        <div className="modal-box">
          <ItemForm Item={Item} />
        </div>
      </dialog>
    </>
  );
};

export default ItemModal;
