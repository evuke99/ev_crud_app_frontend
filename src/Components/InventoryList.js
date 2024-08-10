import React, { useEffect, useState } from "react";
import Axios from "axios";
import ItemCard from "./ItemCard";

const InventoryList = ({ update, signedIn, newItem }) => {
  const [items, setItems] = useState([]); //editable array
  const [ITEMS, setITEMS] = useState([]); //set array
  const [editing, setEditing] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [USER, setUSER] = useState({});

  const getUserItems = (data) => {
    data = data || undefined;
    if (USER != {} || USER !== undefined) {
      if (data !== undefined) {
        const temp = data.filter((i) => {
          return i.UserId === USER._id;
        });
        setItems(temp);
      } else {
        const temp = ITEMS.filter((i) => {
          return i.UserId === USER._id;
        });
        setItems(temp);
      }
    } else {
      setItems(ITEMS);
    }
  };

  const getAllItems = () => {
    setItems(ITEMS);
  };

  useEffect(() => {
    getUserItems();
  }, [USER]);

  useEffect(() => {
    Axios.get("/api/users/getCurrentUser")
      .then((res) => {
        console.log("GET USER");
        if (signedIn) setUSER(res.data.user);
        return res.data;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [signedIn]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("UPDATE_OPTION"));

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
        const temp = [newItem];
        const data = temp.concat(ITEMS);
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
    switch (data) {
      case "MORE_INFO":
        if (moreInfo) {
          setMoreInfo(false);
        } else {
          setMoreInfo(true);
        }
        break;
      case "EDIT":
        setMoreInfo(true);
        break;
      case "CANCEL":
        setMoreInfo(false);
        break;
      default:
        break;
    }
  };

  const editItem = (data) => {
    const tempArray = ITEMS;
    const index = tempArray.findIndex((i) => {
      return i._id === data._id;
    });
    tempArray[index].ItemName = data.ItemName;
    tempArray[index].Quantity = data.Quantity;
    tempArray[index].Description = data.Description;
    setItems(tempArray);
    if (update === "USER_ITEMS") {
      getUserItems(tempArray);
    } else if (update === "ALL_ITEMS") {
      getAllItems();
    }
  };

  const handleDelete = (item) => {
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
    setITEMS(data);
    getUserItems(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-10 px-10 ">
      {items.map((item, index) => {
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
