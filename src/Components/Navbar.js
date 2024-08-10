import SignInModal from "./SignInModal";
import RegisterModal from "./RegisterModal";
import LogoutButton from "./LogoutButton";
import CreateItemModal from "./CreateItemModal";
import Axios from "axios";
import { useState, useEffect } from "react";

Axios.defaults.withCredentials = true;

const Navbar = ({ update, signedIn, newItem }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => {
    signedIn(true);
    setIsLoggedIn(true);
    localStorage.setItem("LOGGED_IN", JSON.stringify(true));
    handleUpdate("LOGIN");
  };

  const logOut = () => {
    signedIn(false);
    setIsLoggedIn(false);
    localStorage.setItem("LOGGED_IN", JSON.stringify(false));
    localStorage.removeItem("User");
    handleUpdate("LOGOUT");
  };

  const createItem = () => {
    handleUpdate("CREATE_ITEM");
  };

  const handleUpdate = (data) => {
    localStorage.setItem("UPDATE_OPTION", JSON.stringify(data));
    update(data);
  };

  useEffect(() => {
    const data = localStorage.getItem("LOGGED_IN");
    if (data === null) {
      localStorage.setItem("LOGGED_IN", JSON.stringify(false));
    }
    setIsLoggedIn(JSON.parse(data));
    Axios.get("/api/users/getCurrentUser")
      .then((res) => {
        localStorage.setItem(
          "User",
          JSON.stringify({
            Username: res.data.user.Username,
            _id: res.data.user._id,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  const ItemButton = (props) => {
    let text = "";
    if (props.thing === "USER_ITEMS") {
      text = "Your Items";
    } else if (props.thing === "ALL_ITEMS") {
      text = "All Items";
    }
    return (
      <button
        className="text-white hover:text-primary font-medium rounded-lg text-sm px-4 py-2 text-center active:text-secondary"
        onClick={() => handleUpdate(props.thing)}
      >
        {text}
      </button>
    );
  };

  // Changes Navbar based on if the user is logged in or not (need to add token validation here)
  const IsLoggedIn = () => {
    const data = localStorage.getItem("LOGGED_IN");
    if (isLoggedIn) {
      return (
        <>
          <div className="navbar-center">
            <CreateItemModal creating={createItem} newItem={newItem} />
          </div>
          <div className="navbar-center hidden  lg:flex">
            <div className="form-control">
              <ItemButton thing="USER_ITEMS" />
            </div>
            <div className="form-control">
              <ItemButton thing="ALL_ITEMS" />
            </div>
          </div>
          <div className="navbar-end">
            <LogoutButton logginOut={logOut} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="navbar-end bg-base-300">
            <SignInModal logginIn={logIn} />
            <RegisterModal />
          </div>
        </>
      );
    }
  };

  return (
    <div className="navbar fixed rounded z-10 bg-base-300">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Inventory Management</a>
      </div>
      {console.log("NAVBAR rendered")}

      <IsLoggedIn />
    </div>
  );
};

export default Navbar;
