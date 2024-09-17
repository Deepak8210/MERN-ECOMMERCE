import React, { useEffect, useState } from "react";
import apiSummary from "../common";
import axios from "axios";
import moment from "moment";
import { PencilIcon, UsersIcon } from "@heroicons/react/24/outline";
import UserRole from "../components/UserRole";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchUsers = async () => {
    const { data } = await axios.get(apiSummary.users.url, {
      withCredentials: true,
    });

    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="rounded-lg overflow-hidden ">
      <div className="bg-gray-900 bg-opacity-20">
        <div className="mx-auto max-w-7xl">
          <div className="bg-gray-900 bg-opacity-20 py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <div className="flex">
                    <UsersIcon className="w-6 h-6 text-white mr-2" />
                    <h1 className="text-base font-semibold leading-6 text-white">
                      Users
                    </h1>
                  </div>

                  <p className="mt-2 text-sm text-gray-300">
                    A list of all the users in your account including their
                    name, title, email and role.
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Add user
                  </button>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Name
                          </th>

                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Created Date
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {users.map((user) => (
                          <tr key={user?.email}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {`${
                                user?.firstName[0]?.toUpperCase() +
                                user?.firstName.slice(1)
                              } ${user?.lastName}`}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {user?.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {user?.role}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              {moment(user?.createdAt).format("ll")}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              <button
                                onClick={() => {
                                  setShowModal(true),
                                    setModalData({
                                      userId: user?._id,
                                      email: user?.email,
                                      firstName: user?.firstName,
                                      lastName: user?.lastName,
                                      role: user?.role,
                                    });
                                }}
                                className="hover:text-white"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <UserRole
          close={closeModal}
          modalData={modalData}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
};

export default Users;
