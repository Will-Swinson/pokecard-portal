import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SignupPokemonCard from "./SignupPokemonCard";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoginContext from "../Context/LoginProvider";
import { Link } from "react-router-dom";

export default function Login() {
  // Login Context
  const { handleSignup } = useContext(LoginContext);
  const { doesExists } = useContext(LoginContext);

  // Yup Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username Required"),
    email: Yup.string()
      .email(`"@" Invalid email address`)
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .min(8, "Must be 8 characters")
      .max(15, "Must be 15 characters"),
    terms: Yup.array().required("Accept Terms Required"),
  });

  // Form Values
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      terms: [],
    },
    // Form Validation
    validationSchema,

    // Form Submission
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  return (
    <main className="bg-black h-screen flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white flex rounded-lg font-mono justify-center items-start border-blue-600 hover:border-8 transition-all duration-500 ease-in-out"
      >
        <div className="flex-1 text-black text-xl w-400px pl-2 pr-2 flex flex-col items-center mr-2 ">
          <div className="flex justify-center items-end flex-col ">
            <h1 className="mt-8 text-xl m-0 font-bold ">
              Start your collection today! 🎴
            </h1>
            <div className="mt-12 ">
              <div className="pb-4 ">
                <label htmlFor="username" className="mr-2 text-2xl font-bold ">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Your Username"
                  className="border-2 border-black rounded-lg text-center p-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent md:mx-auto md:my-0"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.username && formik.errors.username ? (
                  <p className="flex justify-center ml-20 text-red-600">
                    {formik.errors.username}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-6 ">
              <div className="pb-4 ">
                <label htmlFor="email" className="mr-2 text-2xl font-bold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="border-2 border-black rounded-lg text-center p-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent md:mx-auto md:my-0"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.email && formik.errors.email ? (
                  <p className="flex justify-center ml-20 text-red-600">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-6 ">
              <div className="pb-4">
                <label htmlFor="password" className="mr-2 text-2xl font-bold">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  className="border-2 border-black rounded-lg text-center p-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent md:mx-auto md:my-0"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.password && formik.errors.password ? (
                  <p className="flex justify-center ml-32 text-red-600">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-6 ">
              <div className="pb-4  ">
                <label
                  htmlFor="terms"
                  className="mr-2 text-2xl font-bold flex justify-center items-center"
                >
                  Terms of Service:
                </label>
                <div className="flex items-center justify-center mt-0.5 ">
                  <input
                    name="terms"
                    value="checked"
                    type="checkbox"
                    className="h-5 w-5 mr-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded md:mx-auto md:my-0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  <p className=" text-xs ml-4 text-center">
                    I agree to the Terms and Service that my data will be taken
                    for research purposes. 👍
                  </p>
                </div>
                {formik.values.terms.length === 0 ? (
                  <p className="flex justify-center  text-red-600">
                    Box must be checked
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          {doesExists && (
            <div className="ml-6 text-center">
              User already has an account.{" "}
              <Link
                to="/login"
                className="text-red-600 transition-transform hover:scale-120 underline "
              >
                Login Here
              </Link>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 rounded w-full text-white font-bold py-2 px-4 mt-6 hover:bg-white hover:text-blue-600 border-2 border-blue-600 ml-6 mb-4"
          >
            Sign up now!
          </button>
        </div>
        <SignupPokemonCard />
      </form>
    </main>
  );
}
