import React, { useState } from "react";
import signin from "../assets/signin/signin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import apiSummary from "../common";
import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "../constants/message";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialLoginData = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [loginData, setLoginData] = useState(initialLoginData);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setLoginData((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }
      return { ...prev, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiSummary.signin.url, loginData);
      const data = response.data;

      if (!data.status === "success" || !data.token)
        return toast.error(data.message || ERROR_MESSAGE.ERROR_OCCUR);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      // Optionally, we can use cookie
      document.cookie = `token=${data.token}; path=/`;

      navigate("/");
      setLoginData(initialLoginData);
      toast.success(data.message || "User logged in successfully");
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || ERROR_MESSAGE.ERROR_OCCUR;
        toast.error(errorMessage);
      }
    }
  };

  return (
    <section id="login" className="mt-4">
      <div className="lg:w-[70%] w-full mx-auto rounded-[0.6rem] bg-slate-800">
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
              src={signin}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className=" flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:flex-none lg:px-10 xl:px-10">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h1 className="mt-4 text-2xl md:text-3xl leading-9 tracking-tight text-gray-200">
                  Sign in to your account
                </h1>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Not a member?{" "}
                  <Link
                    to={"/sign-up"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="mt-10">
                <div>
                  <form
                    action="#"
                    method="POST"
                    className="space-y-6"
                    onSubmit={onSubmitHandler}
                  >
                    <div>
                      <div className="mt-2 relative ">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          required
                          value={loginData.email}
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
                          value={loginData.password}
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          checked={loginData.rememberMe || false}
                          onChange={onChangeHandler}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 bg-slate-300"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="ml-3 block text-sm leading-6 text-gray-400"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm leading-6">
                        <Link
                          to={"/forgot-password"}
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-10">
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                      <span className="bg-slate-200 px-6 text-gray-900 rounded-xl">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path
                          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                          fill="#EA4335"
                        />
                        <path
                          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                          fill="#34A853"
                        />
                      </svg>
                      <span className="text-sm font-semibold leading-6">
                        Google
                      </span>
                    </a>

                    <a
                      href="#"
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-5 w-5 fill-[#24292F]"
                      >
                        <path
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-semibold leading-6">
                        GitHub
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
