import Axios from "axios";

const LogoutButton = ({ logginOut }) => {
  Axios.defaults.withCredentials = true;

  const handleLogout = () => {
    Axios.get("/api/users/logout")
      .then((res) => {
        console.log("hi");
        logginOut();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        className="text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
