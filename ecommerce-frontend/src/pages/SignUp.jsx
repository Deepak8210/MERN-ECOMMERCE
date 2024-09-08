import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import register from "../assets/signin/register.jpg";
import { imageToBase64 } from "../helpers/imageToBase64";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import userLogo from "../assets/signin/user.png";
import apiSummary from "../common";
import axios from "axios";
import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "../constants/message";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const initialSignupData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  };
  const [signupData, setSignupData] = useState(initialSignupData);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      return toast.error(ERROR_MESSAGE.PASSWORD_MATCH);
    }

    try {
      const response = await axios.post(apiSummary.signup.url, signupData);
      const data = response.data;

      if (data.status !== "success") {
        toast.error(data.message || ERROR_MESSAGE.ERROR_OCCUR);
      }
      toast.success(data.message);
      setSignupData(initialSignupData);
      navigate("/sign-in");
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || ERROR_MESSAGE.ERROR_OCCUR;
        toast.error(errorMessage);
      }
    }
  };

  const uploadPicHandler = async (e) => {
    const file = e.target.files[0];
    const profilePic = await imageToBase64(file);
    setSignupData((prev) => {
      return { ...prev, profilePic };
    });
  };

  return (
    <section id="login" className="mt-4">
      <div className="w-[70%] mx-auto rounded-[0.6rem] bg-slate-800">
        <div className="flex min-h-full flex-1 p-3">
          <div className=" relative hidden w-0 flex-1 lg:block rounded-[0.6rem] overflow-hidden">
            <div className="bg-slate-900 bg-opacity-40 h-full w-full absolute z-10 flex justify-end">
              <Link
                to={"/"}
                className="bg-slate-400 bg-opacity-75 hover:bg-opacity-100 text-slate-800 py-[2px] px-3 w-fit h-fit rounded-2xl font-[500] mt-4 mr-4"
              >
                Back to website &rarr;
              </Link>
            </div>
            <img
              alt=""
              src={register}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className=" flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:flex-none lg:px-10 xl:px-10">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h1 className="mt-4 text-2xl md:text-3xl leading-9 tracking-tight text-gray-200">
                  Create an account
                </h1>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Already a member?{" "}
                  <Link
                    to={"/sign-in"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
              <div className="w-[110px] h-[110px] ring-2 relative rounded-full mx-auto mt-4 overflow-hidden object-cover flex items-center justify-center">
                <img src={signupData.profilePic || userLogo} alt="user-logo" />

                <form className="absolute bottom-4 right-4 bg-opacity-55">
                  <label htmlFor="profile" className="bg-red-500">
                    <PencilSquareIcon className="w-6 h-6 text-slate-400" />
                  </label>
                  <input
                    type="file"
                    id="profile"
                    className="hidden"
                    onChange={uploadPicHandler}
                  />
                </form>
              </div>
              <div className="mt-6">
                <div>
                  <form
                    action="#"
                    method="POST"
                    className="space-y-6"
                    onSubmit={onSubmitHandler}
                  >
                    <div className="md:flex justify-between">
                      <div className="mt-2 relative ">
                        <input
                          id="first-name"
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                          required
                          value={signupData.firstName}
                          onChange={onChangeHandler}
                          className="block bg-[#2d3c55] text-slate-300 px-2 w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-2 relative ">
                        <input
                          id="last-name"
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          required
                          value={signupData.lastName}
                          onChange={onChangeHandler}
                          className="block bg-[#2d3c55] text-slate-300 px-2 w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 relative ">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          required
                          value={signupData.email}
                          onChange={onChangeHandler}
                          autoComplete="email"
                          className="block bg-[#2d3c55] text-slate-300 px-2 w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 relative flex items-center">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "" : "password"}
                          required
                          placeholder="Password"
                          value={signupData.password}
                          onChange={onChangeHandler}
                          autoComplete="current-password"
                          className="block bg-[#2d3c55] text-slate-300 px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span
                          className="absolute right-2 top-[0.6rem] cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="w-4 h-4 text-slate-400" />
                          ) : (
                            <EyeIcon className="w-4 h-4 text-slate-400" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 relative flex items-center">
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "" : "password"}
                          required
                          placeholder="Confirm Password"
                          value={signupData.confirmPassword}
                          onChange={onChangeHandler}
                          autoComplete="current-password"
                          className="block bg-[#2d3c55] text-slate-300 px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span
                          className="absolute right-2 top-[0.6rem] cursor-pointer"
                          onClick={() => setConfirmPassword((prev) => !prev)}
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="w-4 h-4 text-slate-400" />
                          ) : (
                            <EyeIcon className="w-4 h-4 text-slate-400" />
                          )}
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
