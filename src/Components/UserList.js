import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const text =
    "1111sdfsdf sdfsdf sdaerj jklkji iiioifjdddisdfsdfsdo iolaf asdfsdfdssdfsdf sdfsdf sdaerj jklkji iiioijio iol";
  useEffect(() => {
    fetch("/api/users/")
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        else return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  }, []);

  return (
    <div
      data-theme="dark"
      className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-10 px-10"
    >
      {users.map((user) => {
        let description = "";
        if (text.length <= 100) {
          description = text;
        } else {
          description = text.substring(0, 100) + "...";
        }
        return (
          <section key={user._id} className="card bg-primary text-white">
            <div className="card-body ">
              <h2 className="card-title">
                {user.FirstName} {user.LastName}
              </h2>
              <p>{description}</p>
              <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default UserList;
