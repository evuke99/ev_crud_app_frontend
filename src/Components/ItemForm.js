import EasyEdit, { Types } from "react-easy-edit";
import ContentEditable from "react-contenteditable";

const { useState, useEffect } = require("react");

const ItemForm = ({ Item }) => {
  const [ItemName, setItemName] = useState("");
  const [Description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState(null);
  const [Editing, setEdidting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = localStorage.getItem("User");
    const UserId = JSON.parse(data)._id;
    const user = { UserId, ItemName, Description, Quantity };

    fetch("/api/inventory/create", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          const json = res.json();
          document.getElementById("register-modal-form").submit();
          return json;
        }
      })
      .then((data) => {
        setItemName("");
        setDescription("");
        setQuantity("");
        console.log("new item added", data);
        // creating();
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  return (
    <section>
      <div className="flex flex-col smd:h-screen lg:py-0">
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="modal-action">
            <form method="dialog" id="register-modal-form">
              {/* if there is a button in form, it will close the modal */}
              <button>X</button>
            </form>
          </div>
          <div className=" md:space-y-8 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register Inventory Manager
            </h1>
            <form className="space-y-2 md:space-y-2" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="ItemName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  name="ItemName"
                  id="ItemName"
                  placeholder="Item"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setItemName(e.target.value)}
                  value={ItemName}
                />
              </div>
              <div className="break-words">
                <label
                  htmlFor="Description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                {/* <input
                  type="text"
                  name="Description"
                  id="Description"
                  placeholder="Description"
                  className="bg-[#1d232a] rounded-lg w-full break-words size-96"
                  required=""
                  onChange={(e) => setDescription(e.target.value)}
                  defaultValue={
                    "5555555555555555555555555555555555555555555555511111111111113215618161651518915615615648946165156156154898618948189189189141845511"
                  }
                /> */}
                <textarea
                  className="textarea textarea-ghost w-full resize-none p-0"
                  placeholder={Item.Description}
                  onChange={Description}
                ></textarea>
                <div
                  className="input-box rounded w-full "
                  contenteditable="true"
                  onChange={Description}
                >
                  {Item.Description}
                </div>
              </div>
              <div>
                <label
                  htmlFor="Quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="2"
                  id="Quantity"
                  placeholder="2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setQuantity(e.target.value)}
                  defaultValue={Item.Quantity}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:text-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemForm;
