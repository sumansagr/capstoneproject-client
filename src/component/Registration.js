import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";


import { RiLockPasswordFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
// import signup from "../images/signin.png";

function Registration() {
  const history = useHistory();

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    const userCopy = { ...user };
    userCopy[event.target.name] = event.target.value;
    setuser(userCopy);
  };
  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, password, role } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      alert("invalid registration");
    } else {
      alert(" registration succesfull");
      history.push("/home");
    }
  };

  return (
    <div>
      <section className="signup">
        <div className="container1 mt-5">
          <div >
            <div >
              <h2 >Sign up</h2>
              <form
                method="POST"
                name="form"
                className="register-form"
                id="register-form"
              >
                <div className="form-group">
                  <label htmlFor="name">
                  <BsPersonCircle/>
                    
                  </label>
                  <input
                    onChange={handleChange}
                    value={user.name}
                    name="name"
                    type="text"
                    placeholder="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                  <HiOutlineMail/>
                  </label>
                  <input
                    onChange={handleChange}
                    value={user.email}
                    name="email"
                    type="text"
                    placeholder="email"
                  />{" "}
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                  <RiLockPasswordFill/>
                  </label>
                  <input
                    onChange={handleChange}
                    value={user.password}
                    type="password"
                    name="password"
                    placeholder="password"
                  />{" "}
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">
                  </label>
                  <select onChange={handleChange} value={user.role} name="role">
                    <option>Role</option>
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </div>
                <div className="form-group form-button">
                  <input type="submit" onClick={PostData} />
                
                </div>
              </form>
            </div>

            {/* <div className="signup-image">
              <figure>
                <img src={signup} alt="registration pic" />
              </figure>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registration;
