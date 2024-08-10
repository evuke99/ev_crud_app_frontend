const { useState } = require("react");

const RegisterForm = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { FirstName, LastName, Username, Password };

    fetch("/api/users", {
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
          console.log("here");
          document.getElementById("register-modal-form").submit();
          return json;
        }
      })
      .then((data) => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        console.log("new user added", data);
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-top mx-auto lg:py-0">
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
                  htmlFor="FirstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  id="FirstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required=""
                  onChange={(e) => setFirstName(e.target.value)}
                  value={FirstName}
                />
              </div>
              <div>
                <label
                  htmlFor="Lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="Lastname"
                  id="Lastname"
                  placeholder="Doe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setLastName(e.target.value)}
                  value={LastName}
                />
              </div>
              <div>
                <label
                  htmlFor="Username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="Username"
                  id="UsernameRegister"
                  placeholder="Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  type="text"
                  name="Password"
                  id="PasswordRegister"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                  value={Password}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:text-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
