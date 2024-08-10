import React, { useEffect, useState } from "react";
import Axios from "axios";
import ItemModal from "./ItemModal";
import ItemCard from "./ItemCard";
import { useItemContext } from "../Hooks/useItemContext";

const InventoryList = ({ update, signedIn, newItem }) => {
  const [items, setItems] = useState([]); //editable array
  const [ITEMS, setITEMS] = useState([]); //set array
  const [editing, setEditing] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [USER, setUSER] = useState({});
  const [moreInfoOption, setMoreInfoOption] = useState("");

  const getUserItems = (data) => {
    data = data || undefined;
    console.log(ITEMS, items, USER);
    if (USER != {} || USER !== undefined) {
      if (data !== undefined) {
        console.log("DATA DEFINED");
        const temp = data.filter((i) => {
          return i.UserId === USER._id;
        });
        console.log(temp, data);
        setItems(temp);
      } else {
        console.log("DATA UNDEFINED");
        console.log(ITEMS, USER._id);
        const temp = ITEMS.filter((i) => {
          return i.UserId === USER._id;
        });
        console.log(temp);
        console.log(ITEMS);
        setItems(temp);
      }
    } else {
      setItems(ITEMS);
    }
    console.log(ITEMS);
    console.log(items);
    console.log(USER);
  };

  const getAllItems = () => {
    console.log(ITEMS, items, USER);
    setItems(ITEMS);
    console.log(ITEMS, items, USER);
  };

  useEffect(() => {
    getUserItems();
  }, [USER]);

  useEffect(() => {
    Axios.get("/api/users/getCurrentUser")
      .then((res) => {
        console.log("GET USER");
        // if (!signedIn) {
        //   setUSER({});
        // } else {
        //   setUSER(res.data.user);
        // }
        if (signedIn) setUSER(res.data.user);
        return res.data;
        // ITEM(JSON.parse(localStorage.getItem("User")));
      })
      .then((data) => {
        console.log(data);
        // getUserItems();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [signedIn]);

  useEffect(() => {
    console.log("SWITCH: ", update);
    let data = JSON.parse(localStorage.getItem("UPDATE_OPTION"));
    console.log(data);
    switch (update) {
      case "USER_ITEMS":
        getUserItems();
      case "ALL_ITEMS":
        if (update === "ALL_ITEMS") {
          //do not remove this condition, will break everything
          getAllItems();
        }
      case "LOGIN":
        break;
      case "CREATE_ITEM":
        console.log("HERE");
        const temp = [newItem];
        console.log(temp);
        const data = temp.concat(ITEMS);
        console.log(data);
        setITEMS(data);
        getUserItems(data);
        break;
      case "LOGOUT":
        setItems(ITEMS);
        break;
      default:
        console.log("No update");
        break;
    }
  }, [update]);

  useEffect(() => {
    Axios.get("/api/inventory/getall")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log("GET ALL ITEMS");
        setItems(data);
        setITEMS(data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  const toggleMoreInfo = (data) => {
    // if (moreInfo && !editing) {
    //   console.log("SET FALSE");
    //   setMoreInfo(false);
    // } else if (data === true) {
    //   console.log("SET DATA TRUE");
    //   setMoreInfo(true);
    // } else if (data === false) {
    //   console.log("SET DATA FALSE");
    //   setMoreInfo(false);
    // } else {
    //   console.log("SET TRUE");
    //   setMoreInfo(true);
    // }
    console.log(data);
    switch (data) {
      case "MORE_INFO":
        if (moreInfo) {
          setMoreInfo(false);
        } else {
          setMoreInfo(true);
        }
        break;
      case "EDIT":
        console.log("HERE");
        setMoreInfo(true);
        break;
      case "CANCEL":
        setMoreInfo(false);
        break;
      default:
        break;
    }
  };

  // const toggleEdit = () => {
  //   if (editing) {
  //     setEditing(false);
  //   } else {
  //     setEditing(true);
  //   }
  //   toggleMoreInfo("EDIT");
  // };

  const editItem = (data) => {
    const tempArray = ITEMS;
    const index = tempArray.findIndex((i) => {
      return i._id === data._id;
    });
    console.log(tempArray);
    tempArray[index].ItemName = data.ItemName;
    tempArray[index].Quantity = data.Quantity;
    tempArray[index].Description = data.Description;
    console.log(tempArray);
    setItems(tempArray);
    if (update === "USER_ITEMS") {
      getUserItems(tempArray);
    } else if (update === "ALL_ITEMS") {
      getAllItems();
    }
  };

  const handleDelete = (item) => {
    console.log(items);
    console.log(item._id);
    Axios.delete(`/api/inventory/${item._id}`)
      .then((res) => {
        console.log(`Deleted ${item.ItemName}`);
      })
      .catch((err) => {
        console.error(err);
      });
    const data = ITEMS.filter((i) => {
      return i._id !== item._id;
    });
    console.log(data);
    // setItems(data);
    setITEMS(data);
    getUserItems(data);
    console.log(items);
  };

  // const Card = ({ index, item, description }) => {
  //   if (editing && signedIn) {
  //     return (
  //       <section
  //         key={item._id}
  //         className="card bg-base-300 text-white border shadow-lg"
  //       >
  //         <div className="card-body   ">
  //           <h2 className="card-title text-4xl ">
  //             <div className="input-box " contenteditable="true">
  //               {item.ItemName}
  //             </div>
  //             <div
  //               className=" input-box badge badge-secondary justify-end"
  //               contenteditable="true"
  //             >
  //               Qty: {item.Quantity}
  //             </div>
  //           </h2>
  //           <div className="input-box break-words" contenteditable="true">
  //             {description}
  //           </div>
  //           <div className="card-actions justify-end">
  //             <button className="btn btn-primary" onClick={toggleEdit}>
  //               Submit
  //             </button>
  //           </div>
  //         </div>
  //       </section>
  //     );
  //   } else if (signedIn) {
  //     return (
  //       <section
  //         key={item._id}
  //         className="card bg-base-300 text-white border shadow-lg"
  //       >
  //         <div className="card-body   ">
  //           <h2 className="card-title text-4xl gap-5">
  //             <div className="">{item.ItemName}</div>
  //             <div className="badge badge-secondary" contenteditable="true">
  //               Qty: {item.Quantity} {index}
  //             </div>
  //           </h2>

  //           <p className="break-words">{description}</p>
  //           <div className="card-actions justify-end">
  //             {/* {tooLong && ( */}
  //             <button
  //               className="btn btn-primary"
  //               onClick={() => toggleMoreInfo(index)}
  //             >
  //               More Info
  //             </button>
  //             {/* )} */}
  //             <button className="btn btn-primary" onClick={toggleEdit}>
  //               Edit
  //             </button>
  //             <button
  //               className="btn btn-primary"
  //               onClick={(e) => handleDelete(item)}
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       </section>
  //     );
  //   } else {
  //     return (
  //       <section
  //         key={item._id}
  //         className="card bg-base-300 text-white border shadow-lg"
  //       >
  //         <div className="card-body   ">
  //           <h2 className="card-title text-4xl gap-5">
  //             <div className="">{item.ItemName}</div>
  //             <div className="badge badge-secondary" contenteditable="true">
  //               Qty: {item.Quantity}
  //             </div>
  //           </h2>

  //           <p className="break-words">{description}</p>
  //           <div className="card-actions justify-end">
  //             <button className="btn btn-primary" onClick={toggleMoreInfo}>
  //               More Info
  //             </button>
  //           </div>
  //         </div>
  //       </section>
  //     );
  //   }
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-10 px-10 ">
      {/* {console.log("InventoryList rendered")}
      {console.log(items)} */}
      {items.map((item, index) => {
        // let description = "";
        // if (item.Description.length <= 100 || moreInfo) {
        //   console.log("HERE");
        //   description = item.Description;
        // } else {
        //   console.log("HERE1");
        //   description = item.Description.substring(0, 100) + "...";
        // }
        // console.log(item);
        // console.log(description);
        return (
          <ItemCard
            index={index}
            key={item.id}
            item={item}
            description={item.Description}
            signedIn={signedIn}
            moreInfo={moreInfo}
            toggleMoreInfo={toggleMoreInfo}
            handleDelete={handleDelete}
            editItem={editItem}
          />
        );
      })}
    </div>
  );
};

export default InventoryList;
