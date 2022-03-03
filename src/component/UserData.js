import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Report2 from "./CustomComp/Report2";
import Report3 from "./CustomComp/Report3";

import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import Report1 from "./CustomComp/Report1";
import { RiContactsBookUploadLine } from "react-icons/ri";
import { Button, FormControl } from "react-bootstrap";

function UserData() {
  const [userData, setuserData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [openModal1, setopenModal1] = useState(false);
  const [openModal2, setopenModal2] = useState(false);
  const [Searchval, setSearchval] = useState("")


  const [close, setclose] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);
  const date = new Date();
  const cDate = date.getFullYear();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isAuth);

  const callUserPage = async () => {
    try {
      const res = await fetch("/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setuserData([...data]);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(userAction(true));
    callUserPage();
  }, []);

  useEffect(() => {
    console.log(selectedUser, "selectedUser");
  }, [selectedUser]);

  return (
    <div>
      

      <form methods="GET">
        <table style={{ marginTop: "50px" }} class="table">
  <thead>
    <FormControl type="search" onChange={(e) =>{
      setSearchval(e.target.value)
    }} />
  </thead>
        
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th>Name</th>

              <th scope="col">Haematology</th>
              <th scope="col">Thyroid </th>
              <th scope="col">Glucometry</th>
            </tr>
          </thead>

          {isLogin && (
            <>
              {userData.filter((item)=>item.email.includes(Searchval.toLocaleLowerCase()) ).map((val) => {
                return (
                  <tr key={val._id}>
                    <td>{val._id}</td>
                    <td> {val.email} </td>
                    <td> {val.name}</td>

                    <td>
                      {" "}
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setopenModal(true);
                          setSelectedUser(val);
                        }}
                        style={{ color: "black" }}
                        variant= { val?.heamatology ? "primary" : "danger"}

                        disabled={!val?.heamatology}
                      >
                        {val?.heamatology ? "view Details" : "N/A"}
                      </Button>{" "}
                    </td>
                    <td>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();

                          setopenModal1(true);
                          console.log(val);
                          console.log(val, "---------> ssss");
                          setSelectedUser(val);
                        }}
                        style={{ color: "black" }}
                        variant= { val?.thyroid ? "primary" : "danger"}
                        disabled={!val?.thyroid}
                      >
                        {" "}
                        {val?.thyroid ? "view Details" : "N/A"}
                      </Button>{" "}
                    </td>
                    <td>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();

                          setopenModal2(true);
                          console.log(val);
                          console.log(val, "--------->");
                          setSelectedUser(val);
                        }}
                        style={{ color: "black" }}
                        variant= { val?.glucometry ? "primary" : "danger"}

                        disabled={!val?.glucometry}
                      >
                        {val?.glucometry ? "view Details" : "N/A"}
                      </Button>
                    </td>
                  </tr>
                );
              })}{" "}
            </>
          )}
        </table>
      </form>
      <Report1
        Backdrop={close}
        userData={selectedUser}
        open={openModal}
        setopenModal={setopenModal}
        handleClose={() => {
          setopenModal(false);
        }}
      />
      <Report2
        Backdrop={close}
        userData={selectedUser}
        open={openModal1}
        setopenModal={setopenModal1}
        handleClose={() => {
          setopenModal1(false);
        }}
      />
           <Report3
        Backdrop={close}
        userData={selectedUser}
        open={openModal2}
        setopenModal={setopenModal2}
        handleClose={() => {
          setopenModal2(false);
        }}
      />
    </div>
  );
}

export default UserData;
