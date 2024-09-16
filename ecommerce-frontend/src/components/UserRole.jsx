import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import apiSummary from "../common";
import axios from "axios";

const UserRole = ({ modalData, close }) => {
  const [userRole, setUserRole] = useState("");
  const handleSelectChange = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };
  console.log(modalData);

  const updateRole = async () => {
    const { data } = await axios.put(
      `${apiSummary.updateUser.url}/${modalData.userId}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
  };

  return (
    <div className=" flex w-full h-full absolute top-0 right-0 left-0 bottom-0 z-10 items-center justify-center backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-slate-900 bg-opacity-85 rounded-md p-4 shadow-xl text-center">
        <h4 className="text-lg font-medium text-white text-center my-2">
          Change user Role
        </h4>
        <p className="text-white">Name: Deepak Kumar</p>
        <p className="text-white">Email: deepakrajput058@gmail.com</p>
        <div className=" rounded-lg flex w-full items-center my-6 mt-8 justify-between">
          <label
            htmlFor="userRole"
            className="block w-full text-sm font-medium text-left text-gray-400"
          >
            Select Role:
          </label>
          <select
            onChange={handleSelectChange}
            id="role"
            className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:bg-opacity-30 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="admin" className="bg-slate-800">
              Admin
            </option>
            <option value="member" className="bg-slate-800">
              Member
            </option>
          </select>
        </div>
        <button
          onClick={updateRole}
          className="text-white mt-4 bg-blue-900 bg-opacity-80 hover:bg-opacity-100 p-2 w-full rounded-md"
        >
          Change role
        </button>
        <button className="absolute right-2 top-2" onClick={close}>
          <XMarkIcon className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default UserRole;
