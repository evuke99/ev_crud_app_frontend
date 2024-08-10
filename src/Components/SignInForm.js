import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const { useState } = require("react");

const SignInForm = ({ logginIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { Username, Password };

    Axios.post("/api/users/login", user)
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.status + " logged in");
        } else {
          console.log(res.data);
        }
      })
      .then(() => {
        document.getElementById("signin-modal-form").submit();
        logginIn();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section>
      <div className="flex flex-col smd:h-screen lg:py-0">
        {/* <button className="text-right" onClick={() => }>X</button> */}
        <div className="modal-action">
          <form method="dialog" id="signin-modal-form">
            {/* if there is a button in form, it will close the modal */}
            <button>X</button>
          </form>
        </div>
        <div>
          <div className=" p-6 space-y-6 md:space-y-6 sm:p-6 justify-center">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              method="dialog"
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="Username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="Username"
                  name="Username"
                  id="UsernameSignIn"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                  value={Username}
                />
              </div>
              <div>
                <label
                  htmlFor="Password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="Password"
                  name="Password"
                  id="PasswordSignIn"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                  value={Password}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:text-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
