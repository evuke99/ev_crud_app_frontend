// Components
import { useEffect, useState } from "react";
import InventoryList from "../Components/InventoryList";
import UserList from "../Components/UserList";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [update, setUpdate] = useState("");
  const [signedIn, setSignedIn] = useState("");
  const [newItem, setNewItem] = useState({});

  const Update = (data) => {
    console.log(data);
    setUpdate(data);
  };

  const SignIn = (data) => {
    setSignedIn(data);
  };

  const NewItem = (data) => {
    setNewItem(data);
  };

  useEffect(() => {}, [update]);

  return (
    <>
      <div>
        <Navbar update={Update} signedIn={SignIn} newItem={NewItem} />
      </div>
      <div className="py-20 min-h-screen bg-base-300 ">
        <InventoryList update={update} signedIn={signedIn} newItem={newItem} />
      </div>
    </>
  );
};

export default Home;
