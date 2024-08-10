import { useEffect, useState } from "react";
import ContentEditable from "./ContentEditable";
import Axios from "axios";

const ItemCard = (props) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [oldItemName, setOldItemName] = useState("");
  const [oldDescription, setOldDescription] = useState("");
  const [oldQuantity, setOldQuantity] = useState("");
  const [editing, setEditing] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);

  useEffect(() => {
    // console.log(props.item);
    // console.log(props.description);
    // console.log("MORE INFO: ", props.moreInfo);
    // if (props.moreInfo) {
    //   setMoreDescription(props.description);
    // }
    // setItemName(props.item.ItemName);
    // // console.log(props.moreInfo);
    // console.log(props.description.length <= 100);
    // if (moreInfo || props.description.length <= 100) {
    //   console.log("here1: ", props.item.ItemName);
    //   setDescription(props.description);
    //   setOldDescription(props.description);
    // } else {
    //   console.log("here2: ", props.item.ItemName);
    //   console.log(props.description.substring(0, 100) + "...");
    //   setDescription(props.description.substring(0, 100) + "...");
    //   setOldDescription(props.description.substring(0, 100) + "...");
    // }
    setItemName(props.item.ItemName);

    setDescription(props.description);
    setOldDescription(props.description);

    setQuantity(props.item.Quantity);
    setOldItemName(props.item.ItemName);

    setOldQuantity(props.item.Quantity);
  }, [props.item]);

  //   useEffect(() => {
  //     setItemName(oldItemName);
  //     setDescription(oldDescription);
  //     setQuantity(oldQuantity);
  //   }, [itemName, description, quantity]);

  const toggleEdit = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const handleEdit = () => {
    // props.toggleMoreInfo("EDIT");
    setMoreInfo(true);
    toggleEdit();
  };

  const handleSubmit = (item) => {
    let data = {
      ItemName: itemName,
      Quantity: quantity,
      Description: description,
    };
    console.log(data);
    console.log(item._id);
    Axios.patch(`/api/inventory/${item._id}`, data)
      .then((res) => {
        console.log(res);
        console.log(`Item ID: ${item._id} was changed`);
        handleEdit();
      })
      .catch((err) => {
        console.log(err);
      });
    data._id = item._id;
    console.log(data);
    props.editItem(data);
  };

  const handleCancel = () => {
    setItemName(oldItemName);
    setDescription(oldDescription);
    setQuantity(oldQuantity);
    toggleEdit();
    // props.toggleMoreInfo("CANCEL");
    setMoreInfo(false);
  };

  const handleMoreInfo = () => {
    setMoreInfo(() => {
      if (moreInfo) {
        return false;
      } else {
        return true;
      }
    });
  };

  const Description = () => {
    if (moreInfo || description.length <= 100) {
      return description;
    } else {
      return description.substring(0, 100) + "...";
    }
  };

  if (editing && props.signedIn) {
    return (
      <section
        key={props.item._id}
        className="card bg-base-300 text-white border shadow-lg"
      >
        <div className="card-body   ">
          <h2 className="card-title text-4xl gap-5 ">
            <ContentEditable
              value={itemName}
              onChange={(e) => setItemName(e)}
            />
            <div className="resize-none badge badge-secondary gap-1">
              <div>Qty:</div>
              <ContentEditable
                value={quantity}
                onChange={(e) => setQuantity(e)}
              />
            </div>
          </h2>
          <ContentEditable
            value={Description()}
            onChange={(e) => setDescription(e)}
          />
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={(e) => handleSubmit(props.item)}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    );
  } else if (props.signedIn) {
    return (
      <section
        key={props.item._id}
        className="card bg-base-300 text-white border shadow-lg"
      >
        {console.log("ItemCard rendering")}
        <div className="card-body   ">
          <h2 className="card-title text-4xl gap-5">
            <div className="">{itemName}</div>
            <div className="badge badge-secondary gap-1">
              <div>Qty:</div>
              <div>{quantity}</div>
            </div>
          </h2>

          <p className="break-words">{Description()}</p>
          <div className="card-actions justify-end">
            {/* {tooLong && ( */}
            <button className="btn btn-primary" onClick={handleMoreInfo}>
              More Info
            </button>
            {/* )} */}
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => props.handleDelete(props.item)}
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    // console.log(temp());
    return (
      <section
        key={props.item._id}
        className="card bg-base-300 text-white border shadow-lg"
      >
        {/* {console.log(description)} */}
        <div className="card-body   ">
          <h2 className="card-title text-4xl gap-5">
            <div className="">{itemName}</div>
            <div className="badge badge-secondary">Qty: {quantity}</div>
          </h2>

          <p className="break-words">{Description()}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleMoreInfo}>
              More Info
            </button>
          </div>
        </div>
      </section>
    );
  }
};

export default ItemCard;
